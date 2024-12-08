import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { ResourceService } from './resource.service';
import { FileUploadModule } from '../file_upload/file_upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resource]), FileUploadModule],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
