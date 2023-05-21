import { DeliveryPayload } from '../../src/types';

export const deliveryPayloadMock: DeliveryPayload = {
  subscriptionId: '64665df7bbb651628defabab',
  timestamp: 1684493582702,
  eventType: 'ExtractedPriceChanged',
  eventData: [
    {
      sku: 'B0000AAAAA',
      competitorName: 'Amazon',
      productId: '02581500aff3f957b1d57658',
      productTitle: 'Black & Decker Pivot',
      matchType: 'Exact',
      price: 18.97,
      shippingPrice: null,
      currency: 'USD',
      availability: true,
      crawlDate: '2023-05-16T05:07:13.000000Z',
      previous: {
        price: 44.82,
        shippingPrice: null,
        crawlDate: '2023-04-16T14:12:08.000000Z',
      },
    },
    {
      sku: '00945911',
      competitorName: 'Target',
      productId: '6464c594034336f9acae04bb',
      productTitle: 'Black & Decker Pivot',
      matchType: 'Exact',
      price: 37.27,
      shippingPrice: 0,
      currency: 'USD',
      availability: null,
      crawlDate: '2023-05-17T12:16:20.035000Z',
    },
  ],
};
