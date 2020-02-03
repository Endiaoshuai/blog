import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { ID } from 'type-graphql';

import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../user/current-user.decorator';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleInput } from './dtos/article-input.dto';
import { ArticleUpdateInput } from './dtos/article-update-input.dto';

@UseGuards(AuthGuard)
@Resolver(() => User)
export class ArticleResolver {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly articleService: ArticleService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Article)
  public async createArticle(
    @CurrentUser() user: User,
    @Args('input') input: ArticleInput,
  ): Promise<Article> {
    const result = await this.articleService.article(input, user);
    return result;
  }

  @Mutation(() => Article)
  public async updateArticle(
    @CurrentUser() user: User,
    @Args('input') input: ArticleUpdateInput,
  ): Promise<Article> {
    const result = await this.articleService.updateArticle(input, user);
    return result;
  }

  @Mutation(() => Article)
  public async removeArticle(
    @CurrentUser() user: User,
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<Article> {
    const result = await this.articleService.removeArticle(id, user);
    return result;
  }

  @Query(() => [Article])
  public async articles(
    @Args({ name: 'userId', type: () => ID }) userId: number,
  ): Promise<Article[]> {
    const result = await this.articleService.articles(userId);
    return result;
  }

  @ResolveProperty()
  public async user(@Parent() article: Article): Promise<User> {
    const data = await this.userService.findUser(article.user.id);
    return data;
  }
}
