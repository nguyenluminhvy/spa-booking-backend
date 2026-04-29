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
      getDateRange(range);

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
        return sum + Number(item.service.price);
      }

      return sum;
    }, 0);

    const prevRevenue = prevAppointments.reduce((sum, item) => {
      if (item.status === 'DONE') {
        return sum + Number(item.service.price);
      }

      return 0;
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

    const { start, end } = this.getTimeRange(range);

    const where = this.buildWhere(start, end, { status: 'DONE' });

    const appointments = await this.prisma.appointment.findMany({
      where,
      select: {
        appointmentTime: true,
        service: { select: { price: true } },
      },
    });

    return this.handleTimeSeries(appointments, range, (item) =>
      Number(item.service.price),
    );
  }

  async bookings(query: any) {
    const range = query.range || 'day';

    const { start, end } = this.getTimeRange(range);

    const where = this.buildWhere(start, end);

    const appointments = await this.prisma.appointment.findMany({
      where,
      select: {
        appointmentTime: true,
      },
    });

    return this.handleTimeSeries(appointments, range, () => 1);
  }

  async status(query: any) {
    const range = query.range || 'day';

    const { start, end } = this.getTimeRange(range);

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

  private getTimeRange(range: string) {
    const now = moment().local();

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
  ) {
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
}
