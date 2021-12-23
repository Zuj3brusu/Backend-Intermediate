import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import * as redisStore from 'cache-manager-redis-store';

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
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
