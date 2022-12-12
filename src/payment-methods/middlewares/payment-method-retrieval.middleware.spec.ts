import { PaymentMethodRetrievalMiddleware } from './payment-method-retrieval.middleware';

describe('PaymentMethodRetrievalMiddleware', () => {
  it('should be defined', () => {
    expect(new PaymentMethodRetrievalMiddleware()).toBeDefined();
  });
});
