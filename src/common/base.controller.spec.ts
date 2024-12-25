import { Test, TestingModule } from '@nestjs/testing';
import { BaseController } from './base.controller';

describe('BaseController', () => {
  let controller: BaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseController],
    }).compile();

    controller = module.get<BaseController>(BaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('succeed', () => {
    it('should return a response with status 200 and data', () => {
      const data = { activity: 'my activity test' };
      const response = controller.succeed({ data });
      expect(response).toEqual({
        status: 200,
        message: 'Successful',
        data: data,
      });
    });

    it('should return a response with status 200 and data null', () => {
      const response = controller.succeed();
      expect(response).toEqual({
        status: 200,
        message: 'Successful',
        data: null
      });
    });

    it('should return a response with status 200, array of data and total', () => {
      const dataWithTotalMock = {
        data: [{
          activity1: 'my activity test'
        },
        {
          activity2: 'my activity test2'
        }],
        total: 2
      };
      const response = controller.succeed(dataWithTotalMock);
      expect(response).toEqual({
        status: 200,
        message: 'Successful',
        data: dataWithTotalMock.data,
        total: dataWithTotalMock.total
      });
    });
  });
});