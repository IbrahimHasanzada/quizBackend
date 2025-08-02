import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { QuestionType } from "src/shared/enums/question.enum";

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    question: string;

    @IsEnum(QuestionType)
    type: QuestionType;

    @IsArray()
    @IsOptional()
    options?: string[];

    @IsNotEmpty()
    correctAnswer: any;
}