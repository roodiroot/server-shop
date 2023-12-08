import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto';
import { Public, Roles } from '@common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('type')
export class TypeController {
    constructor(private typeService: TypeService){}

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    @UseInterceptors(FileInterceptor('img'))
    async create(
        @Body(new ValidationPipe()) dto: CreateTypeDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: '.(png|jpeg|jpg)'}),
                    new MaxFileSizeValidator({ maxSize: 2600000 }),
                ],
                fileIsRequired: false,
            })
        ) img?: Express.Multer.File){
        const type = await this.typeService.create(dto, img)
        return type
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
        const type = await this.typeService.update(id, dto, img)
        return type
    }

    @Public()
    @Get()
    async getList(){
        const types = await this.typeService.getList()
        return types
    }

    @Public()
    @Get(":id")
    async getOne(@Param("id") id: string){
        if(isNaN(Number(id))){
            throw new BadRequestException('Не верный формат парамера id.')
        }
        const type = await this.typeService.getOne(Number(id))
        return type
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(":id")
    async delete(@Param("id") id: string){
        if(isNaN(Number(id))){
            throw new BadRequestException('Не верный формат парамера id.')
        }
        const del = await this.typeService.delete(Number(id))
        return del
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete()
    async deleteMany(@Body() ids: number[]){
        const delElements = await this.typeService.deleteMany(ids)
        return delElements
    }
}
