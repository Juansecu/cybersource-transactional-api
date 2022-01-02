/* --- Third-party libraries --- */
import { IsEmail, Length, MaxLength, MinLength } from 'class-validator';

export class NewUserReqDto {
  @MaxLength(15)
  firstName: string;
  @MaxLength(15)
  lastName: string;
  @IsEmail()
  @MaxLength(32)
  email: string;
  @Length(2)
  country: string;
  @Length(2)
  administrativeArea: string;
  @MaxLength(30)
  locality: string;
  @MaxLength(30)
  address1: string;
  @MaxLength(7)
  postalCode: string;
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
