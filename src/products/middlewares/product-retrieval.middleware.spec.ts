import { ProductRetrievalMiddleware } from './product-retrieval.middleware';

describe('ProductRetrievalMiddleware', () => {
  it('should be defined', () => {
    expect(new ProductRetrievalMiddleware()).toBeDefined();
  });
});
