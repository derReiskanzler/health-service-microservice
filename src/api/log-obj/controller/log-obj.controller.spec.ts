import { Test, TestingModule } from '@nestjs/testing';
import { MockService } from '../../../testing/mock-service.stub';
import { LogObjService } from '../service/log-obj.service';
import { LogObjController } from './log-obj.controller';

describe('LogObjController', () => {
  let controller: LogObjController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogObjController],
      providers: [ { provide: LogObjService, useClass: MockService} ]
    }).compile();

    controller = module.get<LogObjController>(LogObjController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
