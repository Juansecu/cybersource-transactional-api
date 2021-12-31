/* --- Third-party libraries --- */
import { Connection, EntityRepository, Repository } from 'typeorm';

/* --- Entities --- */
import { UserEntity } from '../../entities/user.entity';

@EntityRepository(UserEntity)
export class UsersEntityRepository extends Repository<UserEntity> {}

export const usersEntityRepositoryFactory = {
  inject: [Connection],
  provide: 'UserEntityRepository',
  useFactory: (connection: Connection) => connection.getRepository(UserEntity)
};
