import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID } from 'type-graphql';

import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../user/current-user.decorator';
import { User } from '../user/user.entity';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleInput } from './dtos/article-input.dto';
import { ArticleUpdateInput } from './dtos/article-update-input.dto';

@UseGuards(AuthGuard)
@Resolver('Article')
export class ArticleResolver {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => Article)
  public async article(
    @CurrentUser() user: User,
    @Args('createArticle') input: ArticleInput,
  ): Promise<Article> {
    const result = await this.articleService.article(input, user);
    return result;
  }

  @Mutation(() => Article)
  public async updateArticle(
    @CurrentUser() user: User,
    @Args('updateArticle') input: ArticleUpdateInput,
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

  // 其实查找user的时候就可以选择展示articles
  @Query(() => [Article])
  public async articles(
    @Args({ name: 'userId', type: () => ID }) userId: number,
  ): Promise<Article[]> {
    const result = await this.articleService.articles(userId);
    return result;
  }
}
