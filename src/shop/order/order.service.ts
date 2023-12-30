import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateOrderDto } from './dto';
import { ProductBasketService } from '../product-basket/product-basket.service';

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService, private productBasketService: ProductBasketService) {}
    async create(order: CreateOrderDto) {
        if (!order?.order.length) {
            throw new BadRequestException('Отсутствуют товары в заказе');
        }
        const booking = await this.prismaService.order.create({
            data: {
                name: order?.name,
                email: order?.email,
                phone: order?.phone,
                totalSumm: order?.totalSumm,
                commentValue: order?.commentValue,
                promocodeValue: order?.promocodeValue,
            },
        });
        if (!booking?.id) {
            throw new BadRequestException('Заказ не создался');
        }
        for (let i = 0; i < order?.order.length; i++) {
            await this.productBasketService.create(booking.id, order.order[i]);
        }
        return booking;
    }

    async update(id: string, dto: CreateOrderDto) {
        return null;
    }

    async getList(filters?: { typeId?: number }, sort?: string[] | any, range?: any) {
        const count = await this.prismaService.order.count();
        const bookings = await this.prismaService.order.findMany({ include: { products: true } });
        return { orderes: bookings, count };
    }

    async getOne(id: number) {
        const order = await this.prismaService.order.findUnique({ where: { id } });
        return order;
    }

    private async getOneByName(id: number) {
        const type = await this.prismaService.order.findUnique({ where: { id } });
        return type;
    }

    async getMany(ids: number[]) {
        const orders = await this.prismaService.order.findMany({ where: { id: { in: [...ids] } } });
        return orders;
    }

    async delete(id: number) {
        const del = await this.prismaService.order.delete({ where: { id } });
        return del;
    }
    async deleteMany(ids: number[]) {
        await this.prismaService.order.deleteMany({ where: { id: { in: [...ids] } } });
        return ids;
    }
}
