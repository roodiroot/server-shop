import { IsEmail, IsNumber, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { CreateItemOrderDto } from './create-item-order.dto';
import { CreateProdBasket } from 'src/shop/product-basket/dto';

export class CreateOrderDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsPhoneNumber()
    @IsString()
    phone: string;
    @IsNumber()
    totalSumm: number;

    commentValue: '';
    promocodeValue: '';

    order: CreateProdBasket[];
}
