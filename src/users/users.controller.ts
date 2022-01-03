/* --- Third-party libraries --- */
import { Body, Controller, Post } from '@nestjs/common';

/* --- DTOs --- */
import { NewUserReqDto } from './dtos/requests/new-user.req-dto';
import { UserLoginReqDto } from './dtos/requests/user-login.req-dto';
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Services --- */
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _USERS_SERVICE: UsersService) {}

  /**
   * Authenticate a user.
   *
   * @api `POST` /users/login
   * @param {UserLoginReqDto} userLoginReqDto New user data
   * @returns `Promise<MessageResDto>`
   */
  @Post('login')
  async login(
    @Body() userLoginReqDto: UserLoginReqDto
  ): Promise<MessageResDto> {
    return await this._USERS_SERVICE.login(userLoginReqDto);
  }

  /**
   * Register a new user.
   *
   * @api `POST` /users/register
   * @param {NewUserReqDto} newUserReqDto New user data.
   * @returns `Promise<UserEntity>`
   */
  @Post('register')
  async register(@Body() newUserReqDto: NewUserReqDto): Promise<MessageResDto> {
    return await this._USERS_SERVICE.register(newUserReqDto);
  }
}
