import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonLoggerService } from '../../logger/winston-logger.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService,
        {
          provide: WinstonLoggerService,
          useFactory: jest.fn(() => ({
            getLogger: jest.fn().mockReturnValue({
              info: jest.fn().mockReturnValue('unit test log message')
            })
          }))
        }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Up and Running!"', () => {
      expect(appController.getHello()).toBe('Up and Running!');
    });
  });
});
