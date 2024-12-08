import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speaker } from './entities/speaker.entity';
import { SpeakersService } from './speakers.service';
import { FileUploadModule } from '../file_upload/file_upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker]), FileUploadModule],
  providers: [SpeakersService],
  exports: [SpeakersService],
})
export class SpeakersModule {}
