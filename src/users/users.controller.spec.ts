/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

/* --- DTOs --- */
import { NewUserReqDto } from './dtos/requests/new-user.req-dto';
import { MessageResDto } from '../shared/dtos/responses/message.res-dto';

/* --- Entities --- */
import { UserEntity } from './entities/user.entity';

/* --- Mocks --- */
import { usersRepositoryMockFactory } from './mocks/users-repository.mock-factory';

/* --- Controllers --- */
import { UsersController } from './users.controller';

/* --- Services --- */
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: usersRepositoryMockFactory
        }
      ]
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('usersController should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('usersService should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('#register should register a new user', async () => {
    const newUserReqDto: NewUserReqDto = {
      address1: '123 Main St',
      administrativeArea: 'CA',
      country: 'US',
      email: 'murphsey@gmail.com',
      firstName: 'Lindsey',
      lastName: 'Murphy',
      locality: 'San Francisco',
      password: 'password',
      postalCode: '94105'
    };
    const newUserCreate: MessageResDto = await usersController.register(
      newUserReqDto
    );

    expect(newUserCreate).toBeInstanceOf(MessageResDto);
    expect(newUserCreate.success).toBe(true);
    expect(newUserCreate.message).toBe('User created successfully');
  });
});
