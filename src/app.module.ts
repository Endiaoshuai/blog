import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule,
    UsersModule,
    // TypeOrmModule.forRoot(require('./../ormconfig')),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
