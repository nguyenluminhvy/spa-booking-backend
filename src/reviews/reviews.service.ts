import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(req: Request, body: any) {
    const userId = req.user.sub;
    const { appointmentId, rating, comment, tags } = body;

    if (!rating || rating < 1 || rating > 5) {
      return {
        code: -1,
        message: 'Rating must be between 1 and 5',
      };
    }

    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return {
        code: -1,
        message: 'Appointment not found',
      };
    }

    if (appointment.userId !== userId) {
      return {
        code: -1,
        message: 'You cannot review this appointment',
      };
    }

    if (appointment.status !== 'DONE') {
      return {
        code: -1,
        message: 'You can only review completed appointments',
      };
    }

    const existed = await this.prisma.review.findUnique({
      where: { appointmentId },
    });

    if (existed) {
      return {
        code: -1,
        message: 'You have already reviewed this appointment',
      };
    }

    const review = await this.prisma.review.create({
      data: {
        userId,
        serviceId: appointment.serviceId,
        appointmentId,
        rating,
        comment,
        tags,
      },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: review,
    };
  }

  async getServiceReviews(serviceId: number) {
    const reviews = await this.prisma.review.findMany({
      where: { serviceId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = reviews.length;

    const average =
      total === 0
        ? 0
        : Number(
            (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1),
          );

    return {
      code: 0,
      message: 'SUCCESS',
      data: {
        average,
        total,
        reviews,
      },
    };
  }

  findAll() {
    return this.prisma.review.findMany({
      include: {
        user: true,
        service: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
        service: true,
      },
    });
  }

  update(id: number, data: any) {
    return this.prisma.review.update({
      where: { id },
      data: {
        rating: data.rating,
        comment: data.comment,
      },
    });
  }

  remove(id: number) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
