/* --- Third-party libraries --- */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* --- Entities --- */
import { UserEntity } from './entities/user.entity';

/* --- Repository factories --- */
import { usersEntityRepositoryFactory } from './repositories/entity-repositories/users.entity-repository';

/* --- Controllers --- */
import { UsersController } from './users.controller';

/* --- Services --- */
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, usersEntityRepositoryFactory],
  exports: [usersEntityRepositoryFactory]
})
export class UsersModule {}
