import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import type { Request } from 'express';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private firebaseService: FirebaseService,
  ) {}

  @Get()
  findAll(@Req() req: Request) {
    const userId = req.user.sub;

    return this.notificationsService.findAll(userId);
  }

  @Get('unread')
  getUnreadCount(@Req() req: Request) {
    const userId = req.user.sub;

    return this.notificationsService.getUnreadCount(userId);
  }

  @Post('markAsRead/:notificationId')
  markAsRead(@Param('notificationId') notificationId: number) {
    return this.notificationsService.markAsRead(Number(notificationId));
  }

  @Post('markAllAsRead')
  markAllAsRead(@Req() req: Request) {
    const userId = req.user.sub;
    return this.notificationsService.markAllAsRead(userId);
  }

  @Post('push')
  async sendPush(@Body() body: any) {
    return this.firebaseService.sendTestNotification(body.token);
  }
}
