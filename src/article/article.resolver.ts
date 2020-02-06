import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
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
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleInput } from './dtos/article-input.dto';
import { ArticleUpdateInput } from './dtos/article-update-input.dto';

import DataLoader = require('dataloader');

@UseGuards(AuthGuard)
@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {
    return this;
  }

  @Mutation(() => Article)
  public async createArticle(
    @CurrentUser() user: User,
    @Args('input') input: ArticleInput,
  ): Promise<Article> {
    const result = await this.articleService.createArticle(input, user);
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

  @Query(() => Article)
  public async article(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<Article> {
    const result = await this.articleService.article(id);
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
  public async user(
    @Parent() article: Article,
    @Context('UserLoaderById') loader: DataLoader<number, User>,
  ): Promise<User> {
    const result = await loader.load(article.userId);
    return result;
  }
}
