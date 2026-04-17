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

  @Public()
  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Public()
  @Post('confirm-otp')
  confirmOtp(@Body() body: any) {
    const { email, otp } = body;
    return this.authService.confirmOtp(email, otp);
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() body: any) {
    const { resetToken, newPassword } = body;
    return this.authService.resetPassword(resetToken, newPassword);
  }

  @Post('user/device-token')
  saveDeviceToken(@Req() req: Request, @Body('token') token: string) {
    const userId = req.user.sub;

    return this.authService.saveDeviceToken(userId, token);
  }
}
