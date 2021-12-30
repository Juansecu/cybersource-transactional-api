/* --- Third-party libraries --- */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* --- Entities --- */
import { UserEntity } from './entities/user.entity';

/* --- Controllers --- */
import { UsersController } from './users.controller';

/* --- Services --- */
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
