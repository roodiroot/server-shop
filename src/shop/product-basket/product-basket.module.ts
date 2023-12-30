import { Module } from '@nestjs/common';
import { ProductBasketService } from './product-basket.service';

@Module({
    providers: [ProductBasketService],
    exports: [ProductBasketService],
})
export class ProductBasketModule {}
