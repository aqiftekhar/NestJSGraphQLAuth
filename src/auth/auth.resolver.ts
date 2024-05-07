import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { SignupResponse } from './dto/signup-response';
import { SignupUserInput } from './dto/signup-user.input';
import { User } from 'src/user/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signup(
    @Args('signupUserInput') signupUserInput: SignupUserInput,
  ): Promise<SignupResponse> {
    return await this.authService.signup(signupUserInput);
  }

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async logIn(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() ctx,
  ) {
    const user = await this.authService.logIn(ctx.user);

    return user;
  }
}
