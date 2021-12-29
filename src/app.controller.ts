/* --- Third-party libraries --- */
import { Controller, Get } from '@nestjs/common';

/* --- Services --- */
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
