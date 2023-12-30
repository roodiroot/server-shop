import { IsString, MinLength } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    modelId: string;

    categoryId: string;

    // @IsString()
    parameter: string;

    size: string;
    size_2: string;
    size_3: string;

    description?: string;
}
