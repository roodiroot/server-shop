import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { FilesModule } from 'src/files/files.module';

@Module({
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: [CategoryService],
    imports: [FilesModule]
})
export class CategoryModule {}
