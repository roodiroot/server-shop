import { IsNumber, IsString } from 'class-validator';

export class CreateSizeDto {
    @IsString()
    sizeMm: string;
    @IsNumber()
    fastex_standard_price: number;
    @IsNumber()
    fastex_reinforced_price: number;
    @IsNumber()
    slip_price: number;
    @IsNumber()
    martingale_price: number;
}
