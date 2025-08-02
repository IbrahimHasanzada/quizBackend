import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import QuizEntity from 'src/entities/Quiz.entity';
import QuestionEntity from 'src/entities/Question.entity';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([QuizEntity, QuestionEntity]), UserModule],
    controllers: [QuizController],
    providers: [QuizService],
    exports: [QuizService,]
})
export class QuizModule { };