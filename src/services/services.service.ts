import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(data: any, file: Express.Multer.File) {
    try {
      if (!data?.name || !data?.price || !data?.duration) {
        return {
          code: -1,
          message: 'Please fill in all required information.',
        };
      }

      if (!file) {
        return {
          code: -1,
          message: 'Please upload an image for this service.',
        };
      }

      const price = Number(data.price);

      const duration = Number(data.duration);

      if (isNaN(price) || price <= 0) {
        return {
          code: -1,
          message: 'Please enter a valid price.',
        };
      }

      if (isNaN(duration) || duration <= 0) {
        return {
          code: -1,

          message: 'Please enter a valid duration.',
        };
      }

      let uploadResult;

      try {
        uploadResult = await this.cloudinaryService.uploadFile(file);
      } catch (err) {
        return {
          code: -1,
          message: 'We couldn’t upload the image. Please try again.',
        };
      }

      const service = await this.prisma.service.create({
        data: {
          name: data.name,
          description: data.description || '',
          price,
          duration,
          imageUrl: uploadResult.secure_url,
        },
      });

      return {
        code: 0,
        message: 'Service created successfully ✨',
        data: service,
      };
    } catch (err) {
      console.error('Create service error:', err);

      return {
        code: -1,
        message: 'Something went wrong. Please try again later.',
      };
    }
  }

  async findAll(query: any) {
    const queryConditions: any = {
      orderBy: {
        createdAt: 'desc',
      },
    };

    if (query.limit) {
      queryConditions.take = Number(query.limit);
    }

    const services = await this.prisma.service.findMany(queryConditions);

    const reviewStats = await this.prisma.review.groupBy({
      by: ['serviceId'],
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    const map = reviewStats.reduce(
      (acc, item) => {
        acc[item.serviceId] = {
          average: item._avg.rating || 0,
          total: item._count.rating,
        };
        return acc;
      },
      {} as Record<number, { average: number; total: number }>,
    );

    const dataRtn = services.map((service) => ({
      ...service,
      rating: {
        average: Number((map[service.id]?.average || 0).toFixed(1)),
        total: map[service.id]?.total || 0,
      },
    }));

    return {
      code: 0,
      message: 'SUCCESS',
      data: dataRtn,
    };
  }

  async findOne(id: number) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: service,
    };
  }

  async update(id: number, data: any, file: Express.Multer.File) {
    try {
      if (!data?.name || !data?.price || !data?.duration) {
        return {
          code: -1,
          message: 'Please fill in all required information.',
        };
      }

      const price = Number(data.price);
      const duration = Number(data.duration);

      if (isNaN(price) || price <= 0) {
        return {
          code: -1,
          message: 'Please enter a valid price.',
        };
      }

      if (isNaN(duration) || duration <= 0) {
        return {
          code: -1,

          message: 'Please enter a valid duration.',
        };
      }

      const dataUpdate: any = {};

      if (file) {
        try {
          const result = await this.cloudinaryService.uploadFile(file);

          if (result) {
            dataUpdate.imageUrl = result.secure_url;
          }
        } catch (err) {
          return {
            code: -1,
            message: 'We couldn’t upload the image. Please try again.',
          };
        }
      }

      if (data) {
        dataUpdate.name = data?.name;
        dataUpdate.description = data?.description;
        dataUpdate.price = Number(data?.price);
        dataUpdate.duration = Number(data?.duration);
      }

      const service = await this.prisma.service.update({
        where: { id },
        data: dataUpdate,
      });

      return {
        code: 0,
        message: 'SUCCESS',
        data: service,
      };
    } catch (err) {
      console.error('Create service error:', err);

      return {
        code: -1,
        message: 'Something went wrong. Please try again later.',
      };
    }
  }

  remove(id: number) {
    return this.prisma.service.delete({
      where: { id },
    });
  }

  async uploadFile(file) {
    if (!file) {
      throw new Error('File not found');
    }

    const result = await this.cloudinaryService.uploadFile(file);

    return {
      message: 'Upload success',
      url: result.secure_url,
    };
  }
}
