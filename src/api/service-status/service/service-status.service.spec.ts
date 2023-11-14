import { Test, TestingModule } from '@nestjs/testing';
import { ServiceStatusService } from './service-status.service';
import { HttpModule } from '@nestjs/axios';

describe('ServiceStatusService', () => {
  let service: ServiceStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceStatusService],
      imports: [HttpModule]
    }).compile();

    service = module.get<ServiceStatusService>(ServiceStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
