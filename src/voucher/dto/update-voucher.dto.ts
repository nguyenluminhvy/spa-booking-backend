export class UpdateVoucherDto {
  code?: string;

  type?: 'PERCENT' | 'FIXED';

  value?: number;

  maxDiscount?: number;

  usageLimit?: number;

  startDate: string;

  endDate: string;

  status?: 'ACTIVE' | 'INACTIVE';
}
