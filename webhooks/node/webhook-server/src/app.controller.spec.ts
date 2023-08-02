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
    it('should call processEvent with headerSignature and deliveryPayload', () => {
      const signature = 'headerSignatureHash';
      const processEventSpy = jest
        .spyOn(appService, 'processEvent')
        .mockReturnValue();
      appController.processEvent(signature, deliveryPayloadMock);
      expect(processEventSpy).toBeCalledWith({
        signature,
        payload: deliveryPayloadMock,
      });
    });
  });
});
