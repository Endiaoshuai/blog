import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { Article } from './article.entity';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User]), UserModule],
  providers: [ArticleService, ArticleResolver],
})
export class ArticleModule {}
