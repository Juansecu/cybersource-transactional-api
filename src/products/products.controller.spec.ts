/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';

/* --- Controllers --- */
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let productsController: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController]
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
  });

  it('productsController should be defined', () => {
    expect(productsController).toBeDefined();
  });
});
