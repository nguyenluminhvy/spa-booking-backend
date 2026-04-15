import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import type { Request } from 'express';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Req() req: Request, @Body() body: any) {
    return this.reviewsService.createReview(req, body);
  }

  @Get('service/:serviceId')
  getServiceReviews(@Param('serviceId') serviceId: string) {
    return this.reviewsService.getServiceReviews(Number(serviceId));
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.reviewsService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(Number(id));
  }
}
