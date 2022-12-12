/* --- Third-party libraries --- */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* --- DTOs --- */
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Entities --- */
import { PaymentMethodEntity } from '../payment-methods/entities/payment-method.entity';
import { ProductEntity } from './entities/product.entity';

/* --- Models --- */
import { AmountDetailsModel } from '../orders/models/amount-details.model';
import { OrderInformationModel } from '../orders/models/order-information.model';
import { PaymentInformationModel } from '../orders/models/payment-information.model';
import { CustomerModel } from '../users/models/customer.model';

/* --- Services --- */
import { CybersourceService } from '../cybersource/cybersource.service';
import { PaymentMethodsService } from '../payment-methods/payment-methods.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly _CYBERSOURCE_SERVICE: CybersourceService,
    private readonly _PAYMENT_METHODS_SERVICE: PaymentMethodsService,
    @InjectRepository(ProductEntity)
    private readonly _PRODUCTS_REPOSITORY: Repository<ProductEntity>
  ) {}

  async buyProduct(
    customer: CustomerModel,
    paymentMethod: PaymentMethodEntity,
    product: ProductEntity
  ): Promise<MessageResDto> {
    console.log(paymentMethod);
    const amountDetails = new AmountDetailsModel('USD', product.price.toString());
    const orderInformation = new OrderInformationModel(amountDetails, customer);
    const paymentInformation = new PaymentInformationModel({
      expirationMonth: paymentMethod.expirationMonth,
      expirationYear: paymentMethod.expirationYear,
      number: paymentMethod.cardNumber,
      securityCode: paymentMethod.securityCode,
      type: paymentMethod.type
    });

    this._CYBERSOURCE_SERVICE.makeAuthorizationTransaction(
      orderInformation,
      paymentInformation,
      true
    );

    return new MessageResDto(true, 'Product purchased successfully');
  }

  async getProducts(): Promise<MessageResDto> {
    const products = await this._PRODUCTS_REPOSITORY.find();
    return new MessageResDto(true, 'Products retrieved successfully', products);
  }
}
