import { Controller, Post, Body, Headers, Logger } from '@nestjs/common';
import { DeliveryPayload } from './types';
import { AppService } from './app.service';
import { X_W_SIGNATURE } from './constants';

@Controller()
export class AppController {
  /**
   * Logger instance
   */
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Post('webhook')
  async processEvent(
    @Headers(X_W_SIGNATURE) headerSignature: string,
    @Body() data: DeliveryPayload,
  ) {
    this.appService.verifySignature(headerSignature, data);
    this.logger.log(`MESSAGE RECEIVED: ${JSON.stringify(data)}`);
  }
}
