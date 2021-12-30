/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* --- DTOs --- */
import { NewUserReqDto } from './dtos/requests/new-user.req-dto';
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Entities --- */
import { UserEntity } from './entities/user.entity';

/* --- Mocks --- */
import { usersRepositoryMockFactory } from './mocks/users-repository.mock-factory';

/* --- Services --- */
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersRepository: Repository<UserEntity>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: usersRepositoryMockFactory
        }
      ]
    }).compile();

    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    );
    usersService = module.get<UsersService>(UsersService);
  });

  it('usersRepository should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  it('usersService should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('#register should register a new user', async () => {
    const newUserReqDto: NewUserReqDto = {
      email: 'murphsey@gmail.com',
      firstName: 'Murph',
      lastName: 'Hershey',
      password: 'password'
    };
    const newUserCreate: MessageResDto = await usersService.register(
      newUserReqDto
    );

    expect(newUserCreate).toBeInstanceOf(MessageResDto);
    expect(newUserCreate.success).toBe(true);
    expect(newUserCreate.message).toBe('User created successfully');
  });

  it('#validatePassword should validate a password', async () => {
    expect(
      await usersService.validatePassword(
        'password',
        '$2b$10$ibZnSKNuxG//5eZkFBKoUudx76QZkQOFrGeiAJqQvoI.HYejjCThS'
      )
    ).toBe(true);
  });
});
