import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateProductDto } from './dto';
import { ModelService } from '../model/model.service';
import { TypeService } from '../type/type.service';
import { CategoryService } from '../category/category.service';
import { SizeService } from '../size/size.service';

@Injectable()
export class ProductService {
    constructor(
        private prismaService: PrismaService,
        private modelService: ModelService,
        private typeService: TypeService,
        private categoryService: CategoryService,
        private sizeService: SizeService
        ){}

    async create(dto: CreateProductDto){

        const modelId = await this.modelService.getOne(dto.modelId)
        const typeId = await this.typeService.getOne(dto.typeId)
        const categoryId = await this.categoryService.getOne(dto.categoryId)
        if(!modelId || !typeId || !categoryId){
            throw new BadRequestException("Не достаточно данных о типах брендах или моделях устройства.")
        }
        const product = await this.prismaService.product.upsert({
            where: {name: dto.name},
            update: {
                name: dto.name ?? undefined,
                description: dto?.description ?? undefined,
            },
            create: {
                name: dto.name,
                description: dto?.description,
                parameter: dto?.parameter,
                typeId: dto.typeId,
                categoryId: dto.categoryId,
                modelId: dto.modelId
            }
        })
        if(dto?.size?.length){
        for(let i = 0; i < dto.size.length; i++){
            await this.sizeService.create(dto.size[i], product.id)
        }}
        return product
    }

    async update(id: string, dto: any){
        const product = await this.prismaService.product.update({where: {id: Number(id)}, data: {
            name: dto?.name,
            description: dto?.description,
            parameter: dto?.parameter,
            typeId: dto?.typeId,
            categoryId: dto?.categoryId,
            modelId: dto?.modelId
        }})
        return product
    }

    async getList(filters?: {type_id?: number, model_id?: number, category_id?: number}){
        const products = await this.prismaService.product.findMany({
            where: {
                typeId: isNaN(Number(filters?.type_id)) ? undefined : Number(filters?.type_id),
                categoryId: isNaN(Number(filters?.category_id)) ? undefined : Number(filters?.category_id),
                modelId: isNaN(Number(filters?.model_id)) ? undefined : Number(filters?.model_id),
            },
            include: {
                size: true
            }
        })
        return products
    }
    
    async getOne(id: number){
        const product = await this.prismaService.product.findUnique({where: {id}, include: {size: true}})
        return product
    }

    async getMany(ids: number[]){
        const products = await this.prismaService.product.findMany({where: {id: {in: [...ids]}}})
        return products
    }

    async delete(id: number){
        const del = await this.prismaService.product.delete({where: {id}})
        return del
    }
    async deleteMany(ids: number[]){
        await this.prismaService.product.deleteMany({where: {id: {in: [...ids]}}})
        return ids
    }
}
