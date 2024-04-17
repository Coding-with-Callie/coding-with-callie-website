import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumni } from './entities/alumni.entity';
import { AlumniService } from './alumni.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alumni])],
  providers: [AlumniService],
  exports: [AlumniService],
})
export class AlumniModule {}
