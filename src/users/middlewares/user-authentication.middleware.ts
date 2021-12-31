/* --- Third-party libraries --- */
import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';

/* --- DTOs --- */
import { MessageResDto } from '../../shared/dtos/responses/message.res-dto';

/* --- Entities --- */
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserAuthenticationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _USERS_REPOSITORY: Repository<UserEntity>
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    if (
      !request.headers.authorization &&
      request.headers.authorization.split(' ').length !== 2 &&
      request.headers.authorization.split(' ')[0] != 'Bearer'
    )
      throw new UnauthorizedException(
        new MessageResDto(false, 'Invalid token')
      );

    const token = request.headers.authorization.split(' ')[1];
    const payload = verify(token, process.env.JWT_SECRET);

    if (!payload)
      throw new UnauthorizedException(
        new MessageResDto(false, 'Invalid token')
      );

    try {
      const user: UserEntity = await this._USERS_REPOSITORY.findOne({
        userId: (payload as any).userId
      });

      if (user) {
        (request as any).user = {
          userId: user.userId,
          firstName: user.firstName,
          email: user.email
        };
        next();
      } else
        throw new UnauthorizedException(
          new MessageResDto(false, 'Unkown user')
        );
    } catch (error) {
      throw new InternalServerErrorException(
        new MessageResDto(false, 'Internal server error')
      );
    }
  }
}
