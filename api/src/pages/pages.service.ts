import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
  ) {}
  async createPage(page: any, userId: number) {
    await this.pageRepository.save({ ...page, user: { id: userId } });
    return { message: 'Page created successfully.' };
  }

  async getPages() {
    return await this.pageRepository.find({
      relations: ['sections'],
    });
  }

  async getPageBySectionId(sectionId: number) {
    // Find the page id that the section belongs to
    const pageId = (
      await this.pageRepository
        .createQueryBuilder('page')
        .leftJoin('page.sections', 'section')
        .where('section.id = :sectionId', { sectionId })
        .getOne()
    ).id;

    // Return the page
    return await this.pageRepository.findOne({
      where: { id: pageId },
      relations: ['sections'],
    });
  }
}
