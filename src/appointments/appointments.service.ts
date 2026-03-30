import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';

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

  async findAll(req: Request) {
    const userId = req.user.sub;
    const role = req.user.role;

    const whereCondition =
      role === 'ADMIN'
        ? {}
        : {
            userId,
          };

    const appointments = await this.prisma.appointment.findMany({
      where: whereCondition,
      include: {
        user: true,
        service: true,
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
}
