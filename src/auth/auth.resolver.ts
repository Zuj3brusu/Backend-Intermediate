import { UseGuards, createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext, Resolver, Query, ResolveField, Args, Parent, Mutation} from '@nestjs/graphql'
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './graphql-auth.guard';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

	@Mutation('login')
	public async login(obj, args, context, info): Promise<any> {
		const {email,password} = args
		const user = await this.authService.validateUser(email,password)
		if (user){
			return {firstName:user.dataValues.firstName, lastName:user.dataValues.lastName}
		}
		else{
			throw new UnauthorizedException();
		}
	}

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  profile(@CurrentUser() user: User) {
    return {firstName:user.firstName, lastName:user.lastName}
  }

}