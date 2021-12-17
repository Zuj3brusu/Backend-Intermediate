import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    UsersService,
    ...usersProviders,
  ],
})
export class UsersModule {}
