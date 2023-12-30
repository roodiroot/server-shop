import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateProductDto } from './dto';
import { ModelService } from '../model/model.service';
import { SizeService } from '../size/size.service';
import { FilesService } from 'src/files/files.service';
import { Size2Service } from '../size2/size2.service';
import { Size3Service } from '../size3/size3.service';

@Injectable()
export class ProductService {
    constructor(
        private prismaService: PrismaService,
        private modelService: ModelService,
        private sizeService: SizeService,
        private sizeService2: Size2Service,
        private sizeService3: Size3Service,
        private filesService: FilesService,
    ) {}

    async create(dto: CreateProductDto, files: Array<Express.Multer.File>) {
        const modelId = await this.modelService.getOne(Number(dto.modelId));

        if (!modelId) {
            throw new BadRequestException('Не достаточно данных о типах брендах или моделях устройства.');
        }
        let imgArray = [];
        if (files?.length) {
            for (let i = 0; i < files.length; i++) {
                const name = await this.filesService.createFile(files[i]);
                imgArray.push(name);
            }
        }

        const product = await this.prismaService.product.upsert({
            where: { name: dto.name },
            update: {
                name: dto.name ?? undefined,
                description: dto?.description ?? undefined,
            },
            create: {
                name: dto.name,
                description: dto?.description,
                parameter: dto?.parameter,
                modelId: Number(dto.modelId),
                img: imgArray ?? undefined,
            },
        });
        // console.log(dto);
        const size = dto?.size ? JSON.parse(dto?.size) : undefined;
        const size_2 = dto?.size_2 ? JSON.parse(dto?.size_2) : undefined;
        const size_3 = dto.size_3 ? JSON.parse(dto?.size_3) : undefined;
        // console.log('s1', size);
        // console.log('s2', size_2);
        // console.log('s3', size_3);

        if (size?.length) {
            for (let i = 0; i < size?.length; i++) {
                await this.sizeService.create(size[i], product.id);
            }
        }
        if (size_2?.length) {
            for (let i = 0; i < size_2?.length; i++) {
                await this.sizeService2.create(size_2[i], product.id);
            }
        }
        if (size_3?.length) {
            for (let i = 0; i < size_3?.length; i++) {
                await this.sizeService3.create(size_3[i], product.id);
            }
        }
        return product;
    }

