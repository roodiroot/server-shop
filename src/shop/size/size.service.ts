import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateSizeDto } from './dto';

@Injectable()
export class SizeService {
    constructor(
        private prismaService: PrismaService,
        ){}

    async create(dto: CreateSizeDto, product_id:number){
        const size = await this.prismaService.size.create({data: {
            productId: product_id,
            sizeMm: dto.sizeMm ?? undefined,
            price: dto.price ?? undefined
        }})
        return size
    }

    async update(id: string, dto: any){
        const size = await this.prismaService.size.update({where: {id: Number(id)}, data: {
                sizeMm: dto?.name,
                price: dto?.description,
        }})
        return size
    }

    async getList(filter){
        console.log(filter)
        const sizes = await this.prismaService.size.findMany({where: {productId: filter.product_id}})
        return sizes
    }
    
    async getOne(id: number){
        const size = await this.prismaService.size.findUnique({where: {id}})
        return size
    }

    async getMany(ids: number[]){
        const sizes = await this.prismaService.size.findMany({where: {id: {in: [...ids]}}})
        return sizes
    }

    async delete(id: number){
        const del = await this.prismaService.size.delete({where: {id}})
        return del
    }
    async deleteMany(ids: number[]){
        await this.prismaService.size.deleteMany({where: {id: {in: [...ids]}}})
        return ids
    }
}
