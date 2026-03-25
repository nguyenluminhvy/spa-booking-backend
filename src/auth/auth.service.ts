import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const { email, password, name } = data;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return newUser;
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
    console.log(req.user.sub, 'req user sub <<');
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
}
