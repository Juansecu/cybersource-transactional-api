/* --- Third-party libraries --- */
import { isEmail } from 'class-validator';

/* --- DTOs --- */
import { NewUserReqDto } from './new-user.req-dto';

describe('NewUser', () => {
  let newUserReqDto: NewUserReqDto;

  beforeEach(() => {
    newUserReqDto = new NewUserReqDto();
    newUserReqDto.firstName = 'John';
    newUserReqDto.lastName = 'Doe';
    newUserReqDto.email = 'john.doe@gmail.com';
    newUserReqDto.country = 'US';
    newUserReqDto.administrativeArea = 'CA';
    newUserReqDto.locality = 'San Francisco';
    newUserReqDto.address1 = '123 Main St';
    newUserReqDto.postalCode = '94105';
    newUserReqDto.password = 'strongPassword';
  });

  it('newUserReqDto should be defined', () => {
    expect(newUserReqDto).toBeDefined();
  });

  it('#address1 should be defined', () => {
    expect(newUserReqDto.address1).toBeDefined();
  });

  it('#address1 length should be less than or equal to 30', () => {
    expect(newUserReqDto.address1.length).toBeLessThanOrEqual(30);
  });

  it('#administrativeArea should be defined', () => {
    expect(newUserReqDto.administrativeArea).toBeDefined();
  });

  it('#administrativeArea length should be equal to 2', () => {
    expect(newUserReqDto.administrativeArea.length).toBe(2);
  });

  it('#country should be defined', () => {
    expect(newUserReqDto.country).toBeDefined();
  });

  it('#country length should be equal to 2', () => {
    expect(newUserReqDto.country.length).toBe(2);
  });

  it('#email should be defined', () => {
    expect(newUserReqDto.email).toBeDefined();
  });

  it('#email should be a valid email address', () => {
    expect(isEmail(newUserReqDto.email)).toBeTruthy();
  });

  it('#email length should be less than or equal to 32', () => {
    expect(newUserReqDto.email.length).toBeLessThanOrEqual(32);
  });

  it('#firstName should be defined', () => {
    expect(newUserReqDto.firstName).toBeDefined();
  });

  it('#firstName length should be less than or equal to 15', () => {
    expect(newUserReqDto.firstName.length).toBeLessThanOrEqual(15);
  });

  it('#lastName should be defined', () => {
    expect(newUserReqDto.lastName).toBeDefined();
  });

  it('#lastName length should be less than or equal to 15', () => {
    expect(newUserReqDto.lastName.length).toBeLessThanOrEqual(15);
  });

  it('#locality should be defined', () => {
    expect(newUserReqDto.locality).toBeDefined();
  });

  it('#locality length should be less than or equal to 30', () => {
    expect(newUserReqDto.locality.length).toBeLessThanOrEqual(30);
  });

  it('#password should be defined', () => {
    expect(newUserReqDto.password).toBeDefined();
  });

  it('#password length should be greater than or equal to 8', () => {
    expect(newUserReqDto.password.length).toBeGreaterThanOrEqual(8);
  });

  it('#password length should be less than or equal to 32', () => {
    expect(newUserReqDto.password.length).toBeLessThanOrEqual(32);
  });

  it('#postalCode should be defined', () => {
    expect(newUserReqDto.postalCode).toBeDefined();
  });

  it('#postalCode length should be less than or equal to 7', () => {
    expect(newUserReqDto.postalCode.length).toBeLessThanOrEqual(7);
  });
});
