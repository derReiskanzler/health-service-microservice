import { Test, TestingModule } from '@nestjs/testing';
import { ServiceStatusService } from '../service/service-status.service';
import { ServiceStatusController } from './service-status.controller';
import { HttpModule } from '@nestjs/axios';

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
