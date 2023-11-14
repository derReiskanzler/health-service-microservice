import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from '../service/data.service';
import { DataController } from './data.controller';
import { HttpModule } from '@nestjs/axios';

describe('DataController', () => {
  let controller: DataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [DataService],
      imports: [HttpModule]
    }).compile();

    controller = module.get<DataController>(DataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
