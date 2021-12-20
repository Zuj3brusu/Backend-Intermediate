import {User} from './user.entity'
import {Resolver, Query, ResolveField, Args, Parent, Mutation} from '@nestjs/graphql'
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
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

  @Mutation('createUser')
  async create(obj, args: User, context, info): Promise<User> {
    const createdUser = await this.usersService.create(args);
    return createdUser;
  }
}