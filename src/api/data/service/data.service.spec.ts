import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { HttpModule } from '@nestjs/axios';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService],
      imports: [HttpModule]
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
