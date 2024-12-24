import { Injectable } from '@nestjs/common';
import Winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class WinstonLoggerService {
  private logger: Winston.Logger;
  private logFormat = Winston.format.printf(
    ({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    },
  );

  fileTransport = new Winston.transports.DailyRotateFile({
    filename: 'logs/applications/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
  });

  errorFileTransport = new Winston.transports.DailyRotateFile({
    filename: 'logs/errors/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
    level: 'error',
  });

  expTransport = new Winston.transports.DailyRotateFile({
    filename: 'logs/exceptions/exceptions-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
  });

  onModuleInit(): void {
    this.logger = Winston.createLogger({
      level: 'http',
      format: Winston.format.combine(
        Winston.format.timestamp(),
        this.logFormat,
      ),
      transports: [
        new Winston.transports.Console({ handleExceptions: true }),
        this.fileTransport,
        this.errorFileTransport,
      ],
      exceptionHandlers: [this.expTransport],
      exitOnError: false,
    });
  }

  public getLogger(): Winston.Logger {
    return this.logger;
  }
}