    async update(id: string, dto: CreateProductDto, files: Array<Express.Multer.File>) {
        if (isNaN(Number(id))) throw new BadRequestException('Неверный тип параметра id');
        const curent_product = await this.prismaService.product.findUnique({ where: { id: Number(id) } });
        if (!curent_product) throw new BadRequestException('Нет такого товара для обновления');
        let imgArray = [];
        if (files?.length) {
            for (let i = 0; i < files.length; i++) {
                const name = await this.filesService.createFile(files[i]);
                imgArray.push(name);
            }
        }
        const product = await this.prismaService.product.update({
            where: { id: Number(id) },
            data: {
                name: dto?.name,
                description: dto?.description,
                parameter: dto?.parameter,
                modelId: Number(dto?.modelId),
                img: !imgArray.length ? undefined : imgArray,
            },
        });
        // console.log(dto);
        const size = dto?.size ? JSON.parse(dto?.size) : undefined;
        const size_2 = dto?.size_2 ? JSON.parse(dto?.size_2) : undefined;
        const size_3 = dto.size_3 ? JSON.parse(dto?.size_3) : undefined;

        // console.log('s1', size);
        // console.log('s2', size_2);
        // console.log('s3', size_3);
        // ======================================== SIZE 1
        if (typeof size === 'object') {
            const list = await this.sizeService.getList({ product_id: Number(id) });
            if (list.length) {
                for (let d = 0; d < list.length; d++) {
                    await this.sizeService.delete(list[d].id);
                }
            }
        }
        if (size?.length) {
            for (let i = 0; i < size.length; i++) {
                await this.sizeService.create(size[i], Number(id));
            }
        }
        // ======================================== SIZE 2
        if (typeof size_2 === 'object') {
            const list = await this.sizeService2.getList({ product_id: Number(id) });
            if (list.length) {
                for (let d = 0; d < list.length; d++) {
                    await this.sizeService2.delete(list[d].id);
                }
            }
        }
        if (size_2?.length) {
            for (let i = 0; i < size_2.length; i++) {
                await this.sizeService2.create(size_2[i], Number(id));
            }
        }
        // // ======================================== SIZE 3
        if (typeof size_3 === 'object') {
            const list = await this.sizeService3.getList({ product_id: Number(id) });
            if (list.length) {
                for (let d = 0; d < list.length; d++) {
                    await this.sizeService3.delete(list[d].id);
                }
            }
        }
        if (size_3?.length) {
            for (let i = 0; i < size_3.length; i++) {
                await this.sizeService3.create(size_3[i], Number(id));
            }
        }

        // if (size.length) {
        //     let deletSizesAll = [];
        //     const deletSizesCurent = [];
        //     const sizes = await this.sizeService.getList({ product_id: product.id });
        //     sizes.map((p) => {
        //         deletSizesAll.push(p.id);
        //     });
        //     size.map((p) => {
        //         deletSizesCurent.push(p.id);
        //     });

        //     deletSizesAll = deletSizesAll.filter((el) => !~deletSizesCurent.indexOf(el));
        //     if (deletSizesAll.length) {
        //         for (let i = 0; i < deletSizesAll.length; i++) {
        //             await this.sizeService.delete(deletSizesAll[i]);
        //         }
        //     }

        //     for (let i = 0; i < size.length; i++) {
        //         await this.sizeService.update(size[i], id);
        //     }
        // }
        return product;
    }

    async getList(
        filters?: { modelId?: number; categoryId?: number; typeId?: number },
        sort?: string[] | any,
        range?: any,
    ) {
        const count = await this.prismaService.product.count({
            where: {
                modelId: isNaN(Number(filters?.modelId)) ? undefined : Number(filters?.modelId),
                model: {
                    categoryId: isNaN(Number(filters?.categoryId)) ? undefined : Number(filters?.categoryId),
                    category: {
                        typeId: isNaN(Number(filters?.typeId)) ? undefined : Number(filters?.typeId),
                    },
                },
            },
        });
        const products = await this.prismaService.product.findMany({
            where: {
                modelId: isNaN(Number(filters?.modelId)) ? undefined : Number(filters?.modelId),
                model: {
                    categoryId: isNaN(Number(filters?.categoryId)) ? undefined : Number(filters?.categoryId),
                    category: {
                        typeId: isNaN(Number(filters?.typeId)) ? undefined : Number(filters?.typeId),
                    },
                },
            },
            orderBy: {
                id: sort[0] === 'id' ? sort[1].toLowerCase() : undefined,
                name: sort[0] === 'name' ? sort[1].toLowerCase() : undefined,
            },
            include: {
                size: true,
                size_2: true,
                size_3: true,
                model: {
                    include: {
                        category: {
                            include: {
                                type: true,
                            },
                        },
                    },
                },
            },
            take: range[0],
            skip: range[1],
        });
        return { products, count };
    }

    async getOne(id: number) {
        const product = await this.prismaService.product.findUnique({
            where: { id },
            include: {
                model: { include: { category: { include: { type: true } } } },
                size: true,
                size_2: true,
                size_3: true,
            },
        });
        return product;
    }

    async getMany(ids: number[]) {
        const products = await this.prismaService.product.findMany({ where: { id: { in: [...ids] } } });
        return products;
    }

    async delete(id: number) {
        const del = await this.prismaService.product.delete({ where: { id } });
        return del;
    }
    async deleteMany(ids: number[]) {
        await this.prismaService.product.deleteMany({ where: { id: { in: [...ids] } } });
        return ids;
    }
}
