/* --- Third-party libraries --- */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

/* --- DTOs --- */
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Entities --- */
import { PaymentMethodEntity } from './entities/payment-method.entity';

/* --- Repositories --- */
import { PaymentMethodsEntityRepository } from './repositories/entity-repositories/payment-methods.entity-repository';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethodEntity)
    private readonly paymentMethodsRepository: PaymentMethodsEntityRepository
  ) {}

  /**
   * Get user's payment method by user's ID.
   *
   * @param userId User's id
   * @returns `Promise<MessageResDto>`
   */
  async getPaymentMethodByUserId(userId: string): Promise<MessageResDto> {
    let paymentMethod: PaymentMethodEntity;

    try {
      paymentMethod = await this.paymentMethodsRepository.findOne({
        where: { userId }
      });
    } catch (error) {
      throw new InternalServerErrorException(
        new MessageResDto(false, 'Internal server error')
      );
    }

    if (paymentMethod)
      return new MessageResDto(true, 'User payment method', paymentMethod);

    throw new NotFoundException(
      new MessageResDto(false, 'No payment method found')
    );
  }
}
