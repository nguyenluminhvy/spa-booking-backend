import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { equal } from 'node:assert';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(body: any) {
    const whereConditions: any = {
      role: {
        not: 'ADMIN',
      },
    };

    if (body.role === 'STAFF') {
      whereConditions.role = 'STAFF';
    }

    const users = await this.prisma.user.findMany({
      where: whereConditions,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        status: true,
      },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: users,
    };
  }

  async findAllStaff() {
    const whereConditions: any = {
      role: 'STAFF',
      status: 'ACTIVE',
    };

    const staffs = await this.prisma.user.findMany({
      where: whereConditions,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: staffs,
    };
  }

  async createStaff(data: any) {
    const { email, password, name } = data;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return {
        code: -1,
        message: 'Email already exists',
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'STAFF',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        status: true,
      },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: newUser,
    };
  }

  async updateStaff(id: number, data: any) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        status: true,
      },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: user,
    };
  }

  async activateUser(id: number) {
    await this.prisma.user.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: {},
    };
  }

  async deactivateUser(id: number) {
    await this.prisma.user.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: {},
    };
  }

  async resetPassword(id: number) {
    const passwordDefault = '12345678';
    const hashedPassword = await bcrypt.hash(passwordDefault, 10);

    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: {},
    };
  }

  async findOneStaff(id: number) {
    const staff = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        status: true,
      },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: staff,
    };
  }
}
