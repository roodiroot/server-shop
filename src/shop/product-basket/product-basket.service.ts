import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateProdBasket } from './dto';

@Injectable()
export class ProductBasketService {
    constructor(private prismaService: PrismaService) {}
    async create(orderId: number, dto: CreateProdBasket) {
        const prodBasket = this.prismaService.productBasket.create({
            data: {
                orderId: orderId,
                productId: dto?.id,
                name: dto?.name,
                price: dto?.price,
                comment: dto?.comment,
                carbine: dto?.carbine,
                interception: dto?.interception,
                size: dto?.size,
                count: dto?.count,
                totalSum: dto.totalSum,
                print: dto?.print,
                color: dto?.color,
                ring: dto?.ring,
            },
        });
        return prodBasket;
    }

    async update(id: string, dto: any) {
        return null;
    }

    async getList(filters?: { typeId?: number }, sort?: string[] | any, range?: any) {
        return null;
    }

    async getOne(id: number) {
        const productBasket = await this.prismaService.productBasket.findUnique({ where: { id } });
        return productBasket;
    }

    private async getOneByName(id: number) {
        const type = await this.prismaService.productBasket.findUnique({ where: { id } });
        return type;
    }

    async getMany(ids: number[]) {
        const productBaskets = await this.prismaService.productBasket.findMany({ where: { id: { in: [...ids] } } });
        return productBaskets;
    }

    async delete(id: number) {
        const del = await this.prismaService.productBasket.delete({ where: { id } });
        return del;
    }
    async deleteMany(ids: number[]) {
        await this.prismaService.productBasket.deleteMany({ where: { id: { in: [...ids] } } });
        return ids;
    }
}
