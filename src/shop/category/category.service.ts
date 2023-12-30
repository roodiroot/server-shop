import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateCategoryDto } from './dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class CategoryService {
    constructor(private prismaService: PrismaService, private filesService: FilesService) {}

    async create(dto: CreateCategoryDto, img?: Express.Multer.File) {
        const curent_name = await this.getOneByName(dto.name);
        if (curent_name) {
            throw new BadRequestException('Категория с таким именем уже существует');
        }
        let img_name = '';
        if (img) {
            img_name = await this.filesService.createFile(img);
        }
        const category = await this.prismaService.category.upsert({
            where: { name: dto.name },
            update: {
                name: dto.name ?? undefined,
                description: dto?.description ?? undefined,
                img: img_name ?? undefined,
            },
            create: {
                name: dto.name,
                description: dto?.description,
                img: img_name === '' ? undefined : img_name,
                typeId: Number(dto?.typeId),
            },
        });
        return category;
    }

    async update(id: string, dto: any, img?: Express.Multer.File) {
        let img_name = '';
        if (img) {
            img_name = await this.filesService.createFile(img);
        }
        const type = await this.prismaService.category.update({
            where: { id: Number(id) },
            data: {
                name: dto?.name,
                description: dto?.description,
                img: img_name === '' ? undefined : img_name,
                typeId: Number(dto?.typeId),
            },
        });
        return type;
    }

    async getList(filters?: { typeId?: number }, sort?: string[] | any, range?: any) {
        const count = await this.prismaService.category.count({ where: { typeId: filters?.typeId } });
        const categoryes = await this.prismaService.category.findMany({
            where: { typeId: filters?.typeId },
            orderBy: {
                id: sort[0] === 'id' ? sort[1].toLowerCase() : undefined,
                name: sort[0] === 'name' ? sort[1].toLowerCase() : undefined,
            },
            take: range[0],
            skip: range[1],
            include: { type: true },
        });
        return { categoryes, count };
    }

    async getOne(id: number) {
        const category = await this.prismaService.category.findUnique({ where: { id }, include: { type: true } });
        return category;
    }

    private async getOneByName(name: string) {
        const type = await this.prismaService.category.findUnique({ where: { name } });
        return type;
    }

    async getMany(ids: number[]) {
        const categorys = await this.prismaService.category.findMany({ where: { id: { in: [...ids] } } });
        return categorys;
    }

    async delete(id: number) {
        const del = await this.prismaService.category.delete({ where: { id } });
        return del;
    }
    async deleteMany(ids: number[]) {
        await this.prismaService.category.deleteMany({ where: { id: { in: [...ids] } } });
        return ids;
    }
}
