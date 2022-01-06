/* --- Third-party libraries --- */
import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

/* --- DTOs --- */
import { MessageResDto } from '../../shared/dtos/responses/message.res-dto';

/* --- Entities --- */
import { UserEntity } from '../entities/user.entity';

/* --- Models --- */
import { CustomerModel } from '../models/customer.model';

/* --- Repositories --- */
import { UsersEntityRepository } from '../repositories/entity-repositories/users.entity-repository';

@Injectable()
export class UserAuthenticationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _USERS_REPOSITORY: UsersEntityRepository
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    if (
      !request.headers.authorization ||
      request.headers.authorization.split(' ').length !== 2 ||
      request.headers.authorization.split(' ')[0] != 'Bearer'
    )
      throw new UnauthorizedException(new MessageResDto(false, 'Invalid token'));

    const token = request.headers.authorization.split(' ')[1];
    const payload = decode(token);

    if (!payload) throw new UnauthorizedException(new MessageResDto(false, 'Invalid token'));

    if (Date.now() >= (payload as any).exp * 1000)
      throw new UnauthorizedException(new MessageResDto(false, 'Token expired'));

    try {
      const user: UserEntity = await this._USERS_REPOSITORY.findOne({
        userId: (payload as any).userId
      });

      if (user) {
        const customer: CustomerModel = new CustomerModel(
          user.firstName,
          user.lastName,
          user.email,
          user.phoneNumber,
          user.address1,
          user.locality,
          user.postalCode,
          user.administrativeArea,
          user.country
        );

        (request as any).customer = customer;
        (request as any).user = {
          userId: user.userId,
          firstName: user.firstName,
          email: user.email
        };
        next();
      } else throw new NotFoundException(new MessageResDto(false, 'Unkown user'));
    } catch (error) {
      throw new InternalServerErrorException(
        new MessageResDto(false, 'Internal server error')
      );
    }
  }
}
