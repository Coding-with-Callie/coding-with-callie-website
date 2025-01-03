import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { PageService } from './pages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
