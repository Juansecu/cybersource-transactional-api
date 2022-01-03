import { Matches, MaxLength, MinLength } from 'class-validator';

export class NewPaymentMethodReqDto {
  @MaxLength(50)
  @MinLength(5)
  cardHolder: string;
  @Matches(/^[0-9]{16}$/)
  cardNumber: string;
  @Matches(/^[0-9]{3}$/)
  securityCode: string;
  @Matches(/^[0-9]{2}$/)
  expirationMonth: string;
  @Matches(/^[0-9]{4}$/)
  expirationYear: string;
}
