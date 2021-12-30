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
    newUserReqDto.password = 'strongPassword';
  });

  it('newUserReqDto should be defined', () => {
    expect(newUserReqDto).toBeDefined();
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

  it('#password should be defined', () => {
    expect(newUserReqDto.password).toBeDefined();
  });

  it('#password length should be greater than or equal to 8', () => {
    expect(newUserReqDto.password.length).toBeGreaterThanOrEqual(8);
  });

  it('#password length should be less than or equal to 32', () => {
    expect(newUserReqDto.password.length).toBeLessThanOrEqual(32);
  });
});
