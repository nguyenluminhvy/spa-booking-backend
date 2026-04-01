import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Roles('ADMIN')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Query() body: any) {
    return this.usersService.findAll(body);
  }

  @Get('staffs')
  findAllStaff() {
    return this.usersService.findAllStaff();
  }

  @Post('staff/create')
  createStaff(@Body() body: any) {
    return this.usersService.createStaff(body);
  }

  @Patch('staff/:id')
  updateStaff(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateStaff(Number(id), body);
  }

  @Get('staff/:id')
  findOneStaff(@Param('id') id: string) {
    return this.usersService.findOneStaff(Number(id));
  }

  @Patch(':id/activate')
  activateUser(@Param('id') id: string) {
    return this.usersService.activateUser(Number(id));
  }

  @Patch(':id/deactivate')
  deactivateUser(@Param('id') id: string) {
    return this.usersService.deactivateUser(Number(id));
  }

  @Post('staff/:id/resetPassword')
  resetPassword(@Param('id') id: string) {
    return this.usersService.resetPassword(Number(id));
  }
}
