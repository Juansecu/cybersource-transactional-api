/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';

/* --- Repositories --- */
import { UsersEntityRepository } from './users.entity-repository';

describe('UsersEntityRepository', () => {
  let usersEntityRepository: UsersEntityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersEntityRepository]
    }).compile();

    usersEntityRepository = module.get<UsersEntityRepository>(
      UsersEntityRepository
    );
  });

  it('usersEntityRepository should be defined', () => {
    expect(usersEntityRepository).toBeDefined();
  });
});
