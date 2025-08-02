import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    Request
} from '@nestjs/common';
import { QuizService } from './quiz.service'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { Auth } from 'src/shared/decorators/auth.decorator'

@Controller('quizzes')
export class QuizController {
    constructor(private readonly quizService: QuizService) { }

    @Post()
    @Auth()
    create(@Body() createQuizDto: CreateQuizDto, @Request() req: any) {
        return this.quizService.create(createQuizDto);
    }

    @Get()
    findAll() {
        return this.quizService.findAll();
    }


    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.quizService.findOne(id);
    }

    @Delete(':id')
    @Auth()
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.quizService.remove(id);
    }

}