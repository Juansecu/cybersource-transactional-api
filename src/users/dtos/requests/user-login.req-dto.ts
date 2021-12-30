import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UserLoginReqDto {
  @IsEmail()
  @MaxLength(32)
  email: string;
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
