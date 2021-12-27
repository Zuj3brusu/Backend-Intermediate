import { Module } from '@nestjs/common';
import { UsersService } from '../../../services/api/src/usersAPI/users.service';
import { usersProviders } from './users.providers';
import { UsersResolver } from '../../../services/api/src/usersAPI/users.resolver';
import { DatabaseModule } from '../database/database.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [DatabaseModule,PostsModule],
  controllers: [],
  providers: [
    UsersService,
    UsersResolver,
    ...usersProviders,
  ],
  exports: [UsersService],
})
export class UsersModule {}
