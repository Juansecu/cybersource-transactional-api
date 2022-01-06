/* --- Third-party libraries --- */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* --- DTOs --- */
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Entities --- */
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly _PRODUCTS_REPOSITORY: Repository<ProductEntity>
  ) {}

  async getProducts(): Promise<MessageResDto> {
    const products = await this._PRODUCTS_REPOSITORY.find();
    return new MessageResDto(true, 'Products retrieved successfully', products);
  }
}
