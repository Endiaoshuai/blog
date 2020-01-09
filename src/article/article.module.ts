import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [ArticleService],
})
export class ArticleModule {}
