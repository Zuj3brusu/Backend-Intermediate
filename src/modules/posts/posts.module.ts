import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { postsProviders } from './posts.providers';
import { PostsResolver } from './posts.resolver';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    PostsService,
    PostsResolver,
    ...postsProviders,
  ],
  exports: [PostsService],
})
export class PostsModule {}
