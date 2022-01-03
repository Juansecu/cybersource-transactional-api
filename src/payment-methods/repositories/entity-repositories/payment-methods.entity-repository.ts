/* --- Third-party libraries --- */
import { Connection, EntityRepository, Repository } from 'typeorm';

/* --- Entities --- */
import { PaymentMethodEntity } from '../../entities/payment-method.entity';

@EntityRepository(PaymentMethodEntity)
export class PaymentMethodsEntityRepository extends Repository<PaymentMethodEntity> {}

export const paymentMethodsEntityRepositoryFactory = {
  inject: [Connection],
  provide: 'PaymentMethodEntityRepository',
  useFactory: (connection: Connection) =>
    connection.getRepository(PaymentMethodEntity)
};
