import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Info } from '../../../entities/info.entity';
import { LogObj } from '../../../entities/log-obj.entity';
import { LogObjService } from './log-obj.service';

export const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));
describe('LogObjService', () => {
  let service: LogObjService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogObjService,
        { provide: getRepositoryToken(LogObj), useClass: mockRepository },
        { provide: getRepositoryToken(Info), useClass: mockRepository }
      ],
    }).compile();

    service = module.get<LogObjService>(LogObjService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
