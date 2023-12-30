import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @MinLength(2)
    name: string;

    typeId: string | number;

    description?: string;

    img?: string;
}
