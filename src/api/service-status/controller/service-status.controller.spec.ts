import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ServiceStatusService } from '../service/service-status.service';
import { ServiceStatusController } from './service-status.controller';

describe('ServiceStatusController', () => {
  let controller: ServiceStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceStatusController],
      providers: [ServiceStatusService],
      imports: [HttpModule]
    }).compile();

    controller = module.get<ServiceStatusController>(ServiceStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
