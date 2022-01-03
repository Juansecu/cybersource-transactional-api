/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';

/* --- Repositories --- */
import { PaymentMethodsEntityRepository } from './payment-methods.entity-repository';

describe('PaymentMethodsEntityRepository', () => {
  let paymentMethodsEntityRepository: PaymentMethodsEntityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMethodsEntityRepository]
    }).compile();

    paymentMethodsEntityRepository = module.get<PaymentMethodsEntityRepository>(
      PaymentMethodsEntityRepository
    );
  });

  it('paymentMethodsEntityRepository should be defined', () => {
    expect(paymentMethodsEntityRepository).toBeDefined();
  });
});
