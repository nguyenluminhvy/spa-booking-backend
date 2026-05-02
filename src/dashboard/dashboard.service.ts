import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  getDateRange,
  calcGrowth,
  buildBusinessHourLabels,
  buildFinal,
  buildSmartLabels,
} from 'src/utils/helper';
import moment from 'moment';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async overview(query: any) {
    const range = query.range || 'day';

    const { currentStart, currentEnd, prevStart, prevEnd } =
      getDateRange(query);

    const currentAppointmentWhere = currentStart
      ? {
          appointmentTime: {
            gte: currentStart,
            lte: currentEnd,
          },
        }
      : {};

    const prevAppointmentWhere = prevStart
      ? {
          appointmentTime: {
            gte: prevStart,
            lt: prevEnd,
          },
        }
      : {};

    const currentUserWhere = currentStart
      ? {
          createdAt: {
            gte: currentStart,
            lte: currentEnd,
          },
        }
      : {};

    const prevUserWhere = prevStart
      ? {
          createdAt: {
            gte: prevStart,
            lt: prevEnd,
          },
        }
      : {};

    const [
      currentAppointments,
      currentUsers,
      currentCompleted,
      currentCancelled,
    ] = await Promise.all([
      this.prisma.appointment.findMany({
        where: currentAppointmentWhere,
        include: { service: true },
      }),

      this.prisma.user.count({
        where: { ...currentUserWhere, role: 'USER' },
      }),

      this.prisma.appointment.count({
        where: {
          ...currentAppointmentWhere,
          status: 'DONE',
        },
      }),

      this.prisma.appointment.count({
        where: {
          ...currentAppointmentWhere,
          status: 'CANCELLED',
        },
      }),
    ]);

    let prevAppointments: any[] = [];
    let prevUsers = 0;
    let prevCompleted = 0;

    if (range !== 'all') {
      [prevAppointments, prevUsers, prevCompleted] = await Promise.all([
        this.prisma.appointment.findMany({
          where: prevAppointmentWhere,
          include: { service: true },
        }),

        this.prisma.user.count({
          where: { ...prevUserWhere, role: 'USER' },
        }),

        this.prisma.appointment.count({
          where: {
            ...prevAppointmentWhere,
            status: 'DONE',
          },
        }),
      ]);
    }

    const revenue = currentAppointments.reduce((sum, item) => {
      if (item.status === 'DONE') {
        return sum + Number(item.finalPrice);
      }

      return sum;
    }, 0);

    const prevRevenue = prevAppointments.reduce((sum, item) => {
      if (item.status === 'DONE') {
        return sum + Number(item.finalPrice);
      }

      return sum;
    }, 0);

    const appointments = currentAppointments.length;
    const prevAppointmentsCount = prevAppointments.length;

    const newUsers = currentUsers;

    const completed = currentCompleted;

    const cancelled = currentCancelled;

    const topServices = await this.getTopServices(currentAppointmentWhere);

    const topStaff = await this.getTopStaff(currentAppointmentWhere);

    const topUserBooking = await this.getTopUserBooking(
      currentAppointmentWhere,
    );

    const voucher = this.getVoucherOverview(currentAppointments);

    return {
      code: 0,
      message: 'SUCCESS',
      data: {
        revenue,
        appointments,
        newUsers,
        completed,
        cancelled,

        topServices,
        topStaff,
        topUserBooking,

        voucher,

        growth:
          range === 'all'
            ? null
            : {
                revenue: calcGrowth(revenue, prevRevenue),
                appointments: calcGrowth(appointments, prevAppointmentsCount),
                users: calcGrowth(newUsers, prevUsers),
                completed: calcGrowth(completed, prevCompleted),
              },
      },
    };
  }

  async revenue(query: any) {
    const range = query.range || 'day';

    const { start, end } = this.getTimeRange(query);

    const where = this.buildWhere(start, end, { status: 'DONE' });

    const appointments = await this.prisma.appointment.findMany({
      where,
      select: {
        appointmentTime: true,
        finalPrice: true,
      },
    });

    return this.handleTimeSeries(
      appointments,
      range,
      (item) => Number(item.finalPrice),
      query,
    );
  }

  async bookings(query: any) {
    const range = query.range || 'day';

    const { start, end } = this.getTimeRange(query);

    const where = this.buildWhere(start, end);

    const appointments = await this.prisma.appointment.findMany({
      where,
      select: {
        appointmentTime: true,
      },
    });

    return this.handleTimeSeries(appointments, range, () => 1, query);
  }

  async status(query: any) {
    const range = query.range || 'day';

    const { start, end } = this.getTimeRange(query);

    const where = this.buildWhere(start, end);

    const appointments = await this.prisma.appointment.findMany({
      where,
      select: { status: true },
    });

    return this.handleStatus(appointments);
  }

  handleStatus(appointments: any[]) {
    const map: Record<string, number> = {
      PENDING: 0,
      CONFIRMED: 0,
      DONE: 0,
      CANCELLED: 0,
    };

    appointments.forEach((item) => {
      const status = item.status;

      if (!map[status]) {
        map[status] = 0;
      }

      map[status] += 1;
    });

    const labels = Object.keys(map);
    const data = Object.values(map);

    return {
      code: 0,
      message: 'SUCCESS',
      data: {
        labels,
        data,
      },
    };
  }

  private getTimeRange(query: any) {
    const now = moment().local();

    const { range, startDate, endDate } = query;

    if (startDate && endDate) {
      const currentStart = moment(startDate).startOf('day');
      const currentEnd = moment(endDate).endOf('day');

      return {
        start: currentStart.toDate(),
        end: currentEnd.toDate(),
      };
    }

    switch (range) {
      case 'day':
        return {
          start: now.clone().startOf('day').toDate(),
          end: now.clone().endOf('day').toDate(),
        };

      case 'week':
        return {
          start: now.clone().startOf('isoWeek').toDate(),
          end: now.clone().endOf('isoWeek').toDate(),
        };

      case 'month':
        return {
          start: now.clone().startOf('month').toDate(),
          end: now.clone().endOf('month').toDate(),
        };

      default:
        return { start: null, end: null };
    }
  }

  private buildWhere(start: Date | null, end: Date | null, extra = {}) {
    return {
      ...extra,
      ...(start &&
        end && {
          appointmentTime: {
            gte: start,
            lte: end,
          },
        }),
    };
  }

  private handleTimeSeries(
    appointments: any[],
    range: string,
    getValue: (item: any) => number,
    query?: any,
  ) {
    if (query?.startDate && query?.endDate) {
      return this.handleCustomRangeGeneric(
        appointments,
        getValue,
        query.startDate,
        query.endDate,
      );
    }

    if (range === 'day') return this.handleDayGeneric(appointments, getValue);
    if (range === 'week') return this.handleWeekGeneric(appointments, getValue);
    if (range === 'month')
      return this.handleMonthGeneric(appointments, getValue);

    return this.handleAllGeneric(appointments, getValue);
  }

  private handleDayGeneric(appointments: any[], getValue: any) {
    const startHour = 9;
    const endHour = 21;

    const currentHour = moment().hour();
    if (currentHour < startHour) {
      return { code: 0, message: 'SUCCESS', data: { labels: [], data: [] } };
    }

    const lastHour = Math.min(currentHour, endHour);

    const hours: number[] = [];
    const map: Record<number, number> = {};

    for (let h = startHour; h <= lastHour; h++) {
      hours.push(h);
      map[h] = 0;
    }

    appointments.forEach((item) => {
      const h = moment(item.appointmentTime).local().hour();

      if (h >= startHour && h <= lastHour) {
        map[h] += getValue(item);
      }
    });

    const fullData = hours.map((h) => map[h]);

    const selected = buildBusinessHourLabels(lastHour);

    return buildFinal(hours, fullData, selected, (h) => `${h}h`);
  }

  private handleWeekGeneric(appointments: any[], getValue: any) {
    const map: Record<number, number> = {};
    for (let i = 1; i <= 7; i++) map[i] = 0;

    appointments.forEach((item) => {
      const d = moment(item.appointmentTime).local().isoWeekday();
      map[d] += getValue(item);
    });

    const labels = [1, 2, 3, 4, 5, 6, 7];
    const fullData = labels.map((d) => map[d]);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return buildFinal(labels, fullData, labels, (d) => days[d - 1]);
  }

  private handleMonthGeneric(appointments: any[], getValue: any) {
    const today = moment().date();

    const labels: number[] = [];
    const map: Record<number, number> = {};

    for (let d = 1; d <= today; d++) {
      labels.push(d);
      map[d] = 0;
    }

    appointments.forEach((item) => {
      const d = moment(item.appointmentTime).local().date();
      if (d <= today) {
        map[d] += getValue(item);
      }
    });

    const fullData = labels.map((d) => map[d]);

    const selected = buildSmartLabels(today);

    return buildFinal(labels, fullData, selected, (d) => `${d}`);
  }

  private handleAllGeneric(appointments: any[], getValue: any) {
    const map: Record<number, number> = {};

    appointments.forEach((item) => {
      const m = moment(item.appointmentTime).local().month();

      if (!map[m]) map[m] = 0;

      map[m] += getValue(item);
    });

    const labels = Object.keys(map)
      .map(Number)
      .sort((a, b) => a - b);

    const fullData = labels.map((m) => map[m]);

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return buildFinal(labels, fullData, labels, (m) => months[m]);
  }

  private handleCustomRangeGeneric(
    appointments: any[],
    getValue: (item: any) => number,
    startDate: string,
    endDate: string,
  ) {
    const start = moment(startDate).startOf('day');
    const end = moment(endDate).endOf('day');
    const diffDays = end.diff(start, 'days') + 1;
    const map: Record<string, number> = {};
    const labels: string[] = [];

    if (diffDays <= 7) {
      for (let i = 0; i < diffDays; i++) {
        const d = start.clone().add(i, 'days').format('YYYY-MM-DD');

        map[d] = 0;

        labels.push(d);
      }

      appointments.forEach((item) => {
        const key = moment(item.appointmentTime).local().format('YYYY-MM-DD');

        if (map[key] !== undefined) {
          map[key] += getValue(item);
        }
      });

      return {
        code: 0,
        message: 'SUCCESS',
        data: {
          labels: labels.map((d) => moment(d).format('DD/MM')),
          data: labels.map((d) => map[d]),
        },
      };
    }

    if (diffDays <= 31) {
      const weekMap: Record<string, number> = {};

      appointments.forEach((item) => {
        const week = moment(item.appointmentTime)
          .local()
          .startOf('isoWeek')
          .format('YYYY-MM-DD');

        if (!weekMap[week]) weekMap[week] = 0;

        weekMap[week] += getValue(item);
      });

      const sortedWeeks = Object.keys(weekMap).sort();

      return {
        code: 0,
        message: 'SUCCESS',
        data: {
          labels: sortedWeeks.map((w) => `W${moment(w).isoWeek()}`),
          data: sortedWeeks.map((w) => weekMap[w]),
        },
      };
    }

    const monthMap: Record<number, number> = {};
    appointments.forEach((item) => {
      const m = moment(item.appointmentTime).local().month();
      if (!monthMap[m]) monthMap[m] = 0;
      monthMap[m] += getValue(item);
    });

    const labelsMonth = Object.keys(monthMap)
      .map(Number)
      .sort((a, b) => a - b);

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',

      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return {
      code: 0,
      message: 'SUCCESS',
      data: {
        labels: labelsMonth.map((m) => months[m]),
        data: labelsMonth.map((m) => monthMap[m]),
      },
    };
  }

  private async getTopServices(whereCondition: any) {
    const topServices = await this.prisma.appointment.groupBy({
      by: ['serviceId'],
      where: {
        ...whereCondition,
        status: 'DONE',
      },
      _count: { serviceId: true },
      orderBy: {
        _count: { serviceId: 'desc' },
      },
      take: 5,
    });

    const serviceIds = topServices.map((s) => s.serviceId);

    const services = await this.prisma.service.findMany({
      where: { id: { in: serviceIds } },
    });

    const topServicesData = topServices.map((item) => {
      const service = services.find((s) => s.id === item.serviceId);

      return {
        id: service?.id,
        name: service?.name,
        bookings: item._count.serviceId,
      };
    });

    return topServicesData;
  }

  private async getTopStaff(whereCondition: any) {
    const topStaff = await this.prisma.appointment.groupBy({
      by: ['staffId'],
      where: {
        ...whereCondition,
        status: 'DONE',
        staffId: { not: null },
      },
      _count: { staffId: true },
      orderBy: {
        _count: { staffId: 'desc' },
      },
      take: 5,
    });

    const staffIds = topStaff.map((s) => Number(s.staffId));

    const staffs = await this.prisma.user.findMany({
      where: { id: { in: staffIds } },
    });

    const topStaffData = topStaff.map((item) => {
      const staff = staffs.find((s) => s.id === item.staffId);

      return {
        id: staff?.id,
        name: staff?.name,
        completed: item._count.staffId,
      };
    });

    return topStaffData;
  }

  private async getTopUserBooking(whereCondition: any) {
    const topUsers = await this.prisma.appointment.groupBy({
      by: ['userId'],
      where: {
        ...whereCondition,
      },
      _count: { userId: true },
      orderBy: {
        _count: { userId: 'desc' },
      },
      take: 5,
    });

    const userIds = topUsers.map((u) => u.userId);

    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
    });

    const topUsersData = topUsers.map((item) => {
      const user = users.find((u) => u.id === item.userId);
      return {
        id: user?.id,
        name: user?.name,
        bookings: item._count.userId,
      };
    });

    return topUsersData;
  }

  private getVoucherOverview(appointments: any[]) {
    const voucherUsageCount = appointments.filter(
      (item) => item.voucherCode && item.status === 'DONE',
    ).length;

    const totalDoneAppointments = appointments.filter(
      (item) => item.status === 'DONE',
    );

    const voucherUsageRate =
      totalDoneAppointments.length > 0
        ? Math.round((voucherUsageCount / totalDoneAppointments.length) * 100)
        : 0;

    const totalDiscount: any = totalDoneAppointments?.reduce((sum, item) => {
      const original = Number(item.originalPrice || 0);

      const final = Number(item.finalPrice || 0);

      return sum + Math.max(original - final, 0);
    }, 0);

    return {
      usageCount: voucherUsageCount,
      usageRate: voucherUsageRate,
      totalDiscount,
    };
  }
}
