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
 * Event data
 */
export type EventData = Ping;

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
