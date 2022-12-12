/* --- Third-party libraries --- */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* --- Entities --- */
import { PaymentMethodEntity } from './entities/payment-method.entity';

/* --- Repository factories --- */
import { usersEntityRepositoryFactory } from 'src/users/repositories/entity-repositories/users.entity-repository';

/* --- Controllers --- */
import { PaymentMethodsController } from './payment-methods.controller';

/* --- Services --- */
import { PaymentMethodsService } from './payment-methods.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethodEntity])],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService, usersEntityRepositoryFactory],
  exports: [PaymentMethodsService, usersEntityRepositoryFactory]
})
export class PaymentMethodsModule {}
