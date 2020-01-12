import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    UserModule
  ],
  providers: [ArticleService, ArticleResolver],
})
export class ArticleModule {}
