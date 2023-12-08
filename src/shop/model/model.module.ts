import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [ModelService],
  controllers: [ModelController],
  exports: [ModelService],
  imports: [FilesModule]
})
export class ModelModule {}
