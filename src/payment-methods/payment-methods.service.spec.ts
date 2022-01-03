/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

/* --- Entities --- */
import { PaymentMethodEntity } from './entities/payment-method.entity';

/* --- Mocks --- */
import { paymentMethodsEntityRepositoryMockFactory } from './mocks/payment-methods-entity-repository.mock-factory';

/* --- Services --- */
import { PaymentMethodsService } from './payment-methods.service';

describe('PaymentMethodsService', () => {
  let paymentMethodsEntityRepository: PaymentMethodEntity;
  let paymentMethodsService: PaymentMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentMethodsService,
        {
          provide: getRepositoryToken(PaymentMethodEntity),
          useFactory: paymentMethodsEntityRepositoryMockFactory
        }
      ]
    }).compile();

    paymentMethodsEntityRepository = module.get<PaymentMethodEntity>(
      getRepositoryToken(PaymentMethodEntity)
    );
    paymentMethodsService = module.get<PaymentMethodsService>(
      PaymentMethodsService
    );
  });

  it('paymentMethodsEntityRepository should be defined', () => {
    expect(paymentMethodsEntityRepository).toBeDefined();
  });

  it('paymentMethodsService should be defined', () => {
    expect(paymentMethodsService).toBeDefined();
  });

  it('#getPaymentMethodByUserId should return a payment method', async () => {
    const paymentMethod = await paymentMethodsService.getPaymentMethodByUserId(
      'c947bac5-da2b-4654-ab31-9b166c58a88d'
    );
    expect(paymentMethod).toBeDefined();
  });
});
