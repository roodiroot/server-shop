import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ModelModule } from '../model/model.module';
import { CategoryModule } from '../category/category.module';
import { TypeModule } from '../type/type.module';
import { SizeModule } from '../size/size.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [ModelModule, CategoryModule, TypeModule, SizeModule]
})
export class ProductModule {}
