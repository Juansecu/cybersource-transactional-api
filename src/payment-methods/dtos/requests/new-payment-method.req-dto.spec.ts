import { NewPaymentMethodReqDto } from './new-payment-method.req-dto';

describe('NewPaymentMethodReqDto', () => {
  let newPaymentMethodReqDto: NewPaymentMethodReqDto;

  beforeEach(() => {
    newPaymentMethodReqDto = new NewPaymentMethodReqDto();
    newPaymentMethodReqDto.cardHolder = 'John Doe';
    newPaymentMethodReqDto.cardNumber = '1234567890123456';
    newPaymentMethodReqDto.securityCode = '123';
    newPaymentMethodReqDto.expirationMonth = '12';
    newPaymentMethodReqDto.expirationYear = '2020';
  });

  it('newPaymentMethodReqDto should be defined', () => {
    expect(newPaymentMethodReqDto).toBeDefined();
  });

  it('#cardHolder should be defined', () => {
    expect(newPaymentMethodReqDto.cardHolder).toBeDefined();
  });

  it('#cardHolder length should be greater than or equal to 5', () => {
    expect(newPaymentMethodReqDto.cardHolder.length).toBeGreaterThanOrEqual(5);
  });

  it('#cardHolder length should be less than or equal to 50', () => {
    expect(newPaymentMethodReqDto.cardHolder.length).toBeLessThanOrEqual(50);
  });

  it('#cardNumber should be defined', () => {
    expect(newPaymentMethodReqDto.cardNumber).toBeDefined();
  });

  it('#cardNumber length should be equal to 16', () => {
    expect(newPaymentMethodReqDto.cardNumber.length).toBe(16);
  });

  it('#cardNumber should be a number', () => {
    expect(Number.isInteger(Number(newPaymentMethodReqDto.cardNumber))).toBe(
      true
    );
  });

  it('#securityCode should be defined', () => {
    expect(newPaymentMethodReqDto.securityCode).toBeDefined();
  });

  it('#securityCode length should be equal to 3', () => {
    expect(newPaymentMethodReqDto.securityCode.length).toBe(3);
  });

  it('#securityCode should be a number', () => {
    expect(Number.isInteger(Number(newPaymentMethodReqDto.securityCode))).toBe(
      true
    );
  });

  it('#expirationMonth should be defined', () => {
    expect(newPaymentMethodReqDto.expirationMonth).toBeDefined();
  });

  it('#expirationMonth length should be equal to 2', () => {
    expect(newPaymentMethodReqDto.expirationMonth.length).toBe(2);
  });

  it('#expirationMonth should be a number', () => {
    expect(
      Number.isInteger(Number(newPaymentMethodReqDto.expirationMonth))
    ).toBe(true);
  });

  it('#expirationYear should be defined', () => {
    expect(newPaymentMethodReqDto.expirationYear).toBeDefined();
  });

  it('#expirationYear length should be equal to 4', () => {
    expect(newPaymentMethodReqDto.expirationYear.length).toBe(4);
  });

  it('#expirationYear should be a number', () => {
    expect(
      Number.isInteger(Number(newPaymentMethodReqDto.expirationYear))
    ).toBe(true);
  });
});
