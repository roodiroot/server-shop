import { Module } from '@nestjs/common';
import { Size2Service } from './size2.service';

@Module({
    providers: [Size2Service],
    exports: [Size2Service],
})
export class Size2Module {}
