import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileUploadService } from '../file_upload/file_upload.service';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    private fileUploadService: FileUploadService,
  ) {}
  async updateSection(id: number, data: any, file: Express.Multer.File) {
    // Get the section to update
    const sectionToUpdate = await this.sectionRepository.findOneBy({ id });

    // Upload the file to S3 and set the imageUrl property, if a file was uploaded
    if (file) {
      data.imageUrl = await this.fileUploadService.uploadFile(file);
    } else {
      data.imageUrl = sectionToUpdate.data.imageUrl;
    }

    // Edit necessary properties of the section data
    if (sectionToUpdate.type === 'resource') {
      data.target = data.target === 'true';
      data.bodyText = data.bodyText
        .replace(/\r\n/g, '\n') // Replace \r\n with \n
        .split(/\n+/) // Split at one or more newlines
        .map((item: string) => item.trim()) // Trim whitespace from each item
        .filter((item: string) => item.length > 0); // Remove empty items
    }

    sectionToUpdate.data = data;

    // Save the updated section
    await this.sectionRepository.save(sectionToUpdate);

    // Return a success message
    return { message: 'Section updated successfully' };
  }
}
