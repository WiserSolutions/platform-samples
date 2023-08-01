import { DeliveryPayload } from '../../src/types';

export const deliveryPayloadMock: DeliveryPayload = {
  subscriptionId: '64665df7bbb651628defabab',
  timestamp: Date.now(),
  eventType: 'Ping',
  eventData: [
    {
      zenId: 'f9b327e70bbcf42494ccb28b2d98e00e',
      zenDate: '2023-05-16T05:07:13.000000Z',
    },
  ],
};
