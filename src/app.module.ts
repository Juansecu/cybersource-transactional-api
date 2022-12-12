/* --- Third-party libraries --- */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/* --- Modules --- */
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

/* --- Controllers --- */
import { AppController } from './app.controller';

/* --- Middlewares --- */
import { UserAuthenticationMiddleware } from './users/middlewares/user-authentication.middleware';

/* --- Services --- */
import { AppService } from './app.service';
import { ProductRetrievalMiddleware } from './products/middlewares/product-retrieval.middleware';
import { PaymentMethodRetrievalMiddleware } from './payment-methods/middlewares/payment-method-retrieval.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/entities/*.entity.{ts,js}'],
      migrations: [__dirname + '/**/migrations/*.migration.{ts,js}'],
      migrationsRun: true,
      synchronize: true,
      type: 'sqlite'
    }),
    PaymentMethodsModule,
    ProductsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(UserAuthenticationMiddleware)
      .forRoutes('payment-methods')
      .apply(
        ProductRetrievalMiddleware,
        UserAuthenticationMiddleware,
        PaymentMethodRetrievalMiddleware
      )
      .forRoutes('products/buy/:productId');
  }
}
