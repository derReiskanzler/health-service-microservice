import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from './../src/app.module';
import { LogObj } from '../src/entities/log-obj.entity';
import { PaginatedLogsResponse } from '../src/models/paginated-logs-response.model';

describe('LogObjController (e2e)', () => {
  let app: INestApplication;
  const logObj = {
    info: {
        selfServiceName: 'INDEX',
        otherServiceName: 'STORAGE',
        httpMethod: 'GET',
        statusCode: 200,
        requestedUrl: 'http://cl-svc-245.ris.beuth-hochschule.de:3000/',
        timestamp: new Date().toUTCString()
    }
  } as LogObj;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/v1/health/log (POST)', () => {
    return supertest(app.getHttpServer())
        .post('/v1/health/log')
        .send(logObj)
        .expect(201)
        .then(res => res.body as LogObj)
        .then((res: LogObj) => {
          expect(res).toBeTruthy();
          expect(res?.info).toBeTruthy();
        });
  });

  it('/v1/health/logs (GET)', () => {
    return supertest(app.getHttpServer())
        .get('/v1/health/logs')
        .expect(200)
        .then(res => res.body as PaginatedLogsResponse)
        .then((res: PaginatedLogsResponse) => {
            expect(res?.data).toBeTruthy();
            expect(typeof(res?.data)).toBe('object');

            expect(res?.limit).toBeTruthy();
            expect(typeof(res?.limit)).toBe('number');

            expect(res?.page).toBeTruthy();
            expect(typeof(res?.page)).toBe('number');

            expect(res?.totalCount).toBeTruthy();
            expect(typeof(res?.totalCount)).toBe('number');

            expect(res?.totalPages).toBeTruthy();
            expect(typeof(res?.totalPages)).toBe('number');
        });
  });
});