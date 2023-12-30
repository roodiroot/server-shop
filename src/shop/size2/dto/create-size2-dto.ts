import { IsNumber, IsString } from 'class-validator';

export class CreateSize2Dto {
    @IsString()
    length: string;

    @IsNumber()
    price: number;
}
