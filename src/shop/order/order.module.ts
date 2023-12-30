import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductBasketModule } from '../product-basket/product-basket.module';

@Module({
    providers: [OrderService],
    controllers: [OrderController],
    imports: [ProductBasketModule],
})
export class OrderModule {}
