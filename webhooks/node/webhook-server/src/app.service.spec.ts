import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { deliveryPayloadMock } from '../test/mocks/delivery-payload.mock';
import configuration from './config/configuration';

describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should throw exception when headerSignature is missing', () => {
      expect(() =>
        appService.verifySignature(null, deliveryPayloadMock),
      ).toThrowError(BadRequestException);
    });
    it('should throw exception when headerSignature does not match payload signature', () => {
      const modifiedDeliveryPayload = {
        ...deliveryPayloadMock,
        timestamp: 1684493582100,
      };
      const headerSignature = appService.signPayload(modifiedDeliveryPayload);
      expect(() =>
        appService.verifySignature(headerSignature, deliveryPayloadMock),
      ).toThrowError(BadRequestException);
    });
  });
});
