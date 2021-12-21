import {User} from './user.entity'
import {Resolver, Query, ResolveField, Args, Parent, Mutation} from '@nestjs/graphql'
import { UsersService } from './users.service';
import { PostsService } from '../posts/posts.service';
import { CurrentUser } from 'src/auth/auth.resolver';
import { Post } from '../posts/post.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query()
  async getUsers() {
    return await this.usersService.findAll();
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

  @Mutation('createUser')
  async create(obj, args: User, context, info): Promise<User> {
    const createdUser = await this.usersService.create(args);
    return createdUser;
  }
}