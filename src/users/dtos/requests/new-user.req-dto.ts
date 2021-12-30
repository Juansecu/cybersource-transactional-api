import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class NewUserReqDto {
  @MaxLength(15)
  firstName: string;
  @MaxLength(15)
  lastName: string;
  @IsEmail()
  @MaxLength(32)
  email: string;
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
