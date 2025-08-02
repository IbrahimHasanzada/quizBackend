import { PartialType } from "@nestjs/swagger";
import createDto from "./create.dto";

export default class UpdateUserDto extends PartialType(createDto) { }