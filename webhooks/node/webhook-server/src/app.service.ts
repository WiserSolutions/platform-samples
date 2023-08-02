import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hmac } from './utils';
import { DeliveryPayload, EventData } from './types';
import { X_W_SIGNATURE, MAX_TIME_TO_DELIVER_MS } from './constants';

@Injectable()
export class AppService {
  /**
   * SECRET_TOKEN env variable
   * Can be provided in the .env file
   */
  private secretToken: string;
  /**
   * Logger instance
   */
  private readonly logger = new Logger(AppService.name);

  constructor(configService: ConfigService) {
    // get SECRET_TOKEN from the env variable
    this.secretToken = configService.get<string>('secretToken');
    // verify token provided
    if (!this.secretToken)
      throw new Error('SECRET_TOKEN env variable is missing');
  }

  /**
   * Verify event signature and payload timestamp
   */
  processEvent({ signature, payload }: EventData) {
    this.verifySignature({ signature, payload });
    this.verifyTimestamp(payload);

    this.logger.log(`MESSAGE RECEIVED: ${JSON.stringify(payload)}`);
  }

  /**
   * Verify signature exists.
   * Generate payload signature
   * Compare generated signature with provided signature in the header
   *
   * @throws exceptions when header signature does not exists or
   * does not match data signature.
   * @param data
   */
  verifySignature({ signature, payload }: EventData) {
    // check x-w-signature-256 exists
    if (!signature)
      throw new BadRequestException(`${X_W_SIGNATURE} header is missing`);
    // generate payload signature
    const payloadSignature = this.signPayload(payload);
    // verify header signature and content signature match
    if (signature !== payloadSignature)
      throw new BadRequestException(
        `Request signatures do not match. Header signature: ${signature} Payload signature: ${payloadSignature}`,
      );
  }

  /**
   * Verify payload timestamp is not expired
   */
  verifyTimestamp({ timestamp }: DeliveryPayload) {
    const processingTime = Date.now();
    if (timestamp < processingTime - MAX_TIME_TO_DELIVER_MS)
      throw new BadRequestException(
        `Payload timestamp ${timestamp} expired. Expiration time frame ${MAX_TIME_TO_DELIVER_MS} ms. Processing time ${processingTime}.`,
      );
  }

  /**
   * Sign payload using sha256 algorithm and hex encoding
   * @param data
   * @returns
   */
  signPayload(data: DeliveryPayload) {
    return hmac(JSON.stringify(data), this.secretToken);
  }
}
