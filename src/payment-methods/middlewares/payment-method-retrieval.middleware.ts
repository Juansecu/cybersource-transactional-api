/* --- Engine modules --- */
import { createDecipheriv, createHash, Decipher, Hash, randomBytes } from 'crypto';

/* --- Third-party libraries --- */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/* --- DTOs --- */
import { MessageResDto } from 'src/shared/dtos/responses/message.res-dto';

/* --- Services --- */
import { PaymentMethodsService } from '../payment-methods.service';

@Injectable()
export class PaymentMethodRetrievalMiddleware implements NestMiddleware {
  constructor(private readonly _PAYMENT_METHODS_SERVICE: PaymentMethodsService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const paymentMethod: MessageResDto =
      await this._PAYMENT_METHODS_SERVICE.getPaymentMethodByUserId(
        (request as any).user.userId
      );

    if (paymentMethod.data) {
      const cardHolderHash: Hash = createHash('sha256');
      const cardNumberHash: Hash = createHash('sha256');
      const expirationMonthHash: Hash = createHash('sha256');
      const expirationYearHash: Hash = createHash('sha256');
      const securityCodeHash: Hash = createHash('sha256');
      const cardHolderEncrypted: Buffer = Buffer.from(paymentMethod.data.cardHolder, 'base64');
      const cardNumberEncrypted: Buffer = Buffer.from(paymentMethod.data.cardNumber, 'base64');
      const expirationMonthEncrypted: Buffer = Buffer.from(
        paymentMethod.data.expirationMonth,
        'base64'
      );
      const expirationYearEncrypted: Buffer = Buffer.from(
        paymentMethod.data.expirationYear,
        'base64'
      );
      const securityCodeEncrypted: Buffer = Buffer.from(
        paymentMethod.data.securityCode,
        'base64'
      );
      const cardHolderIv: Buffer = cardHolderEncrypted.slice(0, 16);
      const cardNumberIv: Buffer = cardNumberEncrypted.slice(0, 16);
      const expirationMonthIv: Buffer = expirationMonthEncrypted.slice(0, 16);
      const expirationYearIv: Buffer = expirationYearEncrypted.slice(0, 16);
      const securityCodeIv: Buffer = securityCodeEncrypted.slice(0, 16);
      const cardHolderDecipher: Decipher = createDecipheriv(
        'aes-256-ctr',
        cardHolderHash.update(process.env.CRYPTO_SECRET_KEY).digest(),
        randomBytes(16)
      );
      const cardNumberDecipher: Decipher = createDecipheriv(
        'aes-256-ctr',
        cardNumberHash.update(process.env.CRYPTO_SECRET_KEY).digest(),
        randomBytes(16)
      );
      const expirationMonthDecipher: Decipher = createDecipheriv(
        'aes-256-ctr',
        expirationMonthHash.update(process.env.CRYPTO_SECRET_KEY).digest(),
        randomBytes(16)
      );
      const expirationYearDecipher: Decipher = createDecipheriv(
        'aes-256-ctr',
        expirationYearHash.update(process.env.CRYPTO_SECRET_KEY).digest(),
        randomBytes(16)
      );
      const securityCodeDecipher: Decipher = createDecipheriv(
        'aes-256-ctr',
        securityCodeHash.update(process.env.CRYPTO_SECRET_KEY).digest(),
        randomBytes(16)
      );
      const cardHolder: Buffer = Buffer.concat([
        cardHolderDecipher.update(cardHolderEncrypted.slice(16)),
        cardHolderDecipher.final()
      ]);
      const cardNumber: Buffer = Buffer.concat([
        cardNumberDecipher.update(cardNumberEncrypted.slice(16)),
        cardNumberDecipher.final()
      ]);
      const expirationMonth: Buffer = Buffer.concat([
        expirationMonthDecipher.update(expirationMonthEncrypted.slice(16)),
        expirationMonthDecipher.final()
      ]);
      const expirationYear: Buffer = Buffer.concat([
        expirationYearDecipher.update(expirationYearEncrypted.slice(16)),
        expirationYearDecipher.final()
      ]);
      const securityCode: Buffer = Buffer.concat([
        securityCodeDecipher.update(securityCodeEncrypted.slice(16)),
        securityCodeDecipher.final()
      ]);

      (request as any).paymentMethod = {
        paymentMethodId: paymentMethod.data.paymentMethodId,
        cardHolder: cardHolder.toString(),
        cardNumber: cardNumber.toString(),
        expirationMonth: expirationMonth.toString(),
        expirationYear: expirationYear.toString(),
        securityCode: securityCode.toString(),
        type: paymentMethod.data.type
      };
      next();
    } else
      return response.status(404).json(new MessageResDto(false, 'Payment method not found'));
  }
}
