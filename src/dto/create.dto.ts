import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsString, IsUrl } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsUrl()
    cover_uri: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsBoolean()
    @Transform(({ value }) => toBoolean(value))
    published: Boolean
}

const toBoolean = (t: number) => {
    if (t != 0 && Number(t)) {
        return Boolean(t);
    } else if (t == 0) {
        return false
    }

    throw new BadRequestException('published must be number')
}