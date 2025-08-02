import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import QuestionEntity from "./Question.entity";
import UserEntity from "./User.entity";

@Entity("quiz")
export default class QuizEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({ default: true })
    isActive: boolean

    @OneToMany(() => QuestionEntity, (question) => question.quiz, {
        cascade: true,
        eager: true
    })
    questions: QuestionEntity[]

    @ManyToOne(() => UserEntity, (user) => user.quizzes)
    creator: UserEntity

    @CreateDateColumn()
    createdAt: Date

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date
}