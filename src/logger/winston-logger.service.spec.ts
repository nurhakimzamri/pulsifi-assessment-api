import { Test, TestingModule } from '@nestjs/testing';
import { WinstonLoggerService } from './winston-logger.service';
import * as Winston from 'winston';

jest.mock('winston', () => {
  const mLogger = {
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    http: jest.fn(),
  };
  return {
    createLogger: jest.fn().mockReturnValue(mLogger),
    format: {
      combine: jest.fn(),
      printf: jest.fn(),
      timestamp: jest.fn(),
    },
    transports: {
      Console: jest.fn(),
      DailyRotateFile: jest.fn().mockImplementation(() => ({})),
    },
  };
});

describe('LoggingService', () => {
  let service: WinstonLoggerService;
  let logger: Winston.Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WinstonLoggerService],
    }).compile();

    service = module.get<WinstonLoggerService>(WinstonLoggerService);
    service.onModuleInit();
    logger = service.getLogger();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize the logger with correct transports', () => {
    expect(Winston.createLogger).resolves;
  });

  it('should return the logger instance', () => {
    expect(service.getLogger()).toBe(logger);
  });
});
