import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { PagesService } from './pages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}
