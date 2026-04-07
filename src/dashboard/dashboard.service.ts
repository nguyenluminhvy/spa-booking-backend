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

    const revenue = currentAppointments.reduce(
      (sum, item) => sum + Number(item.service.price),
      0,
    );

    const prevRevenue = prevAppointments.reduce(
      (sum, item) => sum + Number(item.service.price),
      0,
    );

    const appointments = currentAppointments.length;
    const prevAppointmentsCount = prevAppointments.length;

    const newUsers = currentUsers;

    const completed = currentCompleted;

    const cancelled = currentCancelled;

    return {
      code: 0,
      message: 'SUCCESS',
      data: {
        revenue,
        appointments,
        newUsers,
        completed,
        cancelled,

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

    const now = moment().local();

    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (range === 'day') {
      startDate = now.startOf('day').toDate();
      endDate = now.endOf('day').toDate();
    }

    if (range === 'week') {
      startDate = now.startOf('isoWeek').toDate();
      endDate = now.endOf('isoWeek').toDate();
    }

    if (range === 'month') {
      startDate = now.startOf('month').toDate();
      endDate = now.endOf('month').toDate();
    }

    const whereCondition: any = {
      status: 'DONE',
    };

    if (startDate && endDate) {
      whereCondition.appointmentTime = {
        gte: startDate,
        lte: endDate,
      };
    }

    const appointments = await this.prisma.appointment.findMany({
      where: whereCondition,
      select: {
        appointmentTime: true,
        service: {
          select: {
            price: true,
          },
        },
      },
    });

    if (range === 'day') {
      return this.handleDay(appointments);
    }

    if (range === 'week') {
      return this.handleWeek(appointments);
    }

    if (range === 'month') {
      return this.handleMonth(appointments);
    }

    return this.handleAll(appointments);
  }

  handleDay(appointments: any[]) {
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
      const h = moment(item.appointmentTime).hour();
      if (h >= startHour && h <= lastHour) {
        map[h] += Number(item.service.price);
      }
    });

    const fullData = hours.map((h) => map[h]);

    const selected = buildBusinessHourLabels(lastHour);

    return buildFinal(hours, fullData, selected, (h) => `${h}h`);
  }

  handleWeek(appointments: any[]) {
    const map: Record<number, number> = {};
    for (let i = 1; i <= 7; i++) map[i] = 0;

    appointments.forEach((item) => {
      const d = moment(item.appointmentTime).local().isoWeekday();
      map[d] += Number(item.service.price);
    });

    const fullLabels = [1, 2, 3, 4, 5, 6, 7];

    const fullData = fullLabels.map((d) => map[d]);

    const selected = fullLabels;

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return buildFinal(fullLabels, fullData, selected, (d) => days[d - 1]);
  }

  handleMonth(appointments: any[]) {
    const today = moment().date();

    const fullLabels: number[] = [];
    const map: Record<number, number> = {};

    for (let d = 1; d <= today; d++) {
      fullLabels.push(d);
      map[d] = 0;
    }

    appointments.forEach((item) => {
      const d = moment(item.appointmentTime).date();

      if (d <= today) {
        map[d] += Number(item.service.price);
      }
    });

    const fullData = fullLabels.map((d) => map[d]);

    const selected = buildSmartLabels(today);

    return buildFinal(fullLabels, fullData, selected, (d) => `${d}`);
  }

  handleAll(appointments: any[]) {
    const map: Record<number, number> = {};

    appointments.forEach((item) => {
      const m = moment(item.appointmentTime).month();

      if (!map[m]) map[m] = 0;

      map[m] += Number(item.service.price);
    });

    const fullLabels = Object.keys(map)
      .map(Number)
      .sort((a, b) => a - b);

    const fullData = fullLabels.map((m) => map[m]);

    const monthNames = [
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

    return buildFinal(fullLabels, fullData, fullLabels, (m) => monthNames[m]);
  }

  async bookings(query: any) {
    const range = query.range || 'day';

    const now = moment();

    let startDate: Date | null = null;
    let endDate: Date | null = null;

    // =========================
    // 🟢 RANGE
    // =========================
    if (range === 'day') {
      startDate = moment().startOf('day').toDate();
      endDate = moment().endOf('day').toDate();
    }

    if (range === 'week') {
      startDate = moment().startOf('isoWeek').toDate();
      endDate = moment().endOf('isoWeek').toDate();
    }

    if (range === 'month') {
      startDate = moment().startOf('month').toDate();
      endDate = moment().endOf('month').toDate();
    }

    // =========================
    // 🟢 WHERE
    // =========================
    const where: any = {
      ...(startDate &&
        endDate && {
          appointmentTime: {
            gte: startDate,
            lte: endDate,
          },
        }),
    };

    const appointments = await this.prisma.appointment.findMany({
      where,
      select: {
        appointmentTime: true,
      },
    });

    // =========================
    // 🎯 HANDLE RANGE
    // =========================
    if (range === 'day') return this.handleBookingDay(appointments);
    if (range === 'week') return this.handleBookingWeek(appointments);
    if (range === 'month') return this.handleBookingMonth(appointments);

    return this.handleBookingAll(appointments);
  }

  handleBookingAll(appointments: any[]) {
    const map: Record<number, number> = {};

    appointments.forEach((item) => {
      const m = moment(item.appointmentTime).local().month();

      if (!map[m]) map[m] = 0;

      map[m] += 1;
    });

    const fullLabels = Object.keys(map)
      .map(Number)
      .sort((a, b) => a - b);

    const fullData = fullLabels.map((m) => map[m]);

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

    return buildFinal(fullLabels, fullData, fullLabels, (m) => months[m]);
  }

  handleBookingMonth(appointments: any[]) {
    const today = moment().date();

    const fullLabels: number[] = [];
    const map: Record<number, number> = {};

    for (let d = 1; d <= today; d++) {
      fullLabels.push(d);
      map[d] = 0;
    }

    appointments.forEach((item) => {
      const d = moment(item.appointmentTime).local().date();
      if (d <= today) {
        map[d] += 1;
      }
    });

    const fullData = fullLabels.map((d) => map[d]);

    const selected = buildSmartLabels(today);

    return buildFinal(fullLabels, fullData, selected, (d) => `${d}`);
  }

  handleBookingWeek(appointments: any[]) {
    const map: Record<number, number> = {};
    for (let i = 1; i <= 7; i++) map[i] = 0;

    appointments.forEach((item) => {
      const d = moment(item.appointmentTime).local().isoWeekday();
      map[d] += 1;
    });

    const fullLabels = [1, 2, 3, 4, 5, 6, 7];
    const fullData = fullLabels.map((d) => map[d]);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return buildFinal(fullLabels, fullData, fullLabels, (d) => days[d - 1]);
  }

  handleBookingDay(appointments: any[]) {
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

    // 🔥 COUNT
    appointments.forEach((item) => {
      const h = moment(item.appointmentTime).local().hour();

      if (h >= startHour && h <= lastHour) {
        map[h] += 1;
      }
    });

    const fullData = hours.map((h) => map[h]);

    const selected = buildBusinessHourLabels(lastHour);

    return buildFinal(hours, fullData, selected, (h) => `${h}h`);
  }

  async status(query: any) {
    const range = query.range || 'day';

    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (range === 'day') {
      startDate = moment().startOf('day').toDate();
      endDate = moment().endOf('day').toDate();
    }

    if (range === 'week') {
      startDate = moment().startOf('isoWeek').toDate();
      endDate = moment().endOf('isoWeek').toDate();
    }

    if (range === 'month') {
      startDate = moment().startOf('month').toDate();
      endDate = moment().endOf('month').toDate();
    }

    const where: any = {
      ...(startDate &&
        endDate && {
          appointmentTime: {
            gte: startDate,
            lte: endDate,
          },
        }),
    };

    const appointments = await this.prisma.appointment.findMany({
      where,
      select: {
        status: true,
        appointmentTime: true,
      },
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
}
