import { Module } from '@nestjs/common';
import { SizeService } from './size.service';

@Module({
  providers: [SizeService],
  exports: [SizeService]
})
export class SizeModule {}
