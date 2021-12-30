/* --- Third-party libraries --- */
import { isEmail } from 'class-validator';

/* --- DTOs --- */
import { UserLoginReqDto } from './user-login.req-dto';

describe('UserLoginReqDto', () => {
  let userLoginReqDto: UserLoginReqDto;

  beforeEach(() => {
    userLoginReqDto = new UserLoginReqDto();
    userLoginReqDto.email = 'john.doe@gmail.com';
    userLoginReqDto.password = 'strongPassword';
  });

  it('userLoginReqDto should be defined', () => {
    expect(userLoginReqDto).toBeDefined();
  });

  it('#email should be defined', () => {
    expect(userLoginReqDto.email).toBeDefined();
  });

  it('#email should be a valid email address', () => {
    expect(isEmail(userLoginReqDto.email)).toBeTruthy();
  });

  it('#email length should be less than or equal to 32', () => {
    expect(userLoginReqDto.email.length).toBeLessThanOrEqual(32);
  });

  it('#password should be defined', () => {
    expect(userLoginReqDto.password).toBeDefined();
  });

  it('#password length should be greater than or equal to 8', () => {
    expect(userLoginReqDto.password.length).toBeGreaterThanOrEqual(8);
  });

  it('#password length should be less than or equal to 32', () => {
    expect(userLoginReqDto.password.length).toBeLessThanOrEqual(32);
  });
});
