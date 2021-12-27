import { UseGuards, createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext, Resolver, Query, ResolveField, Args, Parent, Mutation} from '@nestjs/graphql'
import { AuthService } from './auth.service';
import { GqlAuthGuard } from '../../../../common/src/auth/graphql-auth.guard';
import { User } from 'src/services/api/src/usersAPI/user.entity';
import { UsersService } from 'src/services/api/src/usersAPI/users.service';

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
			return await this.authService.login(user)
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