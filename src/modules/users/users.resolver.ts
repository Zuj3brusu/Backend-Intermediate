import {User} from './user.entity'
import {Resolver, Query, ResolveField, Args, Parent} from '@nestjs/graphql'
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
}