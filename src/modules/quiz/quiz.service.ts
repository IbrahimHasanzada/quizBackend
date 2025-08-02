import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import QuizEntity from 'src/entities/Quiz.entity';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(QuizEntity)
        private readonly quizRepository: Repository<QuizEntity>,


        private cls: ClsService
    ) { }

    async create(createQuizDto: CreateQuizDto) {
        let user = this.cls.get("user")

        const quiz = this.quizRepository.create({
            ...createQuizDto,
            creator: user
        })

        return await this.quizRepository.save(quiz)
    }

    async findAll() {
        return await this.quizRepository.find({
            relations: ['creator', 'questions'],
            select: {
                id: true,
                title: true,
                description: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                creator: {
                    id: true,
                    fullname: true,
                    email: true,
                    createdAt: true
                },
                questions: {
                    id: true,
                    question: true,
                    type: true,
                    options: true,
                    correctAnswer: true,
                    createdAt: true
                }
            },
            order: { createdAt: 'DESC' }
        })
    }

    async findOne(id: number) {
        const quiz = await this.quizRepository.findOne({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                creator: {
                    id: true,
                    fullname: true,
                    email: true,
                    createdAt: true
                },
                questions: {
                    id: true,
                    question: true,
                    type: true,
                    options: true,
                    correctAnswer: true,
                    createdAt: true
                }
            },
            relations: ['creator', 'questions']
        })

        if (!quiz) throw new NotFoundException(`Quiz with ID ${id} not found`)

        return quiz
    }



    async remove(id: number) {
        let user = this.cls.get("user")

        const quiz = await this.findOne(id)

        if (quiz.creator.id !== user.id) throw new NotFoundException('Quiz not found or you do not have permission')

        await this.quizRepository.remove(quiz)
        return { message: "Quiz deleted successfully" }
    }



}