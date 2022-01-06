/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';

/* --- Services --- */
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService]
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  it('productsService should be defined', () => {
    expect(productsService).toBeDefined();
  });
});
