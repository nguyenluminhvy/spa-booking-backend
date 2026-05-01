import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

@Injectable()
export class VoucherService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    try {
      const { status = 'ALL', state = 'ALL', orderBy } = query;

      const now = new Date();

      let whereCondition: any = {};

      if (status !== 'ALL') {
        whereCondition.status = status;
      }

      if (state === 'UPCOMING') {
        whereCondition.startDate = { gt: now };
      }

      if (state === 'RUNNING') {
        whereCondition.startDate = { lte: now };
        whereCondition.endDate = { gte: now };
      }

      if (state === 'EXPIRED') {
        whereCondition.endDate = { lt: now };
      }

      const vouchers = await this.prisma.voucher.findMany({
        where: whereCondition,

        orderBy: {
          createdAt: orderBy ?? 'desc',
        },
      });

      const data = vouchers.map((v) => {
        let runtimeState = 'UNKNOWN';

        if (v.endDate < now) runtimeState = 'EXPIRED';
        else if (v.startDate > now) runtimeState = 'UPCOMING';
        else runtimeState = 'RUNNING';

        return {
          ...v,
          runtimeState,
          isExpired: runtimeState === 'EXPIRED',
          isUsable: v.status === 'ACTIVE' && runtimeState === 'RUNNING',
        };
      });

      return {
        code: 0,
        message: 'Vouchers retrieved successfully',
        data,
      };
    } catch (err) {
      console.log(err, 'err');

      return {
        code: -1,
        message: 'Unable to fetch vouchers. Please try again.',
        data: [],
      };
    }
  }

  async findOne(id: number) {
    try {
      const voucher = await this.prisma.voucher.findUnique({
        where: { id },
      });

      if (!voucher) {
        return {
          code: -1,
          message: 'Voucher not found.',
          data: null,
        };
      }

      return {
        code: 0,
        message: 'Voucher retrieved successfully',
        data: voucher,
      };
    } catch (err) {
      return {
        code: -1,
        message: 'Something went wrong. Please try again later.',
        data: null,
      };
    }
  }

  async create(dto: CreateVoucherDto) {
    const {
      code,
      type,
      value,
      maxDiscount,
      usageLimit,
      startDate,
      endDate,
      status,
    } = dto;

    const exist = await this.prisma.voucher.findUnique({
      where: { code },
    });

    if (exist) {
      return {
        code: -1,
        message: 'Voucher code already exists',
      };
    }

    if (!value || value <= 0) {
      return {
        code: -1,
        message: 'Voucher value must be greater than 0',
      };
    }

    if (type === 'PERCENT' && value > 100) {
      return {
        code: -1,
        message: 'Percent value cannot exceed 100%',
      };
    }

    if (maxDiscount !== undefined && maxDiscount < 0) {
      return {
        code: -1,
        message: 'Invalid max discount value',
      };
    }

    if (usageLimit !== undefined && Number(usageLimit) <= 0) {
      return {
        code: -1,
        message: 'Usage limit must be greater than 0',
      };
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    if (start >= end) {
      return {
        code: -1,
        message: 'Start date must be before end date',
      };
    }

    const voucher = await this.prisma.voucher.create({
      data: {
        code,
        type,
        value,
        maxDiscount: maxDiscount ?? null,
        usageLimit: usageLimit ?? null,
        startDate: start,
        endDate: end,
        status: status,
      },
    });

    return {
      code: 0,
      message: 'Voucher created successfully',
      data: voucher,
    };
  }

  async validateAndCalculate(code: string, totalAmount: number) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { code },
    });

    if (!voucher || voucher.status !== 'ACTIVE') {
      return {
        code: -1,
        message: 'This coupon is not available',
      };
    }

    const now = new Date();

    if (now < voucher.startDate || now > voucher.endDate) {
      return {
        code: -1,
        message: 'This coupon has expired',
      };
    }

    if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
      return {
        code: -1,
        message: 'This coupon is no longer available',
      };
    }

    let discount = 0;

    if (voucher.type === 'PERCENT') {
      discount = (totalAmount * voucher.value) / 100;

      if (voucher.maxDiscount) {
        discount = Math.min(discount, voucher.maxDiscount);
      }
    } else {
      discount = voucher.value;
    }

    discount = Math.min(discount, totalAmount);

    return {
      code: 0,
      message: 'Voucher applied successfully',
      data: {
        discount,
        finalAmount: totalAmount - discount,
      },
    };
  }

  async update(id: number, dto: UpdateVoucherDto) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { id },
    });

    if (!voucher) {
      return {
        code: -1,
        message: 'Voucher not found',
      };
    }

    if (dto.code && dto.code !== voucher.code) {
      const exist = await this.prisma.voucher.findUnique({
        where: { code: dto.code },
      });

      if (exist) {
        return {
          code: -1,
          message: 'Voucher code already exists',
        };
      }
    }

    if (dto.type === 'PERCENT' && dto.value && dto.value > 100) {
      return {
        code: -1,
        message: 'Percent value cannot exceed 100%',
      };
    }

    if (dto.maxDiscount && dto.maxDiscount < 0) {
      return {
        code: -1,
        message: 'Invalid max discount value',
      };
    }

    if (dto.usageLimit && dto.usageLimit < voucher.usedCount) {
      return {
        code: -1,
        message: 'Usage limit cannot be less than used count',
      };
    }

    const start = new Date(dto.startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(dto.endDate);
    end.setHours(23, 59, 59, 999);

    if (start >= end) {
      return {
        code: -1,
        message: 'Start date must be before end date',
      };
    }

    const updated = await this.prisma.voucher.update({
      where: { id },
      data: {
        ...dto,
        startDate: dto.startDate ? start : undefined,
        endDate: dto.endDate ? end : undefined,
      },
    });

    return {
      code: 0,
      message: 'Voucher updated successfully',
      data: updated,
    };
  }

  async increaseUsage(code: string) {
    await this.prisma.voucher.update({
      where: { code },
      data: {
        usedCount: { increment: 1 },
      },
    });
  }

  async decreaseUsage(code: string) {
    await this.prisma.voucher.update({
      where: { code },

      data: {
        usedCount: {
          decrement: 1,
        },
      },
    });
  }

  async activateVoucher(id: number) {
    await this.prisma.voucher.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: {},
    };
  }

  async deactivateVoucher(id: number) {
    await this.prisma.voucher.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });

    return {
      code: 0,
      message: 'SUCCESS',
      data: {},
    };
  }
}
