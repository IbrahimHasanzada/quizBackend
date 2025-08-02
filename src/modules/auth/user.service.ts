import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import createDto from './dto/create.dto';
import UserEntity from 'src/entities/User.entity';
import { ClsService } from 'nestjs-cls';
import { hash, compare } from 'bcrypt';
import loginDto from './dto/login.dto';
import AuthUtils from './auth.utils';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private cls: ClsService,
        private authUtils: AuthUtils
    ) { }



    async register(params: createDto) {

        let checkUser = await this.userRepo.findOne({ where: { email: params.email } })

        if (checkUser) throw new ConflictException("User already exsist with given email!")

        params.password = await hash(params.password, 10)

        let user = this.userRepo.create(params)

        await user.save()

        return user
    }

    async login(params: loginDto) {

        let user = await this.userRepo.findOne({ where: { email: params.email } })

        if (!user) throw new UnauthorizedException()

        let checkedPassword = await compare(params.password, user.password)

        if (!checkedPassword) throw new UnauthorizedException()

        return {
            user: { ...user, password: undefined },
            token: this.authUtils.generateToken(user.id)
        }



    }

}