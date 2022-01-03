/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { request } from 'express';

/* --- DTOs --- */
import { NewPaymentMethodReqDto } from './dtos/requests/new-payment-method.req-dto';

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

    (request as any).user = {
      userId: 'c947bac5-da2b-4654-ab31-9b166c58a88d',
      firstName: 'John',
      email: 'john.doe@gmail.com'
    };

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

  it('#addPaymentMethod should add a payment method to a user', async () => {
    const newPaymentMethodReqDto: NewPaymentMethodReqDto = {
      cardHolder: 'John Doe',
      cardNumber: '1234567890123456',
      securityCode: '123',
      expirationMonth: '12',
      expirationYear: '2030'
    };
    const addPaymentMethodSpy = jest.spyOn(
      paymentMethodsService,
      'addPaymentMethod'
    );
    const addPaymentMethodResponse =
      await paymentMethodsController.addPaymentMethod(
        newPaymentMethodReqDto,
        request as any
      );

    expect(addPaymentMethodSpy).toBeCalledWith(
      newPaymentMethodReqDto,
      (request as any).user.userId
    );
    expect(addPaymentMethodResponse).toBeDefined();
    expect(addPaymentMethodResponse.success).toBeTruthy();
    expect(addPaymentMethodResponse.message).toMatch(
      /^Payment method [0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12} added successfully/
    );
  });

  it('#getPaymentMethod should return a payment method', async () => {
    const paymentMethod = await paymentMethodsController.getPaymentMethod(
      request
    );

    expect(paymentMethod).toBeDefined();
  });
});
