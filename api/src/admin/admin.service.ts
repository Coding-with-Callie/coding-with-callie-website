import { Injectable } from '@nestjs/common';
import { SectionsService } from '../sections/sections.service';
import { PagesService } from '../pages/pages.service';

@Injectable()
export class AdminService {
  constructor(
    private sectionsService: SectionsService,
    private pagesService: PagesService,
  ) {}
  async createPageAndReturnUpdatedPages(page: any, userId: number) {
    // Create the page
    await this.pagesService.createPage(page, userId);

    // Return the updated pages
    return await this.pagesService.getPages();
  }

  async deleteSectionAndReturnUpdatedPage(id: number) {
    // Get the page that the section belongs to
    const page = await this.pagesService.getPageBySectionId(id);

    // Delete the section
    await this.sectionsService.deleteSection(id);

    // Delete the section from the page
    page.sections = page.sections.filter((section) => section.id !== id);

    // Return the updated page
    return page;
  }

  async updateSectionAndReturnUpdatedPageSections(
    id: number,
    data: any,
    file: Express.Multer.File,
  ) {
    // Update the section
    await this.sectionsService.updateSection(id, data, file);

    // Return the updated page
    return await this.pagesService.getPageBySectionId(id);
  }
}
