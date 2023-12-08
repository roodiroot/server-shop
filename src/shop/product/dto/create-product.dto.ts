import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { CreateSizeDto } from 'src/shop/size/dto';

export class CreateProductDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsNumber()
    typeId: number;

    @IsNumber()
    categoryId: number;

    @IsNumber()
    modelId: number;

    @IsString()
    parameter: string;

    size: CreateSizeDto[]

    description?: string;
}
