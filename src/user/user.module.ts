import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Article } from '../article/article.entity';
// import { ArticleModule } from '../article/article.module';
import { ArticleService } from '../article/article.service';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, Article])],
  providers: [ArticleService, UserService, UserResolver],
})
export class UserModule {}
