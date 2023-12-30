import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateSize3Dto } from './dto/create-size3-dto';

@Injectable()
export class Size3Service {
    constructor(private prismaService: PrismaService) {}

    async create(dto: CreateSize3Dto, product_id: number) {
        const size = await this.prismaService.size3.create({
            data: {
                productId: product_id,
                size: dto?.size ?? undefined,
                description_size: dto?.description_size ?? undefined,
                price: dto?.price ?? undefined,
            },
        });
        return size;
    }

    async update(dto: any, id: string) {
        if (!dto.id) {
            const size = await this.prismaService.size3.create({
                data: {
                    productId: Number(id),
                    size: dto?.size ?? undefined,
                    description_size: dto?.description_size ?? undefined,
                    price: dto?.price ?? undefined,
                },
            });
            return size;
        } else {
            const size = await this.prismaService.size3.update({
                where: { id: dto.id },
                data: {
                    size: dto?.size ?? undefined,
                    description_size: dto?.description_size ?? undefined,
                    price: dto?.price ?? undefined,
                },
            });
            return size;
        }
    }

    async getList(filter) {
        const sizes = await this.prismaService.size3.findMany({ where: { productId: filter.product_id } });
        return sizes;
    }

    async getOne(id: number) {
        const size = await this.prismaService.size3.findUnique({ where: { id } });
        return size;
    }

    async getMany(ids: number[]) {
        const sizes = await this.prismaService.size3.findMany({ where: { id: { in: [...ids] } } });
        return sizes;
    }

    async delete(id: number) {
        const del = await this.prismaService.size3.delete({ where: { id } });
        return del;
    }
    async deleteMany(ids: number[]) {
        await this.prismaService.size3.deleteMany({ where: { id: { in: [...ids] } } });
        return ids;
    }
}
