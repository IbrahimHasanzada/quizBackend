import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'
import config from './config';
import { ClsModule } from 'nestjs-cls';
import database from './config/database';
import { AuthModule } from './modules/auth/user.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(database.options),
    JwtModule.register({
      global: true,
      secret: config.superSecret,
      signOptions: { expiresIn: '1d' }
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true
      }
    }),
    AuthModule,
    QuizModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
