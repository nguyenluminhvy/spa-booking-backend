import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { Request } from 'express';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(data: any) {
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
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: newUser,
    };
  }

  async login(data: any) {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        code: -1,
        message: 'Invalid credentials',
        data: null,
      };
    }

    if (user.status === 'INACTIVE') {
      return {
        code: -1,
        message: 'Account is inactive',
        data: null,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        code: -1,
        message: 'Invalid credentials',
        data: null,
      };
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      code: 0,
      message: 'Login successful',
      data: {
        accessToken: this.jwtService.sign(payload),
        role: user.role,
        userId: user.id,
      },
    };
  }

  async getProfile(req: Request) {
    const id = req.user.sub;

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return {
      code: 0,
      message: 'Success',
      data: {
        id: user?.id,
        email: user?.email,
        name: user?.name,
        role: user?.role,
        phone: user?.phone,
      },
    };
  }

  async changePassword(req: any, body: any) {
    const userId = req.user.sub;

    const { oldPassword, newPassword } = body;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        code: -1,
        message: 'User not found',
      };
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return {
        code: -1,
        message: 'Old password is incorrect',
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return {
      code: 0,
      message: 'Password updated successfully',
    };
  }

  async updateProfile(req: any, body: any) {
    const userId = req.user.sub;

    const { name, phone } = body;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        code: -1,
        message: 'User not found',
      };
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    return {
      code: 0,
      message: 'Profile updated successfully',
      data: updatedUser,
    };
  }
}
