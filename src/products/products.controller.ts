/* --- Third-party libraries --- */
import { Controller, Get } from '@nestjs/common';

/* --- DTOs --- */
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Services --- */
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly _PRODUCTS_SERVICE: ProductsService) {}

  @Get()
  async getProducts(): Promise<MessageResDto> {
    return this._PRODUCTS_SERVICE.getProducts();
  }
}
