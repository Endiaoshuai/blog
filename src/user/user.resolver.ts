import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ID } from 'type-graphql';

import { AuthGuard } from '../auth/auth.guard';
import { User } from './user.entity';
import { RegisterInput } from './dtos/register-input.dto';
import { UserService } from './user.service';
import { CurrentUser } from './current-user.decorator';

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
  public async users(@CurrentUser() user: User): Promise<User[]> {
    const result = await this.userService.findAll();
    return result;
  }

  // 更新用户信息，需要有auth
  @Mutation(() => User)
  public async updateUser() {}
}
