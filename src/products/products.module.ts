/* --- Third-party libraries --- */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* --- Entities --- */
import { ProductEntity } from './entities/product.entity';

/* --- Repositories --- */
import { ProductsEntityRepository } from './repositories/entity-repositories/products.entity-repository';

/* --- Modules --- */
import { CybersourceModule } from '../cybersource/cybersource.module';
import { PaymentMethodsModule } from '../payment-methods/payment-methods.module';

/* --- Controllers --- */
import { ProductsController } from './products.controller';

/* --- Services --- */
import { ProductsService } from './products.service';
import { ProductRetrievalMiddleware } from './middlewares/product-retrieval.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ProductsEntityRepository]),
    CybersourceModule,
    PaymentMethodsModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule]
})
export class ProductsModule {}
