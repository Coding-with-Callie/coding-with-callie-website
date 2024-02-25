import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speaker } from './entities/speaker.entity';
import { SpeakersService } from './speakers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker])],
  providers: [SpeakersService],
  exports: [SpeakersService],
})
export class SpeakersModule {}
