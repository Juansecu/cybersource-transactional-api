/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

/* --- DTOs --- */
import { NewPaymentMethodReqDto } from './dtos/requests/new-payment-method.req-dto';

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

  it('#addPaymentMethod should add a payment method to a user', async () => {
    const newPaymentMethodReqDto: NewPaymentMethodReqDto = {
      cardHolder: 'John Doe',
      cardNumber: '1234567890123456',
      securityCode: '123',
      expirationMonth: '12',
      expirationYear: '2030'
    };
    const paymentMethod = await paymentMethodsService.addPaymentMethod(
      newPaymentMethodReqDto,
      'c947bac5-da2b-4654-ab31-9b166c58a88d'
    );

    expect(paymentMethod).toBeDefined();
  });

  it('#getPaymentMethodByUserId should return a payment method', async () => {
    const paymentMethod = await paymentMethodsService.getPaymentMethodByUserId(
      'c947bac5-da2b-4654-ab31-9b166c58a88d'
    );
    expect(paymentMethod).toBeDefined();
  });
});
