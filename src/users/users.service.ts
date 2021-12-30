/* --- Third-party libraries --- */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';

/* --- DTOs --- */
import { NewUserReqDto } from './dtos/requests/new-user.req-dto';
import { UserLoginReqDto } from './dtos/requests/user-login.req-dto';
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
   * Authenticate a user.
   *
   * @api `POST` /users/login
   * @param {UserLoginReqDto} userLoginReqDto New user data
   * @returns `Promise<MessageResDto>`
   * @throws `ConflictException`
   * @throws `InternalServerErrorException`
   * @throws `NotFoundException`
   */
  async login(userLoginReqDto: UserLoginReqDto): Promise<MessageResDto> {
    try {
      const user: UserEntity = await this._USERS_REPOSITORY.findOne({
        email: userLoginReqDto.email
      });

      if (user) {
        const isPasswordValid: boolean = await this.validatePassword(
          userLoginReqDto.password,
          user.password
        );

        if (isPasswordValid)
          return new MessageResDto(true, 'User logged in successfully', {
            token: sign(
              {
                userId: user.userId
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '1h'
              }
            )
          });

        throw new ConflictException(
          new MessageResDto(false, 'Invalid password')
        );
      }

      throw new NotFoundException(new MessageResDto(false, 'User not found'));
    } catch (error) {
      throw new InternalServerErrorException(
        new MessageResDto(false, 'Internal server error')
      );
    }
  }

  /**
   * Register a new user.
   *
   * @api `POST` /users/register
   * @param {NewUserReqDto} newUserDto New user data
   * @returns `Promise<MessageResDto>`
   * @throws `InternalServerErrorException`
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

  /**
   * Validate a user's password.
   *
   * @param {string} password User's password
   * @param {string} hashedPassword User's hashed password
   * @returns `Promise<boolean>`
   * @throws `InternalServerErrorException`
   */
  async validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await compare(password, hashedPassword);
    } catch (error) {
      throw new InternalServerErrorException(
        new MessageResDto(false, 'Internal server error')
      );
    }
  }
}
