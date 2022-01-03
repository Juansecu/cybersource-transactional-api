/* --- Entities --- */
import { PaymentMethodEntity } from '../entities/payment-method.entity';

export const paymentMethodsEntityRepositoryMockFactory: jest.Mock = jest.fn(
  () => ({
    create: jest.fn(
      (paymentMethodEntity: PaymentMethodEntity) => paymentMethodEntity
    ),
    findOne: jest.fn(
      (paymentMethodEntity: PaymentMethodEntity) => paymentMethodEntity
    ),
    save: jest.fn(
      (paymentMethodEntity: PaymentMethodEntity) => paymentMethodEntity
    )
  })
);
