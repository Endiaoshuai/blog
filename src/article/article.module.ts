import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [UserModule],
  providers: [ArticleService, ArticleResolver],
})
export class ArticleModule {}
