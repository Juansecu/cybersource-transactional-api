/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

/* --- Entities --- */
import { UserEntity } from '../entities/user.entity';

/* --- Mocks --- */
import { usersRepositoryMockFactory } from '../mocks/users-repository.mock-factory';

/* --- Middlewares --- */
import { UserAuthenticationMiddleware } from './user-authentication.middleware';

describe('UserAuthenticationMiddleware', () => {
  let userAuthenticationMiddleware: UserAuthenticationMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAuthenticationMiddleware,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: usersRepositoryMockFactory
        }
      ]
    }).compile();

    userAuthenticationMiddleware = module.get<UserAuthenticationMiddleware>(
      UserAuthenticationMiddleware
    );
  });

  it('userAuthenticationMiddleware should be defined', () => {
    expect(userAuthenticationMiddleware).toBeDefined();
  });
});
