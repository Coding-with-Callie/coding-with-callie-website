import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { FileUploadModule } from '../file_upload/file_upload.module';
import { ResourceModule } from '../resource/resource.module';
import { SpeakersModule } from '../speakers/speakers.module';
import { SectionsModule } from '../sections/sections.module';
import { PagesModule } from '../pages/pages.module';

@Module({
  imports: [
    FileUploadModule,
    ResourceModule,
    SpeakersModule,
    SectionsModule,
    PagesModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
