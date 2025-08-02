import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './user.service';
import UserEntity from 'src/entities/User.entity';
import { AuthController } from './user.controller';
import AuthUtils from './auth.utils';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [AuthController],
    providers: [AuthService, AuthUtils]
})
export class AuthModule { };