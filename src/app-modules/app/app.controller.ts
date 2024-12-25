import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';
import { WinstonLoggerService } from 'src/logger/winston-logger.service';
@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly winstonLoggerService: WinstonLoggerService,
  ) {}

  @Get()
  getHello(): string {
    this.winstonLoggerService
      .getLogger()
      .info('Hello World', { label: AppController.name });
    return this.appService.getHello();
  }
}
