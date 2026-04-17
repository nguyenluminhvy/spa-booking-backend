import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private firebaseService: FirebaseService,
  ) {}

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(Number(id));
  }

  @Post('push')
  async sendPush(@Body() body: any) {
    return this.firebaseService.sendTestNotification(body.token);
  }
}
