import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/src/database/database.module';
import { UsersModule } from './common/src/users/users.module';
import { AuthModule } from './common/src/auth/auth.module';
import { PostsModule } from './common/src/posts/posts.module';
import * as redisStore from 'cache-manager-redis-store';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './services/queue/src/queue.module';

@Module({
  imports: [
    GraphQLModule.forRoot({ 
      typePaths: ['./**/*.graphql'],
  }),
  ConfigModule.forRoot({ isGlobal: true, }),
  DatabaseModule,
  UsersModule,
  AuthModule,
  PostsModule,
  CacheModule.register({
    isGlobal: true,
    store:redisStore,
    host: process.env.REDIS_HOST,
    port: 6379,
    ttl: 600,
  }),
  BullModule.forRoot({
    redis: {
      host: process.env.REDIS_HOST,
      port: 6379,
    },
  }),
  QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
