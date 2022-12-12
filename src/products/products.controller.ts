/* --- Third-party libraries --- */
import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';

/* --- DTOs --- */
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Services --- */
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly _PRODUCTS_SERVICE: ProductsService) {}

  @Post('buy/:productId')
  async buyProduct(@Req() request: Request): Promise<MessageResDto> {
    return await this._PRODUCTS_SERVICE.buyProduct(
      (request as any).customer,
      (request as any).paymentMethod,
      (request as any).product
    );
  }

  @Get()
  async getProducts(): Promise<MessageResDto> {
    return this._PRODUCTS_SERVICE.getProducts();
  }
}
