/* --- Third-party libraries --- */
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

/* --- DTOs --- */
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Services --- */
import { PaymentMethodsService } from './payment-methods.service';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(
    private readonly _PAYMENT_METHODS_SERVICE: PaymentMethodsService
  ) {}

  /**
   * Get user's payment method.
   *
   * @api `GET` /payment-methods
   * @param request Request object
   * @returns `Promise<MessageResDto>`
   */
  @Get()
  async getPaymentMethod(@Req() request: Request): Promise<MessageResDto> {
    return await this._PAYMENT_METHODS_SERVICE.getPaymentMethodByUserId(
      (request as any).user.userId
    );
  }
}
