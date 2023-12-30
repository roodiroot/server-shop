import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ModelModule } from '../model/model.module';
import { CategoryModule } from '../category/category.module';
import { TypeModule } from '../type/type.module';
import { SizeModule } from '../size/size.module';
import { FilesModule } from 'src/files/files.module';
import { Size2Module } from '../size2/size2.module';
import { Size3Module } from '../size3/size3.module';

@Module({
    providers: [ProductService],
    controllers: [ProductController],
    imports: [ModelModule, CategoryModule, TypeModule, SizeModule, Size2Module, Size3Module, FilesModule],
})
export class ProductModule {}
