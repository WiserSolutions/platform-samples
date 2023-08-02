import { Controller, Post, Body, Headers } from '@nestjs/common';
import { DeliveryPayload } from './types';
import { AppService } from './app.service';
import { X_W_SIGNATURE } from './constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('webhook')
  async processEvent(
    @Headers(X_W_SIGNATURE) signature: string,
    @Body() payload: DeliveryPayload,
  ) {
    this.appService.processEvent({ signature, payload });
  }
}
