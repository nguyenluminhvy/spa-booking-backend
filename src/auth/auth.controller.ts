import { Controller, Post, Body, Get, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.authService.getProfile(req);
  }

  @Patch('change-password')
  changePassword(@Req() req: any, @Body() body: any) {
    return this.authService.changePassword(req, body);
  }

  @Patch('update-profile')
  updateProfile(@Req() req: any, @Body() body: any) {
    return this.authService.updateProfile(req, body);
  }
}
