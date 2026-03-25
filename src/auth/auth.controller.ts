import { Controller, Post, Body, Get, Req } from '@nestjs/common';
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
}
