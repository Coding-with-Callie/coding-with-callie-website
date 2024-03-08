import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('readyz')
  checkReadiness() {
    return 'READY!';
  }

  @Get('workshops')
  getAllWorkshops() {
    return this.appService.getAllWorkshops();
  }

  @Get('workshop/:id')
  getWorkshopById(@Param('id') id) {
    return this.appService.getWorkshopById(id);
  }
}
