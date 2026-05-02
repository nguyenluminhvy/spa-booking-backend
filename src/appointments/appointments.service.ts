import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';
import moment from 'moment';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationEvent } from 'src/notifications/notification-event.enum';
import { VoucherService } from 'src/voucher/voucher.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private voucherService: VoucherService,
  ) {}

  async create(body: any, userId: number) {
    const { serviceId, appointmentTime, voucherCode } = body;

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return {
        code: -1,
        message: 'Service not found',
      };
    }

    // check trùng giờ (basic)
    const exist = await this.prisma.appointment.findFirst({
      where: {
        // serviceId,
        userId: userId,
        appointmentTime: new Date(appointmentTime),
      },
    });

    if (exist) {
      return {
        code: -1,
        message:
          'You already have an appointment during this time slot. Please choose a different time.',
      };
    }

    const price = Number(service.price);

    let discount = 0;
    let finalPrice = price;

    if (voucherCode) {
      const result: any = await this.voucherService.validateAndCalculate(
        voucherCode,
        price,
      );

      if (result.code !== 0) return result;

      await this.voucherService.increaseUsage(voucherCode);

      discount = result.data.discount;

      finalPrice = result.data.finalAmount;
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        userId,
        serviceId,
        appointmentTime: new Date(appointmentTime),
        appointmentDate: new Date(appointmentTime),

        originalPrice: price,
        finalPrice,
        discount,
        voucherCode: voucherCode || null,

        status: 'PENDING',
      },
    });

    await this.notificationsService.emit(NotificationEvent.BOOKING_CREATED, {
      appointmentId: appointment.id,
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: appointment,
    };
  }

  async findAll(req: Request, query: any) {
    const userId = req.user.sub;
    const role = req.user.role;

    const { date, status, startDate, endDate } = query;

    let whereCondition: any = {};

    if (role === 'ADMIN') {
      whereCondition = {};
    }

    if (role === 'USER') {
      whereCondition = {
        userId,
      };
    }

    if (role === 'STAFF') {
      whereCondition = {
        staffId: userId,
      };
    }

    if (date) {
      if (date === 'today') {
        whereCondition.appointmentDate = {
          gte: moment().startOf('day').toDate(),
          lte: moment().endOf('day').toDate(),
        };
      } else {
        whereCondition.appointmentDate = {
          gte: moment(date).startOf('day').toDate(),
          lte: moment(date).endOf('day').toDate(),
        };
      }
    }

    if (startDate && endDate) {
      whereCondition.appointmentDate = {
        gte: moment(startDate).startOf('day').toDate(),
        lte: moment(endDate).endOf('day').toDate(),
      };
    }

    if (status) {
      whereCondition.status = status;
    }

    const appointments = await this.prisma.appointment.findMany({
      where: whereCondition,
      include: {
        user: true,
        service: true,
        staff: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // format data
    const dataRtn = appointments.map((item) => ({
      id: item.id,

      user: {
        id: item.user.id,
        name: item.user.name,
        email: item.user.email,
      },

      service: {
        id: item.service.id,
        name: item.service.name,
        price: item.service.price,
        imageUrl: item.service.imageUrl,
      },

      staff: {
        id: item.staff?.id,
        name: item.staff?.name,
      },

      originalPrice: item.originalPrice,
      finalPrice: item.finalPrice,
      discount: item.discount,
      voucherCode: item.voucherCode,

      appointmentTime: item.appointmentTime,
      appointmentDate: item.appointmentDate,
      status: item.status,
      createdAt: item.createdAt,
    }));

    return {
      code: 0,
      message: 'SUCCESS',
      data: dataRtn,
    };
  }

  findOne(id: number) {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: {
        user: true,
        service: true,
      },
    });
  }

  update(id: number, data: any) {
    return this.prisma.appointment.update({
      where: { id },
      data: {
        userId: data.userId,
        serviceId: data.serviceId,
        appointmentDate: data.appointmentDate
          ? new Date(data.appointmentDate)
          : undefined,
        appointmentTime: data.appointmentTime,
        status: data.status,
      },
    });
  }

  async confirmAppointment(id: number) {
    const appointment = await this.prisma.appointment.update({
      where: { id },
      data: { status: 'CONFIRMED' },
    });

    await this.notificationsService.emit(NotificationEvent.BOOKING_CONFIRMED, {
      appointmentId: id,
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: appointment,
    };
  }
  async cancelAppointment(id: number) {
    const appointment = await this.prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    await this.notificationsService.emit(NotificationEvent.BOOKING_CANCELLED, {
      appointmentId: id,
    });

    if (appointment.voucherCode) {
      await this.voucherService.decreaseUsage(appointment.voucherCode);
    }

    return {
      code: 0,
      message: 'SUCCESS',
      data: appointment,
    };
  }
  async completeAppointment(id: number) {
    const appointment = await this.prisma.appointment.update({
      where: { id },
      data: { status: 'DONE' },
    });

    await this.notificationsService.emit(NotificationEvent.BOOKING_COMPLETED, {
      appointmentId: id,
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: appointment,
    };
  }

  remove(id: number) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }

  async assignStaff(appointmentId: number, staffId: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return {
        code: -1,
        message: 'Appointment not found',
        data: {},
      };
    }

    if (appointment.status !== 'CONFIRMED') {
      return {
        code: -1,
        message: 'Only confirmed appointment can assign staff',
        data: {},
      };
    }

    const staff = await this.prisma.user.findUnique({
      where: { id: staffId },
    });

    if (!staff || staff.role !== 'STAFF') {
      return {
        code: -1,
        message: 'Invalid staff',
        data: {},
      };
    }

    const result = await this.prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        staffId,
      },
    });

    await this.notificationsService.emit(NotificationEvent.BOOKING_ASSIGNED, {
      appointmentId: appointmentId,
    });

    return {
      code: 0,
      message: 'Success',
      data: result,
    };
  }

  async findUpComing(req: any, query: any) {
    const userId = req.user.sub;
    const role = req.user.role;

    const now = moment();

    const whereCondition: any = { userId };
    const queryCondition: any = {};

    whereCondition.appointmentTime = {
      gte: now,
    };

    whereCondition.status = {
      in: ['PENDING', 'CONFIRMED'],
    };

    const appointments = await this.prisma.appointment.findMany({
      where: whereCondition,
      take: Number(query.limit) || 20,
      include: {
        user: true,
        service: true,
        staff: true,
      },
      orderBy: {
        appointmentTime: 'asc',
      },
    });

    const dataRtn = appointments.map((item) => ({
      id: item.id,

      user: {
        id: item.user.id,
        name: item.user.name,
        email: item.user.email,
      },

      service: {
        id: item.service.id,
        name: item.service.name,
        price: item.service.price,
        imageUrl: item.service.imageUrl,
      },

      staff: {
        id: item.staff?.id,
        name: item.staff?.name,
      },

      originalPrice: item.originalPrice,
      finalPrice: item.finalPrice,
      discount: item.discount,
      voucherCode: item.voucherCode,

      appointmentTime: item.appointmentTime,
      appointmentDate: item.appointmentDate,
      status: item.status,
      createdAt: item.createdAt,
    }));

    return {
      code: 0,
      message: 'SUCCESS',
      data: dataRtn,
    };
  }

  async findPast(req: any, query: any) {
    const userId = req.user.sub;
    const role = req.user.role;

    const whereCondition: any = { userId };

    whereCondition.status = {
      notIn: ['PENDING', 'CONFIRMED'],
    };

    const appointments = await this.prisma.appointment.findMany({
      where: whereCondition,
      // take: Number(query.limit) || 20,
      include: {
        user: true,
        service: true,
        staff: true,
        review: true,
      },
      orderBy: {
        appointmentTime: 'desc',
      },
    });

    const dataRtn = appointments.map((item) => ({
      id: item.id,

      user: {
        id: item.user.id,
        name: item.user.name,
        email: item.user.email,
      },

      service: {
        id: item.service.id,
        name: item.service.name,
        price: item.service.price,
        imageUrl: item.service.imageUrl,
      },

      staff: {
        id: item.staff?.id,
        name: item.staff?.name,
      },

      review: {
        id: item.review?.id,
        rating: item.review?.rating,
        comment: item.review?.comment,
      },

      originalPrice: item.originalPrice,
      finalPrice: item.finalPrice,
      discount: item.discount,
      voucherCode: item.voucherCode,

      appointmentTime: item.appointmentTime,
      appointmentDate: item.appointmentDate,
      status: item.status,
      createdAt: item.createdAt,
    }));

    return {
      code: 0,
      message: 'SUCCESS',
      data: dataRtn,
    };
  }

  async getAvailableStaff(appointmentId: number) {
    // 1. lấy appointment cần assign

    const target = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },

      include: { service: true },
    });

    if (!target) {
      return {
        code: -1,

        message: 'Appointment not found',
      };
    }

    const { startTime, endTime } = this.getTimeRange(target);

    const staffs = await this.prisma.user.findMany({
      where: {
        role: 'STAFF',
        status: 'ACTIVE',
      },
    });

    const staffAppointments: any = await this.prisma.appointment.findMany({
      where: {
        staffId: { not: null },
        status: { in: ['CONFIRMED'] },
      },

      include: { service: true },
    });

    const map: any = new Map<number, any[]>();

    for (const appt of staffAppointments) {
      if (!map.has(appt.staffId)) {
        map.set(appt.staffId, []);
      }

      map.get(appt.staffId).push(appt);
    }

    const result = staffs.map((staff) => {
      const appts = map.get(staff.id) || [];

      let isAvailable = true;

      for (const appt of appts) {
        const { startTime: s, endTime: e } = this.getTimeRange(appt);

        if (this.isOverlap(s, e, startTime, endTime)) {
          isAvailable = false;
          break;
        }
      }

      return {
        ...staff,
        isAvailable,
      };
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: result,
    };
  }

  private isOverlap(aStart, aEnd, bStart, bEnd) {
    return aStart < bEnd && aEnd > bStart;
  }

  private getTimeRange(appointment) {
    const start = moment(appointment.appointmentTime, 'YYYY-MM-DD HH:mm');

    const end = start.clone().add(appointment.service.duration, 'minutes');

    return {
      startTime: start.toDate(),
      endTime: end.toDate(),
    };
  }
}
