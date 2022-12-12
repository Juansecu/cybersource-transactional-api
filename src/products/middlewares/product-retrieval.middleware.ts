/* --- Third-party libraries --- */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/* --- DTOs --- */
import { MessageResDto } from 'src/shared/dtos/responses/message.res-dto';

/* --- Entities --- */
import { ProductEntity } from '../entities/product.entity';

/* --- Repositories --- */
import { ProductsEntityRepository } from '../repositories/entity-repositories/products.entity-repository';

@Injectable()
export class ProductRetrievalMiddleware implements NestMiddleware {
  constructor(private readonly _PRODUCTS_ENTITY_REPOSITORY: ProductsEntityRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    let product: ProductEntity;

    try {
      product = await this._PRODUCTS_ENTITY_REPOSITORY.findOne(request.params.productId);
    } catch (error) {
      return response.status(500).json(new MessageResDto(false, 'Internal server error'));
    }

    if (!product)
      return response.status(404).json(new MessageResDto(false, 'Product not found'));

    (request as any).product = product;
    next();
  }
}
