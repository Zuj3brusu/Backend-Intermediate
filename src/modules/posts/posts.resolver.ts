import {Post} from './post.entity'
import {Resolver, Query, ResolveField, Args, Parent, Mutation} from '@nestjs/graphql'
import { PostsService } from './posts.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { User } from '../users/user.entity';
import { CurrentUser } from 'src/auth/auth.resolver';
import { PostDto } from './dto/post.dto';

@Resolver(of => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
  ) {}

  @Query()
  async getPosts() {
    return await this.postsService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createPost')
  async create(@CurrentUser() user: User, @Args('postContent') args: String): Promise<any> {
    const createdPost = await this.postsService.create(user,args);
    return createdPost;
  }
}