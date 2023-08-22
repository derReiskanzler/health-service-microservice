import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../src/app.module';
import { DataResponse } from '../src/models/data-response.model';

describe('DataController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/v1/health/data (GET)', () => {
    return supertest(app.getHttpServer())
    .get('/v1/health/data')
    .expect(200)
    .then((res: any) => res.body as DataResponse)
    .then((res: DataResponse) => {
      expect(res?.memeCount).toBeTruthy();
      expect(typeof(res?.memeCount)).toEqual('number');

      expect(res?.popularTags).toBeTruthy();
      expect(typeof(res?.popularTags)).toEqual('object');

      expect(res?.registeredUsersCount).toBeTruthy();
      expect(typeof(res?.registeredUsersCount)).toEqual('number');

      expect(res?.requestCount).toBeTruthy();
      expect(typeof(res?.requestCount)).toEqual('number');
    });
  }, 100000);
});
