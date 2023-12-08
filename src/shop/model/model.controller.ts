import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ModelService } from './model.service';
import { Public, Roles } from '@common/decorators';
import { CreateModelDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('model')
export class ModelController {
    constructor(private modelService: ModelService){}
    
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    @UseInterceptors(FileInterceptor('img'))
    async create(
        @Body(new ValidationPipe()) dto: CreateModelDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: '.(png|jpeg|jpg)'}),
                    new MaxFileSizeValidator({ maxSize: 2600000 }),
                ],
                fileIsRequired: false,
            })
        ) img?: Express.Multer.File){
        const model = await this.modelService.create(dto, img)
        return model
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
        const type = await this.modelService.update(id, dto, img)
        return type
    }

    @Public()
    @Get()
    async getList(){
        const models = await this.modelService.getList()
        return models
    }

    @Public()
    @Get(":id")
    async getOne(@Param("id") id: string){
        if(isNaN(Number(id))){
            throw new BadRequestException('Не верный тип id')
        }
        const model = await this.modelService.getOne(Number(id))
        return model
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(":id")
    async delete(@Param("id") id: string){
        if(isNaN(Number(id))){
            throw new BadRequestException('Не верный тип id')
        }
        const del = await this.modelService.delete(Number(id))
        return del
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete()
    async deleteMany(@Body() ids: number[]){
        const delElements = await this.modelService.deleteMany(ids)
        return delElements
    }
}
