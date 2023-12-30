import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: { img: Array<Express.Multer.File> }, metadata: ArgumentMetadata) {
        if (!value?.img) {
            return;
        }
        for (let i = 0; i < value.img.length; i++) {
            if (value.img[i].mimetype !== 'image/jpeg' || value.img[i].size > 2000000) {
                throw new BadRequestException('Не подходящий размер или тип файлов');
            }
        }
        return value.img;
    }
}
