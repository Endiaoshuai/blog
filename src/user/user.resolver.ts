import { HttpException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Arg, ID } from 'type-graphql';

import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from './current-user.decorator';
import { RegisterInput } from './dtos/register-input.dto';
import { UpdateUserInput } from './dtos/update-user-input.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  public async register(@Args('input') input: RegisterInput) {
    // const result = await User.create(input).save();
    // return result;
    const result = await this.userService.register(input);
    return result;
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  public async user(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<User> {
    const result = await this.userService.findUser(id);
    return result;
  }

  @UseGuards(AuthGuard)
  @Query(() => [User])
  public async users(): Promise<User[]> {
    const result = await this.userService.findAll();
    return result;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  public async updateUser(
    @CurrentUser() user: User,
    @Args('updateUser') input: UpdateUserInput,
  ): Promise<User> {
    if (!input.password || input.password !== input.re_Password) {
      throw new HttpException('重复密码不一致', 400);
    }
    const result = await this.userService.updateUser({
      id: user.id,
      password: input.password,
      name: input.name,
    });
    return result;
  }
}
