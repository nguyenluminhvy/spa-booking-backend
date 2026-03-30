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
    const result = await this.cloudinaryService.uploadFile(file);

    const service = await this.prisma.service.create({
      data: {
        name: data?.name,
        description: data?.description,
        price: Number(data?.price),
        duration: Number(data?.duration),
        imageUrl: result.secure_url,
      },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: service,
    };
  }

  findAll() {
    return this.prisma.service.findMany();
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
    const dataUpdate: any = {};

    if (file) {
      const result = await this.cloudinaryService.uploadFile(file);

      if (result) {
        dataUpdate.imageUrl = result.secure_url;
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
