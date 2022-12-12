/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';

/* --- Repositories --- */
import { ProductsEntityRepository } from './products.entity-repository';

describe('EntityRepositories', () => {
  let productsEntityRepository: ProductsEntityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsEntityRepository]
    }).compile();

    productsEntityRepository = module.get<ProductsEntityRepository>(ProductsEntityRepository);
  });

  it('productsEntityRepository should be defined', () => {
    expect(productsEntityRepository).toBeDefined();
  });
});
