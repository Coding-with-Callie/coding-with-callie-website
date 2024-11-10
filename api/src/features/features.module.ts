import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { FeaturesService } from './features.service';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Feature]), ProjectsModule],
  providers: [FeaturesService],
  exports: [FeaturesService],
})
export class FeaturesModule {}
