/* --- Third-party libraries --- */
import { Controller, Post } from '@nestjs/common';

/* --- DTOs --- */
import { NewUserReqDto } from './dtos/requests/new-user.req-dto';
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Services --- */
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _USERS_SERVICE: UsersService) {}

  /**
   * Register a new user.
   *
   * @api `POST` /users/register
   * @param {NewUserReqDto} newUserReqDto New user data.
   * @returns Promise<UserEntity>
   */
  @Post('register')
  async register(newUserReqDto: NewUserReqDto): Promise<MessageResDto> {
    return await this._USERS_SERVICE.register(newUserReqDto);
  }
}
