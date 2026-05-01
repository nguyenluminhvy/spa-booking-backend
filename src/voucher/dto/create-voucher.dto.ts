export class CreateVoucherDto {
  code: string;

  type: 'PERCENT' | 'FIXED';

  value: number;

  status?: 'ACTIVE' | 'INACTIVE';

  maxDiscount?: number;

  usageLimit?: number;

  startDate: string;

  endDate: string;
}
