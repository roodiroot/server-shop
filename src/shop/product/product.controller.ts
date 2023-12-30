import { ProductService } from './product.service';
import { Public, Roles } from '@common/decorators';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from './guards/file.guard';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @UseInterceptors(FileFieldsInterceptor([{ name: 'img', maxCount: 5 }]))
    @Post()
    async create(
        @UploadedFiles(new FileSizeValidationPipe())
        files: Array<Express.Multer.File>,
        @Body(new ValidationPipe()) dto: CreateProductDto,
    ) {
        const product = await this.productService.create(dto, files);
        return product;
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @UseInterceptors(FileFieldsInterceptor([{ name: 'img', maxCount: 5 }]))
    @Put(':id')
    async update(
        @Param('id') id: string,
        @UploadedFiles(new FileSizeValidationPipe())
        files: Array<Express.Multer.File>,
        @Body(new ValidationPipe()) dto: CreateProductDto,
    ) {
        const product = await this.productService.update(id, dto, files);
        return product;
    }

    @Public()
    @Get()
    async getList(@Query() params: { filter: string; sort: string; range: string }) {
        // console.log(params);
        const filters_all = { filter: '', sort: '', range: '' };
        filters_all.filter = params?.filter ?? '{}';
        filters_all.sort = params?.sort ?? '[]';
        filters_all.range = params?.range ?? '[]';
        const { products, count } = await this.productService.getList(
            JSON.parse(filters_all.filter),
            JSON.parse(filters_all.sort),
            JSON.parse(filters_all.range),
        );
        return { data: products, count };
    }

    @Public()
    @Get(':id')
    async getOne(@Param('id') id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException('Не верный формат парамера id.');
        }
        const type = await this.productService.getOne(Number(id));
        return type;
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException('Не верный формат парамера id.');
        }
        const del = await this.productService.delete(Number(id));
        return del;
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete()
    async deleteMany(@Body() ids: number[]) {
        const delElements = await this.productService.deleteMany(ids);
        return delElements;
    }
}
