import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { SignupUserInput } from './dto/signup-user.input';
import { SignupResponse } from './dto/signup-response';
import { UserRoleService } from 'src/userRole/userRole.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private userRoleService: UserRoleService,
  ) {}

  async signup(signupUserInput: SignupUserInput): Promise<SignupResponse> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signupUserInput.password, salt);
    signupUserInput.password = hashedPassword;

    const role = await this.userRoleService.findOne(signupUserInput.role);

    if (!role) {
      throw new GraphQLError('INVALID_ROLE', {
        extensions: {
          code: 'BAD_USER_INPUT',
          argumentName: 'quarterId',
        },
      });
    }

    const user = new User();
    user.email = signupUserInput.email;
    user.firstName = signupUserInput.firstName;
    user.password = signupUserInput.password;
    user.roleId = role.id;
    user.userRole = role;
    // signupUserInput.roleId = role.id;

    return this.userService.create(user);
  }

  async validateUser(username: string, password: string): Promise<unknown> {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async logIn(user: User) {
    // const user = await this.userService.findOne(user.email);
    const { password, ...result } = user;
    return {
      access_token: this.jwtService.sign({
        username: user.email,
        sub: user.id,
      }),
      user: result,
    };
  }
}
