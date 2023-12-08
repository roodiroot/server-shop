import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';
import { Public, Roles } from '@common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){}
    
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    @UseInterceptors(FileInterceptor('img'))
    async create(
        @Body(new ValidationPipe()) dto: CreateCategoryDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: '.(png|jpeg|jpg)'}),
                    new MaxFileSizeValidator({ maxSize: 2600000 }),
                ],
                fileIsRequired: false,
            })
        ) img?: Express.Multer.File){
        const category = await this.categoryService.create(dto, img)
        return category
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Put(":id")
    @UseInterceptors(FileInterceptor('img'))
    async update(
        @Body(new ValidationPipe()) dto: any, 
        @Param("id") id: string,
        @UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType: '.(png|jpeg|jpg)'}),
                new MaxFileSizeValidator({ maxSize: 2600000 }),
            ],
            fileIsRequired: false,
          })
    ) img?: Express.Multer.File ){
        const category = await this.categoryService.update(id, dto, img)
        return category
    }

    @Public()
    @Get()
    async getList(){
        const categorys = await this.categoryService.getList()
        return categorys
    }

    @Public()
    @Get(":id")
    async getOne(@Param("id") id: string){
        if(isNaN(Number(id))){
            throw new BadRequestException('Не верный тип id')
        }
        const category = await this.categoryService.getOne(Number(id))
        return category
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(":id")
    async delete(@Param("id") id: string){
        if(isNaN(Number(id))){
            throw new BadRequestException('Не верный тип id')
        }
        const del = await this.categoryService.delete(Number(id))
        return del
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete()
    async deleteMany(@Body() ids: number[]){
        const delElements = await this.categoryService.deleteMany(ids)
        return delElements
    }
}
