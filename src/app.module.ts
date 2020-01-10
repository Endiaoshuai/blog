import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule,
    ArticleModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      tracing: true,
      autoSchemaFile: true,
      introspection: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
