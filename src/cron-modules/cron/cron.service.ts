import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly _logger = new Logger(CronService.name);
  constructor(
  ) {}

  /**
   * Cron job for checking pending emails that need to be sent
   * @param {any} CronExpression.EVERY_MINUTE
   * @returns {void}
   */
  @Cron(CronExpression.EVERY_MINUTE)
  checkPendingEmailsToBeSent(): void {
    this._logger.log('Email CronJob Triggered');
  }
}
