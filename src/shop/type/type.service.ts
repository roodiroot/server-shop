import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

import { CreateTypeDto } from './dto';
import { FilesService } from 'src/files/files.service';


@Injectable()
export class TypeService {
    constructor(
        private prismaService: PrismaService,
        private filesService: FilesService
        ){}

    async create(dto: CreateTypeDto, img?: Express.Multer.File){
        const curent_name = await this.getOneByName(dto.name)
        if(curent_name){
            throw new BadRequestException('Тип с таким именем уже существует')
        }
        let img_name = ""
        if(img){
            img_name = await this.filesService.createFile(img)
        }
        const type = await this.prismaService.type.upsert({
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
        return type
    }

    async update(id: string, dto: any, img?: Express.Multer.File){
        let img_name = ""
        if(img){
            img_name = await this.filesService.createFile(img)
        }
        const type = await this.prismaService.type.update({where: {id: Number(id)}, data: {
                name: dto?.name,
                description: dto?.description,
                img: img_name === "" ? undefined : img_name
        }})
        return type
    }

    async getList(){
        const types = await this.prismaService.type.findMany()
        return types
    }
    
    async getOne(id: number){
        const type = await this.prismaService.type.findUnique({where: {id}})
        return type
    }
    private async getOneByName(name: string){
        const type = await this.prismaService.type.findUnique({where: {name}})
        return type
    }

    async getMany(ids: number[]){
        const types = await this.prismaService.type.findMany({where: {id: {in: [...ids]}}})
        return types
    }

    async delete(id: number){
        const del = await this.prismaService.type.delete({where: {id}})
        return del
    }
    async deleteMany(ids: number[]){
        await this.prismaService.type.deleteMany({where: {id: {in: [...ids]}}})
        return ids
    }
}
