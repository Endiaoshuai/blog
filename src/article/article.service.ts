import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, RelationId } from 'typeorm';

import { Article } from './article.entity';
import { ArticleInput } from './dtos/article-input.dto';
import { ArticleUpdateInput } from './dtos/article-update-input.dto';

import { User } from 'src/user/user.entity';

@Injectable()
export class ArticleService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  public async article(input: ArticleInput, user: User): Promise<Article> {
    const result = await this.articleRepository.save({ ...input, user });
    // console.log('111', result);
    return result;
  }

  public async updateArticle(
    input: ArticleUpdateInput,
    user: User,
  ): Promise<any> {
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
    return articles;
  }
}
