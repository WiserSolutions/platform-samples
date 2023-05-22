import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';
import { X_W_SIGNATURE } from './../src/constants';

import { deliveryPayloadMock } from './mocks/delivery-payload.mock';
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    appService = app.get<AppService>(AppService);
  });

  it('/webhook (POST)', () => {
    return request(app.getHttpServer())
      .post('/webhook')
      .set(X_W_SIGNATURE, appService.signPayload(deliveryPayloadMock))
      .send(deliveryPayloadMock)
      .expect(201);
  });
});
