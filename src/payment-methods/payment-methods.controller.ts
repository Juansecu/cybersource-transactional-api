/* --- Third-party libraries --- */
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

/* --- DTOs --- */
import { NewPaymentMethodReqDto } from './dtos/requests/new-payment-method.req-dto';
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Services --- */
import { PaymentMethodsService } from './payment-methods.service';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(
    private readonly _PAYMENT_METHODS_SERVICE: PaymentMethodsService
  ) {}

  /**
   * Add a payment method to a user.
   *
   * @param newPaymentMethodReqDto Payment method to add
   * @param request Request object
   * @returns `Promise<MessageResDto>`
   */
  @Post('add-payment-method')
  async addPaymentMethod(
    @Body() newPaymentMethodReqDto: NewPaymentMethodReqDto,
    @Req() request: Request
  ): Promise<MessageResDto> {
    return await this._PAYMENT_METHODS_SERVICE.addPaymentMethod(
      newPaymentMethodReqDto,
      (request as any).user.userId
    );
  }

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
