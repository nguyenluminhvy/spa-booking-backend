import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { ValidateVoucherDto } from './dto/validate-voucher.dto';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private voucherService: VoucherService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.voucherService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(Number(id));
  }

  @Roles('ADMIN')
  @Post('create')
  create(@Body() body: CreateVoucherDto) {
    return this.voucherService.create(body);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateVoucherDto) {
    return this.voucherService.update(Number(id), body);
  }

  @Post('validate')
  validate(@Body() body: ValidateVoucherDto) {
    const { code, totalAmount } = body;

    return this.voucherService.validateAndCalculate(code, totalAmount);
  }

  @Patch(':id/activate')
  activateVoucher(@Param('id') id: string) {
    return this.voucherService.activateVoucher(Number(id));
  }

  @Patch(':id/deactivate')
  deactivateVoucher(@Param('id') id: string) {
    return this.voucherService.deactivateVoucher(Number(id));
  }
}
