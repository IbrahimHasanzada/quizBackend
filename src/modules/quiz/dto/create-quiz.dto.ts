import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateQuestionDto } from "./create-question.dto";

export class CreateQuizDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Quiz başlığı',
        example: 'JavaScript Temelleri'
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Quiz açıklaması',
        example: 'Temel JavaScript konularını test eden quiz'
    })
    description: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        description: 'Quiz aktif durumu',
        example: true,
        default: true
    })
    isActive?: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    @ApiProperty({
        type: [CreateQuestionDto],
        description: 'Quiz soruları',
        example: [
            {
                question: 'JavaScript hangi yıl geliştirildi?',
                type: 'multiple-choice',
                options: ['1995', '1996', '1997', '1998'],
                correctAnswer: 0
            },
            {
                question: 'JavaScript bir compiled dildir',
                type: 'true-false',
                correctAnswer: false
            }
        ]
    })
    questions: CreateQuestionDto[];
}