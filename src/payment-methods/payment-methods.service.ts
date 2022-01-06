/* --- Engine modules --- */
import { Cipher, createCipheriv, createHash, Hash, randomBytes } from 'crypto';

/* --- Third-party libraries --- */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

/* --- Enums --- */
import { ECardType } from './enums/card-type.enum';

/* --- DTOs --- */
import { NewPaymentMethodReqDto } from './dtos/requests/new-payment-method.req-dto';
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Entities --- */
import { PaymentMethodEntity } from './entities/payment-method.entity';

/* --- Repositories --- */
import { PaymentMethodsEntityRepository } from './repositories/entity-repositories/payment-methods.entity-repository';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethodEntity)
    private readonly _PAYMENT_METHODS_REPOSITORY: PaymentMethodsEntityRepository
  ) {}

  /**
   * Add a payment method to a user.
   *
   * @param newPaymentMethodReqDto Payment method to add
   * @param userId User's id
   * @returns `Promise<MessageResDto>`
   * @throws `ConflictException`
   * @throws `InternalServerErrorException`
   */
  async addPaymentMethod(
    newPaymentMethodReqDto: NewPaymentMethodReqDto,
    userId: string
  ): Promise<MessageResDto> {
    try {
      let paymentMethod: PaymentMethodEntity;

      const currentPaymentMethod = await this._PAYMENT_METHODS_REPOSITORY.findOne({
        where: { userId }
      });

      if (currentPaymentMethod)
        throw new ConflictException(
          new MessageResDto(false, 'User already has a payment method')
        );

      const initVector: Buffer = randomBytes(16);
      const hash: Hash = createHash('sha256');
      const cipher: Cipher = createCipheriv(
        'aes-256-ctr',
        hash.update(process.env.CRYPTO_SECRET_KEY).digest(),
        initVector
      );
      const cardHolderCipher: Buffer = Buffer.concat([
        cipher.update(newPaymentMethodReqDto.cardHolder)
      ]);
      const cardNumberCipher: Buffer = Buffer.concat([
        cipher.update(newPaymentMethodReqDto.cardNumber)
      ]);
      const expirationMonthCipher: Buffer = Buffer.concat([
        cipher.update(newPaymentMethodReqDto.expirationMonth)
      ]);
      const expirationYearCipher: Buffer = Buffer.concat([
        cipher.update(newPaymentMethodReqDto.expirationYear)
      ]);
      const securityCodeCipher: Buffer = Buffer.concat([
        cipher.update(newPaymentMethodReqDto.securityCode),
        cipher.final()
      ]);
      const newPaymentMethod: PaymentMethodEntity = new PaymentMethodEntity();

      newPaymentMethod.cardHolder = cardHolderCipher.toString('base64');
      newPaymentMethod.cardNumber = cardNumberCipher.toString('base64');
      newPaymentMethod.securityCode = securityCodeCipher.toString('base64');
      newPaymentMethod.expirationMonth = expirationMonthCipher.toString('base64');
      newPaymentMethod.expirationYear = expirationYearCipher.toString('base64');
      newPaymentMethod.type = ECardType.VISA;
      newPaymentMethod.userId = userId;

      paymentMethod = await this._PAYMENT_METHODS_REPOSITORY.save({
        ...newPaymentMethod
      });

      return new MessageResDto(
        true,
        `Payment method ${paymentMethod.paymentMethodId} added successfully`
      );
    } catch (error) {
      throw new InternalServerErrorException(
        new MessageResDto(false, 'Internal server error')
      );
    }
  }

  /**
   * Get user's payment method by user's ID.
   *
   * @param userId User's id
   * @returns `Promise<MessageResDto>`
   * @throws `InternalServerErrorException`
   * @throws `NotFoundException`
   */
  async getPaymentMethodByUserId(userId: string): Promise<MessageResDto> {
    let paymentMethod: PaymentMethodEntity;

    try {
      paymentMethod = await this._PAYMENT_METHODS_REPOSITORY.findOne({
        where: { userId }
      });
    } catch (error) {
      throw new InternalServerErrorException(
        new MessageResDto(false, 'Internal server error')
      );
    }

    if (paymentMethod) return new MessageResDto(true, 'User payment method', paymentMethod);

    throw new NotFoundException(new MessageResDto(false, 'No payment method found'));
  }
}
