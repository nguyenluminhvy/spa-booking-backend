import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        isRead: false,
      },
    });
  }

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

  update(id: number, data: any) {
    return this.prisma.notification.update({
      where: { id },
      data: {
        title: data.title,
        message: data.message,
        isRead: data.isRead,
      },
    });
  }

  remove(id: number) {
    return this.prisma.notification.delete({
      where: { id },
    });
  }
}
