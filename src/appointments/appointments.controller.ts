import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('create')
  create(@Body() body: any, @Req() req: any) {
    return this.appointmentsService.create(body, req.user.sub);
  }

  @Get()
  findAll(@Req() req: any, @Query() query: any) {
    return this.appointmentsService.findAll(req, query);
  }

  @Get('upcoming')
  findUpComing(@Req() req: any, @Query() query: any) {
    return this.appointmentsService.findUpComing(req, query);
  }

  @Get('past')
  findPast(@Req() req: any, @Query() query: any) {
    return this.appointmentsService.findPast(req, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.appointmentsService.update(Number(id), body);
  }

  @Roles('ADMIN')
  @Patch(':id/confirm')
  confirmAppointment(@Param('id') id: string) {
    return this.appointmentsService.confirmAppointment(Number(id));
  }

  @Patch(':id/cancel')
  cancelAppointment(@Param('id') id: string) {
    return this.appointmentsService.cancelAppointment(Number(id));
  }

  @Patch(':id/complete')
  completeAppointment(@Param('id') id: string) {
    return this.appointmentsService.completeAppointment(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(Number(id));
  }

  @Roles('ADMIN')
  @Patch(':id/assign')
  assignStaff(@Param('id') id: string, @Body('staffId') staffId: number) {
    return this.appointmentsService.assignStaff(+id, staffId);
  }

  @Roles('ADMIN')
  @Get(':id/availableStaff')
  getAvailableStaff(@Param('id') id: string) {
    return this.appointmentsService.getAvailableStaff(+id);
  }
}
