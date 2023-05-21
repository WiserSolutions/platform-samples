export type NullableString = string | null;
export type Price = number;
export type NullablePrice = number | null;
/**
 * ISO 4217 currency code
 * For example: USD, EUR, CAD
 */
export type IsoCurrencyCode = string;
export type NullableBoolean = boolean | null;
/**
 * ISO 8601 date format
 * For example: 2023-10-05T14:48:00.000Z
 */
export type IsoDate = string;

/**
 * ExtractedPriceChanged event
 */
export interface ExtractedPriceChanged {
  /**
   * Product SKU
   */
  sku: string;
  /**
   * Seller name
   */
  competitorName: string;
  /**
   * Internal product ID
   */
  productId: string;
  /**
   * Product title
   */
  productTitle?: NullableString;
  /**
   * Match type
   */
  matchType: string;
  /**
   * Product price
   */
  price: Price;
  /**
   * Product shipping price
   */
  shippingPrice?: NullablePrice;
  /**
   * Product currency in ISO format
   */
  currency?: IsoCurrencyCode;
  /**
   * Product availability
   */
  availability: NullableBoolean;
  /**
   * Product crawl date in ISO format
   */
  crawlDate: IsoDate;
  /**
   * Previous extraction data
   */
  previous?: {
    /**
     * Previous product price
     */
    price: Price;
    /**
     * Previous product crawl date
     */
    crawlDate: IsoDate;
    /**
     * Previous product shipping price
     */
    shippingPrice?: NullablePrice;
  };
}

/**
 * Event data
 */
export type EventData = ExtractedPriceChanged;

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
  eventData: EventData[];
};
