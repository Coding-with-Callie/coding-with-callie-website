import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checklist } from './entities/checklist.entity';
import { ChecklistService } from './checklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Checklist])],
  providers: [ChecklistService],
  exports: [ChecklistService],
})
export class ChecklistModule {}
