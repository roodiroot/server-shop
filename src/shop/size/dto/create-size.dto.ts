import { IsNumber, IsString } from 'class-validator';

export class CreateSizeDto {    
    @IsString()
    sizeMm: string;

    @IsNumber()
    price: number;
}
