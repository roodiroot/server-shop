import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Public, Roles } from '@common/decorators';
import { CreateOrderDto } from './dto';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Public()
    @Post()
    async create(@Body(new ValidationPipe()) order: CreateOrderDto) {
        console.log(order);
        const isOrder = await this.orderService.create(order);
        return isOrder;
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Put(':id')
    async update(@Body(new ValidationPipe()) dto: any, @Param('id') id: string) {
        const order = await this.orderService.update(id, dto);
        return order;
    }

    @Public()
    @Get()
    async getList(@Query() params: { filter?: string; range?: string; sort?: string }) {
        const filters_all = { filter: '', sort: '', range: '' };
        filters_all.filter = params?.filter ?? '{}';
        filters_all.sort = params?.sort ?? '[]';
        filters_all.range = params?.range ?? '[]';
        const { orderes, count } = await this.orderService.getList(
            JSON.parse(filters_all.filter),
            JSON.parse(filters_all.sort),
            JSON.parse(filters_all.range),
        );
        return { data: orderes, count };
    }

    @Public()
    @Get(':id')
    async getOne(@Param('id') id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException('Не верный тип id');
        }
        const order = await this.orderService.getOne(Number(id));
        return order;
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException('Не верный тип id');
        }
        const del = await this.orderService.delete(Number(id));
        return del;
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete()
    async deleteMany(@Body() ids: number[]) {
        const delElements = await this.orderService.deleteMany(ids);
        return delElements;
    }
}
