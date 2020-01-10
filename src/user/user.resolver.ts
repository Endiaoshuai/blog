import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ID } from 'type-graphql';

import { User } from './user.entity';
import { RegisterInput } from './dtos/register-input.dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  public async register(@Args('input') input: RegisterInput) {
    const result = await this.userService.register(input);
    return result;
  }

  @Query(() => User)
  public async user(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<User> {
    const result = await this.userService.findUser(id);
    return result;
  }

  @Query(() => [User])
  public async users(): Promise<User[]> {
    const result = await this.userService.findAll();
    return result;
  }
}
