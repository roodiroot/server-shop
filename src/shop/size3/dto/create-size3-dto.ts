import { IsNumber, IsString } from 'class-validator';

export class CreateSize3Dto {
    @IsString()
    size: string;

    @IsString()
    description_size: string;

    @IsNumber()
    price: number;
}
