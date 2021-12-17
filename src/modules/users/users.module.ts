import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    UsersService,
    UsersResolver,
    ...usersProviders,
  ],
})
export class UsersModule {}
