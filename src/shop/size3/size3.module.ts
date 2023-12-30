import { Module } from '@nestjs/common';
import { Size3Service } from './size3.service';

@Module({
    providers: [Size3Service],
    exports: [Size3Service],
})
export class Size3Module {}
