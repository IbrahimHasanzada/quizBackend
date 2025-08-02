import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class AuthUtils {
    constructor(
        private jwt: JwtService
    ) { }

    generateToken(userId: number) {
        return this.jwt.sign({ userId })
    }

}