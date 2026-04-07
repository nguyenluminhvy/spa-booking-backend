import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Roles('ADMIN')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  findOverview(@Query() query: any) {
    return this.dashboardService.overview(query);
  }

  @Get('revenue')
  findRevenue(@Query() query: any) {
    return this.dashboardService.revenue(query);
  }
}
