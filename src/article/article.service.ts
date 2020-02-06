import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { Article } from './article.entity';
import { ArticleInput } from './dtos/article-input.dto';
import { ArticleUpdateInput } from './dtos/article-update-input.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
    return this;
  }

  public async createArticle(
    input: ArticleInput,
    user: User,
  ): Promise<Article> {
    const result = await this.articleRepository.save({ ...input, user });
    return result;
  }

  public async article(id: number): Promise<Article> {
    const result = await this.articleRepository.findOne(id);
    return result;
  }

  public async updateArticle(
    input: ArticleUpdateInput,
    user: User,
  ): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id: input.id, user },
    });
    if (!article) {
      throw new BadRequestException('找不到文章', 'BadRequestException');
    }
    article.title = input.title;
    article.content = input.content;
    const result = await article.save();
    return result;
  }

  public async removeArticle(id: number, user: User): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id, user },
    });
    if (!article) {
      throw new BadRequestException('找不到文章', 'BadRequestException');
    }
    await article.remove();
    article.id = id;
    return article;
  }

  public async articles(userId: number): Promise<Article[]> {
    const articles = await this.articleRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        createAt: 'DESC',
      },
    });
    // console.log(articles);
    return articles;
  }
}
