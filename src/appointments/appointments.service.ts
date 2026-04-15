import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';
import moment from 'moment';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(body: any, userId: number) {
    const { serviceId, appointmentTime } = body;

    // check service tồn tại
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
        serviceId,
        appointmentTime: new Date(appointmentTime),
      },
    });

    if (exist) {
      return {
        code: -1,
        message: 'Time slot already booked',
      };
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        userId,
        serviceId,
        appointmentTime: new Date(appointmentTime),
        appointmentDate: new Date(appointmentTime),
        status: 'PENDING',
      },
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

    const { date, status } = query;

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
    // 1. check appointment
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

    // 3. check staff tồn tại
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
}
