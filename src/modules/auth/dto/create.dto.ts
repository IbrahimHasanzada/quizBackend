import { IsAlphanumeric, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
export default class createDto {
    @Type()
    @IsString()
    @ApiProperty({ default: "John Doe" })
    fullname: string

    @Type()
    @IsString()
    @ApiProperty({ default: "johndoe@example.com" })
    email: string

    @Type()
    @IsString()
    @ApiProperty({ default: "johndoe123" })
    password: string
}