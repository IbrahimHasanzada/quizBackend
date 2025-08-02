import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export default class loginDto {
    @Type()
    @IsString()
    @ApiProperty({ default: "johndoe@example.com" })
    email: string

    @Type()
    @IsString()
    @ApiProperty({ default: "johndoe123" })
    password: string
}