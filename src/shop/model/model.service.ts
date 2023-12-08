import { FilesService } from './../../files/files.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateModelDto } from './dto';

@Injectable()
export class ModelService {
    constructor(
        private prismaService: PrismaService,
        private filesService: FilesService
        ){}

    async create(dto: CreateModelDto, img: Express.Multer.File){
        const curent_name = await this.getOneByName(dto.name)
        if(curent_name){
            throw new BadRequestException('Тип с таким именем уже существует')
        }
        let img_name = ""
        if(img){
            img_name = await this.filesService.createFile(img)
        }
        const model = await this.prismaService.model.upsert({
            where: {name: dto.name},
            update: {
                name: dto.name ?? undefined,
                description: dto?.description ?? undefined,
                img: img_name ?? undefined
            },
            create: {
                name: dto.name,
                description: dto?.description,
                img: img_name === "" ? undefined : img_name
            }
        })
        return model
    }


    async update(id: string, dto: any, img?: Express.Multer.File){
        let img_name = ""
        if(img){
            img_name = await this.filesService.createFile(img)
        }
        const model = await this.prismaService.model.update({where: {id: Number(id)}, data: {
                name: dto?.name,
                description: dto?.description,
                img: img_name === "" ? undefined : img_name
        }})
        return model
    }

    async getList(){
        const models = await this.prismaService.model.findMany()
        return models
    }
    
    async getOne(id: number){
        const model = await this.prismaService.model.findUnique({where: {id}})
        return model
    }
    private async getOneByName(name: string){
        const type = await this.prismaService.model.findUnique({where: {name}})
        return type
    }

    async getMany(ids: number[]){
        const models = await this.prismaService.model.findMany({where: {id: {in: [...ids]}}})
        return models
    }

    async delete(id: number){
        const del = await this.prismaService.model.delete({where: {id}})
        return del
    }
    async deleteMany(ids: number[]){
        await this.prismaService.model.deleteMany({where: {id: {in: [...ids]}}})
        return ids
    }
}
