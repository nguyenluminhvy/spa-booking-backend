import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.review.create({
      data: {
        userId: data.userId,
        serviceId: data.serviceId,
        rating: data.rating,
        comment: data.comment,
      },
    });
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
