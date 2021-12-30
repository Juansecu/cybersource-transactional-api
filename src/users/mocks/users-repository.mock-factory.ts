/* --- Entities --- */
import { UserEntity } from '../entities/user.entity';

export const usersRepositoryMockFactory: jest.Mock = jest.fn(() => ({
  create: jest.fn((userEntity: UserEntity) => userEntity),
  save: jest.fn((userEntity: UserEntity) => userEntity)
}));
