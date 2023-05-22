import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { deliveryPayloadMock } from '../test/mocks/delivery-payload.mock';
import configuration from './config/configuration';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should call verifySignature with headerSignature and deliveryPayload', () => {
      const headerSignature = 'headerSignatureHash';
      const verifySignatureSpy = jest
        .spyOn(appService, 'verifySignature')
        .mockReturnValue();
      appController.processEvent(headerSignature, deliveryPayloadMock);
      expect(verifySignatureSpy).toBeCalledWith(
        headerSignature,
        deliveryPayloadMock,
      );
    });
  });
});
