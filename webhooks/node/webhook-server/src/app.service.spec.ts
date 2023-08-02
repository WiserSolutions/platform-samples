import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { deliveryPayloadMock } from '../test/mocks/delivery-payload.mock';
import { MAX_TIME_TO_DELIVER_MS } from './constants';
import configuration from './config/configuration';

describe('AppService', () => {
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

  describe('event processing', () => {
    it('should throw exception when headerSignature is missing', () => {
      expect(() =>
        appService.verifySignature({
          signature: null,
          payload: deliveryPayloadMock,
        }),
      ).toThrowError(BadRequestException);
    });

    it('should throw exception when headerSignature does not match payload signature', () => {
      const modifiedDeliveryPayload = {
        ...deliveryPayloadMock,
        timestamp: Date.now() - 3000,
      };
      const signature = appService.signPayload(modifiedDeliveryPayload);

      expect(() =>
        appService.verifySignature({ signature, payload: deliveryPayloadMock }),
      ).toThrowError(BadRequestException);
    });

    it('should throw exception when timestamp is older than MAX_TIME_TO_DELIVER_MS', () => {
      const modifiedDeliveryPayload = {
        ...deliveryPayloadMock,
        timestamp: Date.now() - (MAX_TIME_TO_DELIVER_MS + 1),
      };

      expect(() =>
        appService.verifyTimestamp(modifiedDeliveryPayload),
      ).toThrowError(BadRequestException);
    });
  });
});
