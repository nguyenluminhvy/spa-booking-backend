import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { NotificationEvent } from './notification-event.enum';
import moment from 'moment';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private firebaseService: FirebaseService,
  ) {}

  findAll() {
    return this.prisma.notification.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.notification.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.notification.delete({
      where: { id },
    });
  }

  async emit(event: NotificationEvent, payload: any) {
    const config = await this.resolve(event, payload);

    const userIds = config.userIds.filter(Boolean) as number[];

    if (userIds.length === 0) return;

    // 1. lưu DB từng user
    await this.prisma.notification.createMany({
      data: userIds.map((userId) => ({
        userId,
        title: config.title,
        body: config.body,
        type: event,
        data: config.data,
      })),
    });

    // 2. lấy tokens
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { deviceToken: true },
    });

    const tokens = users
      .map((u) => u.deviceToken)
      .filter((t): t is string => !!t);

    // 3. push (🔥 multicast)
    await this.firebaseService.sendMulticast(
      tokens,
      config.title,
      config.body,
      config.data,
    );
  }

  private async resolve(event: NotificationEvent, payload: any) {
    const { appointmentId } = payload;

    const appt = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        user: true,
        staff: true,
        service: true,
      },
    });

    if (!appt) {
      throw new Error('Appointment not found');
    }

    const date = moment(appt.appointmentTime).format('DD/MM');
    const time = moment(appt.appointmentTime, 'HH:mm').format('HH:mm');

    const admins = await this.prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: { id: true },
    });

    const adminIds = admins.map((a) => a.id);

    switch (event) {
      case NotificationEvent.BOOKING_CREATED:
        return {
          userIds: adminIds,
          title: 'New Appointment',
          body: `${appt.user.name} booked ${appt.service.name} on ${date} at ${time}`,
          data: { appointmentId },
        };

      case NotificationEvent.BOOKING_CONFIRMED:
        return {
          userIds: [appt.userId],
          title: 'Booking Confirmed',
          body: `${appt.service.name} on ${date} at ${time} has been confirmed`,
          data: { appointmentId },
        };

      case NotificationEvent.BOOKING_ASSIGNED:
        return {
          userIds: [appt.staffId],
          title: 'New Assignment',
          body: `You have a ${appt.service.name} appointment at ${time}`,
          data: { appointmentId },
        };

      case NotificationEvent.BOOKING_COMPLETED:
        return {
          userIds: adminIds,
          title: 'Appointment Completed',
          body: `${appt.staff?.name} completed ${appt.service.name}`,
          data: { appointmentId },
        };

      case NotificationEvent.BOOKING_CANCELLED:
        return {
          userIds: [...adminIds, appt.staffId].filter(Boolean),
          title: 'Booking Cancelled',
          body: `${appt.user.name} cancelled ${appt.service.name} at ${time}`,
          data: { appointmentId },
        };
    }
  }
}
