import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from './../src/app.module';
import { ServiceStatusResponse } from '../src/models/service-status-response.model';
import { ServiceName } from '../src/models/service-name.model';
import { Status } from '../src/models/service-status-obj.model';

describe('ServiceStatusController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/v1/health/services (GET)', () => {
    return supertest(app.getHttpServer())
      .get('/v1/health/services')
      .expect(200)
      .then((res: any) => res.body as ServiceStatusResponse)
      .then((res: ServiceStatusResponse) => {
        const statuses = res?.serviceStatuses;
        expect(statuses).toBeTruthy();
        expect(typeof(statuses)).toEqual('object');
        for(const status of statuses) {
            expect(Object.values(ServiceName).includes(status.serviceName)).toBeTruthy();
            expect(Object.values(Status).includes(status.status)).toBeTruthy();
        }
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
