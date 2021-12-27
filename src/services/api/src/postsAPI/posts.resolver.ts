import {Post} from './post.entity'
import {Resolver, Query, ResolveField, Args, Parent, Mutation} from '@nestjs/graphql'
import { PostsService } from './posts.service';
import { CACHE_MANAGER, Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/src/auth/graphql-auth.guard';
import { User } from '../usersAPI/user.entity';
import { CurrentUser } from 'src/services/api/src/authAPI/auth.resolver';
import { Cache } from 'cache-manager'
import { PostDto } from './dto/post.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Resolver(of => Post)
export class PostsResolver {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('createPostQueue') private readonly createPostQueue: Queue,
    private postsService: PostsService,
  ) {}

  @Query()
  async getPosts() {
    var cacheStartTime = performance.now()
    const value = await this.cacheManager.get('getPosts');
    if(value){
      var cacheEndTime = performance.now()
      console.log({
        // data: value,
        timeTaken: `${cacheEndTime - cacheStartTime} milliseconds`,
        loadsFrom: 'redis cache'
      })
      return value
    }else{
      var dbStartTime = performance.now()
      const newValue = await this.postsService.findAll();
      var dbEndTime = performance.now()
      await this.cacheManager.set('getPosts', newValue);
      console.log({
        // data: newValue,
        timeTaken: `${dbEndTime - dbStartTime} milliseconds`,
        loadsFrom: 'database'
      })
      return newValue
    }
  }

  @Query()
  async getPostsByUserKey(obj, args, context, info) {
    const { email } = args;
    var cacheStartTime = performance.now()
    const value = await this.cacheManager.get('getPostsByUserKey'+email);
    if(value){
      var cacheEndTime = performance.now()
      console.log({
        // data: value,
        timeTaken: `${cacheEndTime - cacheStartTime} milliseconds`,
        loadsFrom: 'redis cache'
      })
      return value
    }else{
      var dbStartTime = performance.now()
      const newValue = await this.postsService.findAllByEmail(email);
      var dbEndTime = performance.now()
      await this.cacheManager.set('getPostsByUserKey'+email, newValue);
      console.log({
        // data: newValue,
        timeTaken: `${dbEndTime - dbStartTime} milliseconds`,
        loadsFrom: 'database'
      })
      return newValue
    }
  }

  @Query()
  async postCount(obj, args, context, info) {
    const { email } = args;
    var cacheStartTime = performance.now()
    const value = await this.cacheManager.get('postCount'+email);
    if(value){
      var cacheEndTime = performance.now()
      console.log({
        // data: value,
        timeTaken: `${cacheEndTime - cacheStartTime} milliseconds`,
        loadsFrom: 'redis cache'
      })
      return value
    }else{
      var dbStartTime = performance.now()
      const newValue = await this.postsService.postCount(email);
      var dbEndTime = performance.now()
      await this.cacheManager.set('postCount'+email, newValue);
      console.log({
        // data: newValue,
        timeTaken: `${dbEndTime - dbStartTime} milliseconds`,
        loadsFrom: 'database'
      })
      return newValue
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createPost')
  async create(@CurrentUser() user: User, @Args('postContent') args: String): Promise<any> {
    const createdPost = await this.postsService.create(user,args);
    await this.cacheManager.reset();
    const job = await this.createPostQueue.add('createPostQueue', {
      queueContent:args,
    });
    return createdPost;
  }
}