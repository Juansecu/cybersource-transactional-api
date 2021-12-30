/* --- Third-party libraries --- */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

/* --- DTOs --- */
import { NewUserReqDto } from './dtos/requests/new-user.req-dto';
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Entities --- */
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _USERS_REPOSITORY: Repository<UserEntity>
  ) {}

  /**
   * Register a new user.
   *
   * @api `POST` /users/register
   * @param {NewUserReqDto} newUserDto New user data
   * @returns Promise<MessageResDto>
   */
  async register(newUserReqDto: NewUserReqDto): Promise<MessageResDto> {
    try {
      const hashedPassword: string = await hash(newUserReqDto.password, 10);
      const newUser: UserEntity = this._USERS_REPOSITORY.create({
        email: newUserReqDto.email,
        firstName: newUserReqDto.firstName,
        lastName: newUserReqDto.lastName,
        password: hashedPassword
      });

      await this._USERS_REPOSITORY.save(newUser);

      return new MessageResDto(true, 'User created successfully');
    } catch (error) {
      throw new InternalServerErrorException(
        new MessageResDto(false, 'Internal server error')
      );
    }
  }
}
