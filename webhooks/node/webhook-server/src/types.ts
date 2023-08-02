/**
 * ISO 8601 date format
 * For example: 2023-10-05T14:48:00.000Z
 */
export type IsoDate = string;

/**
 * Ping event
 */
export interface Ping {
  /**
   * Random ping Id
   */
  zenId: string;

  /**
   * The date when event was generated
   */
  zenDate: IsoDate;
}

/**
 * Webhook delivery payload
 */
export type DeliveryPayload = {
  /**
   * Webhook subscription ID
   */
  subscriptionId: string;
  /**
   * Epoch timestamp when delivery was made.
   * The timestamp can be used to prevent replay attacks on the client.
   */
  timestamp: number;
  /**
   * Event type
   */
  eventType: string;
  /**
   * Event data
   */
  eventData: Ping[];
};

/**
 * Webhook Event to process
 */
export type EventData = {
  /**
   * Payload signature (HMAC hex digest of the request body, generated using the SHA-256 hash)
   */
  signature: string;
  /**
   * Event DeliveryPayload
   */
  payload: DeliveryPayload;
};
