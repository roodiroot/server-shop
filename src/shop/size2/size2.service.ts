import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateSize2Dto } from './dto/create-size2-dto';

@Injectable()
export class Size2Service {
    constructor(private prismaService: PrismaService) {}

    async create(dto: CreateSize2Dto, product_id: number) {
        const size = await this.prismaService.size2.create({
            data: {
                productId: product_id,
                length: dto?.length ?? undefined,
                price: dto?.price ?? undefined,
            },
        });
        return size;
    }

    async update(dto: any, id: string) {
        if (!dto.id) {
            const size = await this.prismaService.size2.create({
                data: {
                    productId: Number(id),
                    length: dto?.length ?? undefined,
                    price: dto?.price ?? undefined,
                },
            });
            return size;
        } else {
            const size = await this.prismaService.size2.update({
                where: { id: dto.id },
                data: {
                    length: dto?.length ?? undefined,
                    price: dto?.price ?? undefined,
                },
            });
            return size;
        }
    }

    async getList(filter) {
        const sizes = await this.prismaService.size2.findMany({ where: { productId: filter.product_id } });
        return sizes;
    }

    async getOne(id: number) {
        const size = await this.prismaService.size2.findUnique({ where: { id } });
        return size;
    }

    async getMany(ids: number[]) {
        const sizes = await this.prismaService.size2.findMany({ where: { id: { in: [...ids] } } });
        return sizes;
    }

    async delete(id: number) {
        const del = await this.prismaService.size2.delete({ where: { id } });
        return del;
    }
    async deleteMany(ids: number[]) {
        await this.prismaService.size2.deleteMany({ where: { id: { in: [...ids] } } });
        return ids;
    }
}
