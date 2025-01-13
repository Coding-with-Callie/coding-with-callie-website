import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from '../file_upload/file_upload.module';
import { Section } from './entities/section.entity';
import { SectionsService } from './sections.service';

@Module({
  imports: [TypeOrmModule.forFeature([Section]), FileUploadModule],
  providers: [SectionsService],
  exports: [SectionsService],
})
export class SectionsModule {}
