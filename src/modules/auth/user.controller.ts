import { Body, Controller, Get, Post } from '@nestjs/common';
import createDto from './dto/create.dto';
import { AuthService } from './user.service';
import loginDto from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/register')
    async register(@Body() body: createDto) {
        let user = await this.authService.register(body)
        return user
    }

    @Post('/login')
    async login(@Body() body: loginDto) {
        let user = await this.authService.login(body)
        return user
    }
}