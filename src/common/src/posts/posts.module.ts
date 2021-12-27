import { Module } from '@nestjs/common';
import { PostsService } from '../../../services/api/src/postsAPI/posts.service';
import { postsProviders } from './posts.providers';
import { PostsResolver } from '../../../services/api/src/postsAPI/posts.resolver';
import { DatabaseModule } from '../database/database.module';
import { BullModule } from '@nestjs/bull';
import { PostProcessor } from '../../../services/queue/src/posts.processor';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'createPostQueue',
    })],
  controllers: [],
  providers: [
    PostsService,
    PostsResolver,
    PostProcessor,
    ...postsProviders,
  ],
  exports: [PostsService],
})
export class PostsModule {}
