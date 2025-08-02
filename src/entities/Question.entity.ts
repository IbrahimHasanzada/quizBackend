import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import QuizEntity from "./Quiz.entity";
import { QuestionType } from "src/shared/enums/question.enum";



@Entity("question")
export default class QuestionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @Column({
        type: 'enum',
        enum: QuestionType,
        default: QuestionType.MULTIPLE_CHOICE
    })
    type: QuestionType


    @Column({ type: 'json', nullable: true })
    options: string[]


    @Column({ type: 'json' })
    correctAnswer: any

    @ManyToOne(() => QuizEntity, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
    quiz: QuizEntity

    @CreateDateColumn()
    createdAt: Date
}