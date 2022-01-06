/* --- Third-party libraries --- */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* --- Entities --- */
import { ProductEntity } from './entities/product.entity';

/* --- Controllers --- */
import { ProductsController } from './products.controller';

/* --- Services --- */
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
