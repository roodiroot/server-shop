import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateModelDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    categoryId: string;
    @IsString()
    typeId: string;

    description?: string;

    img?: string;
}
