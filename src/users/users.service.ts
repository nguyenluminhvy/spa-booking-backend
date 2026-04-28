import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

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
    try {
      const { email, password, name } = data;

      if (!email || !name) {
        return {
          code: -1,
          message: 'Please fill in all required information.',
          data: null,
        };
      }

      if (password.length < 6) {
        return {
          code: -1,
          message: 'Password must be at least 8 characters.',
          data: null,
        };
      }

      const existed = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existed) {
        return {
          code: -1,
          message: 'This email is already in use.',
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

      await this.mailService.sendStaffInvitation(email, rawPassword, name);

      return {
        code: 0,
        message: 'Staff account created successfully.',
        data: newUser,
      };
    } catch (err: any) {
      console.error('Create staff error:', err);

      return {
        code: -1,
        message: 'Something went wrong. Please try again later.',
        data: null,
      };
    }
  }

  async updateStaff(id: number, data: any) {
    const { email, name } = data;

    if (!email || !name) {
      return {
        code: -1,
        message: 'Please fill in all required information.',
        data: null,
      };
    }

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
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return {
          code: -1,
          message: 'User not found.',
        };
      }

      if (user.role === 'STAFF') {
        const activeAppointments = await this.prisma.appointment.count({
          where: {
            staffId: id,
            status: {
              in: ['CONFIRMED'],
            },
          },
        });

        if (activeAppointments > 0) {
          return {
            code: -1,
            message:
              'This staff member still has ongoing appointments. Please complete or reassign them before deactivating.',
          };
        }
      }

      await this.prisma.user.update({
        where: { id },
        data: { status: 'INACTIVE' },
      });

      return {
        code: 0,
        message: 'User has been deactivated successfully.',
        data: {},
      };
    } catch (err) {
      console.error('Deactivate user error:', err);

      return {
        code: -1,
        message: 'Something went wrong. Please try again later.',
      };
    }
  }

  async resetPassword(id: number) {
    const passwordDefault = '12345678';
    const hashedPassword = await bcrypt.hash(passwordDefault, 10);

    const { email } = await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    await this.mailService.sendResetPasswordByAdmin(email);

    return {
      code: 0,
      message: 'Reset password successfully!',
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
