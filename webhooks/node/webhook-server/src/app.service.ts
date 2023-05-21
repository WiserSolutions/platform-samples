import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hmac } from './utils';
import { DeliveryPayload } from './types';
import { X_W_SIGNATURE } from './constants';

@Injectable()
export class AppService {
  /**
   * SECRET_TOKEN env variable
   * Can be provided in the .env file
   */
  private secretToken: string;

  constructor(configService: ConfigService) {
    // get SECRET_TOKEN from the env variable
    this.secretToken = configService.get<string>('secretToken');
    // verify token provided
    if (!this.secretToken)
      throw new Error('SECRET_TOKEN env variable is missing');
  }

  /**
   * Sign payload using sha256 algorithm and hex encoding
   * @param data
   * @returns
   */
  signPayload(data: DeliveryPayload) {
    return hmac(JSON.stringify(data), this.secretToken);
  }

  /**
   * Verify headerSignature exists.
   * Compare data signature with the headerSignature.
   *
   * @throws exceptions when header signature does not exists or
   * does not match data signature.
   * @param headerSignature
   * @param data
   */
  verifySignature(headerSignature: string, data: DeliveryPayload) {
    // check x-w-signature-256 exists
    if (!headerSignature)
      throw new BadRequestException(`${X_W_SIGNATURE} header is missing`);
    // generate payload signature
    const payloadSignature = this.signPayload(data);
    // verify header signature and content signature match
    if (headerSignature !== payloadSignature)
      throw new BadRequestException(
        `Request signatures do not match. Header signature: ${headerSignature} Payload signature: ${payloadSignature}`,
      );
  }
}
