import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { ID } from 'type-graphql';

import { Article } from '../article/article.entity';
import { ArticleService } from '../article/article.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from './current-user.decorator';
import { RegisterInput } from './dtos/register.input';
import { UpdateUserInput } from './dtos/update-user-input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly articleService: ArticleService,
  ) {
    return this;
  }

  @Mutation(() => User)
  public async register(@Args('input') input: RegisterInput): Promise<User> {
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

  // 检测到查询的字段里有 articles 他会自动执行该方法
  @ResolveProperty()
  public async articles(@Parent() user: User): Promise<Article[]> {
    const articles = await this.articleService.articles(user.id);
    return articles;
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
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    if (!input.password || input.password !== input.re_Password) {
      // throw new HttpException('重复密码不一致', 400);
      throw new BadRequestException('重复密码不一致', 'BadRequestException');
    }
    const result = await this.userService.updateUser({
      id: user.id,
      password: input.password,
      name: input.name,
    });
    return result;
  }
}
