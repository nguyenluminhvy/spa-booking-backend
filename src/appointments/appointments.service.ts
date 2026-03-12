import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.appointment.create({
      data: {
        userId: data.userId,
        serviceId: data.serviceId,
        appointmentDate: new Date(data.appointmentDate),
        appointmentTime: data.appointmentTime,
        status: data.status || 'pending',
      },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      include: {
        user: true,
        service: true,
      },
    });
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

  remove(id: number) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
