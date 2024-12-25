import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CronService {
  private readonly _logger = new Logger(CronService.name);
  constructor() {}
}
