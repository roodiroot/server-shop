import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { FilesModule } from './files/files.module';

import { TypeModule } from './shop/type/type.module';
import { ProductModule } from './shop/product/product.module';
import { FilesService } from './files/files.service';
import { ModelModule } from './shop/model/model.module';
import { CategoryController } from './shop/category/category.controller';
import { CategoryService } from './shop/category/category.service';
import { CategoryModule } from './shop/category/category.module';
import { SizeModule } from './shop/size/size.module';
import { Size2Module } from './shop/size2/size2.module';
import { Size3Module } from './shop/size3/size3.module';
import { OrderModule } from './shop/order/order.module';
import { ProductBasketService } from './shop/product-basket/product-basket.service';
import { ProductBasketModule } from './shop/product-basket/product-basket.module';

@Module({
    imports: [UserModule, PrismaModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), FilesModule, TypeModule, ProductModule, ModelModule, CategoryModule, SizeModule, Size2Module, Size3Module, OrderModule, ProductBasketModule],
    providers: [{
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      }, FilesService, CategoryService, ProductBasketService,],
    controllers: [CategoryController]
})
export class AppModule {}
