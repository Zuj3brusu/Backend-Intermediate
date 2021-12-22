import {User} from './user.entity'
import {Resolver, Query, ResolveField, Args, Parent, Mutation} from '@nestjs/graphql'
import { UsersService } from './users.service';
import { PostsService } from '../posts/posts.service';
import { CurrentUser } from 'src/auth/auth.resolver';
import { CACHE_MANAGER, Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { Cache } from 'cache-manager'

@Resolver(of => User)
export class UsersResolver {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query()
  async getUsers() {
    var cacheStartTime = performance.now()
    const value = await this.cacheManager.get('getUsers');
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
      const newValue = await this.usersService.findAll();
      var dbEndTime = performance.now()
      await this.cacheManager.set('getUsers', newValue);
      console.log({
        // data: newValue,
        timeTaken: `${dbEndTime - dbStartTime} milliseconds`,
        loadsFrom: 'database'
      })
      return newValue
    }
  }

  @Query()
  async getUserByEmail(obj, args, context, info) {
    const { email } = args;
    return await this.usersService.findOneByEmail(email);
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  async getMyPosts(@CurrentUser() user: User) {
    const email = user.email
    return await this.postsService.findAllByEmail(email);
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  async myPostCount(@CurrentUser() user: User) {
    const email = user.email
    return await this.postsService.postCount(email);
  }

  @Mutation('createUser')
  async create(obj, args: User, context, info): Promise<User> {
    const createdUser = await this.usersService.create(args);
    return createdUser;
  }
}