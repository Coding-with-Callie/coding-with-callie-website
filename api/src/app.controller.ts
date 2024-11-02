import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('readyz')
  checkReadiness() {
    return 'READY!';
  }

  @Get('resources')
  getAllResources() {
    return this.appService.getAllResources();
  }

  @Get('workshops')
  getAllWorkshops() {
    return this.appService.getAllWorkshops();
  }

  @Get('alumni')
  getAllAlumni() {
    return this.appService.getAllAlumni();
  }
}
