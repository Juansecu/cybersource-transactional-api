/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { request } from 'express';

/* --- Entities --- */
import { PaymentMethodEntity } from './entities/payment-method.entity';

/* --- Mocks --- */
import { paymentMethodsEntityRepositoryMockFactory } from './mocks/payment-methods-entity-repository.mock-factory';

/* --- Controllers --- */
import { PaymentMethodsController } from './payment-methods.controller';

/* --- Services --- */
import { PaymentMethodsService } from './payment-methods.service';

describe('PaymentMethodsController', () => {
  let paymentMethodsController: PaymentMethodsController;
  let paymentMethodsService: PaymentMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMethodsController],
      providers: [
        PaymentMethodsService,
        {
          provide: getRepositoryToken(PaymentMethodEntity),
          useFactory: paymentMethodsEntityRepositoryMockFactory
        }
      ]
    }).compile();

    paymentMethodsController = module.get<PaymentMethodsController>(
      PaymentMethodsController
    );
    paymentMethodsService = module.get<PaymentMethodsService>(
      PaymentMethodsService
    );
  });

  it('paymentMethodsController should be defined', () => {
    expect(paymentMethodsController).toBeDefined();
  });

  it('paymentMethodsService should be defined', () => {
    expect(paymentMethodsService).toBeDefined();
  });

  it('#getPaymentMethod should return a payment method', async () => {
    (request as any).user = {
      userId: 'c947bac5-da2b-4654-ab31-9b166c58a88d',
      firstName: 'John',
      email: 'john.doe@gmail.com'
    };

    const paymentMethod = await paymentMethodsController.getPaymentMethod(
      request
    );

    expect(paymentMethod).toBeDefined();
  });
});
