/* --- Third-party libraries --- */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/* --- Modules --- */
import { UsersModule } from './users/users.module';

/* --- Middlewares --- */
import { UserAuthenticationMiddleware } from './users/middlewares/user-authentication.middleware';

/* --- Controllers --- */
import { AppController } from './app.controller';

/* --- Services --- */
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/entities/*.entity.{ts,js}'],
      migrations: [__dirname + '/**/migrations/*.{ts,js}'],
      migrationsRun: true,
      synchronize: true,
      type: 'sqlite'
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(UserAuthenticationMiddleware).forRoutes('payment-methods');
  }
}
