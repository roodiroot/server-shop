import { ProductService } from './product.service';
import { Public, Roles } from '@common/decorators';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}
    
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    async create(@Body(new ValidationPipe()) dto: CreateProductDto){
        const product = await this.productService.create(dto)
        return product
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Put(":id")
    async update(@Param("id") id: string, @Body() dto: any){
        
        const product = await this.productService.update(id, dto)
        return product
    }

    @Public()
    @Get()
    async getList(@Query() filter: any){
        let products = [];
        if(!filter?.filter){
            products = await this.productService.getList(filter)
            return products
        }
        products = await this.productService.getList(JSON.parse(filter?.filter))
        return products
    }

    @Public()
    @Get(":id")
    async getOne(@Param("id") id: string){
        if(isNaN(Number(id))){
            throw new BadRequestException('Не верный формат парамера id.')
        }
        const type = await this.productService.getOne(Number(id))
        return type
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(":id")
    async delete(@Param("id") id: string){
        if(isNaN(Number(id))){
            throw new BadRequestException('Не верный формат парамера id.')
        }
        const del = await this.productService.delete(Number(id))
        return del
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete()
    async deleteMany(@Body() ids: number[]){
        const delElements = await this.productService.deleteMany(ids)
        return delElements
    }
}
