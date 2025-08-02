import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import QuizEntity from "./Quiz.entity";

@Entity("user")
export default class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(() => QuizEntity, (quiz) => quiz.creator)
    quizzes: QuizEntity[]

    @CreateDateColumn()
    createdAt: Date
}