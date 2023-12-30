import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateSizeDto } from './dto';

@Injectable()
export class SizeService {
    constructor(private prismaService: PrismaService) {}

    async create(dto: CreateSizeDto, product_id: number) {
        const size = await this.prismaService.size.create({
            data: {
                productId: product_id,
                sizeMm: dto?.sizeMm ?? undefined,
                fastex_standard_price: dto?.fastex_standard_price ?? undefined,
                fastex_reinforced_price: dto?.fastex_reinforced_price ?? undefined,
                slip_price: dto?.slip_price ?? undefined,
                martingale_price: dto?.martingale_price ?? undefined,
            },
        });
        return size;
    }

    async update(dto: any, id: string) {
        if (!dto.id) {
            const size = await this.prismaService.size.create({
                data: {
                    productId: Number(id),
                    sizeMm: dto?.sizeMm ?? undefined,
                    fastex_standard_price: dto?.fastex_standard_price ?? undefined,
                    fastex_reinforced_price: dto?.fastex_reinforced_price ?? undefined,
                    slip_price: dto?.slip_price ?? undefined,
                    martingale_price: dto?.martingale_price ?? undefined,
                },
            });
            return size;
        } else {
            const size = await this.prismaService.size.update({
                where: { id: dto.id },
                data: {
                    sizeMm: dto?.sizeMm ?? undefined,
                    fastex_standard_price: dto?.fastex_standard_price ?? undefined,
                    fastex_reinforced_price: dto?.fastex_reinforced_price ?? undefined,
                    slip_price: dto?.slip_price ?? undefined,
                    martingale_price: dto?.martingale_price ?? undefined,
                },
            });
            return size;
        }
    }

    async getList(filter) {
        const sizes = await this.prismaService.size.findMany({ where: { productId: filter.product_id } });
        return sizes;
    }

    async getOne(id: number) {
        const size = await this.prismaService.size.findUnique({ where: { id } });
        return size;
    }

    async getMany(ids: number[]) {
        const sizes = await this.prismaService.size.findMany({ where: { id: { in: [...ids] } } });
        return sizes;
    }

    async delete(id: number) {
        const del = await this.prismaService.size.delete({ where: { id } });
        return del;
    }
    async deleteMany(ids: number[]) {
        await this.prismaService.size.deleteMany({ where: { id: { in: [...ids] } } });
        return ids;
    }
}
