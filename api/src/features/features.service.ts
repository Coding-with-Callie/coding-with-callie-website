import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './entities/feature.entity';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private featuresRepository: Repository<Feature>,
    private projectsService: ProjectsService,
  ) {}

  async getProjectFeatures(id: number) {
    return await this.featuresRepository.find({
      where: { project: { id } },
      relations: ['userStories'],
    });
  }

  async createFeature(name: string, description: string, projectId: number) {
    await this.featuresRepository.save({
      name,
      description,
      project: {
        id: projectId,
      },
    });
    return await this.projectsService.getProjectById(projectId);
  }

  async updateFeature(field: string, value: string, id: number) {
    const featureToUpdate = await this.featuresRepository.findOne({
      where: {
        id,
      },
      relations: ['project'],
    });

    featureToUpdate[field] = value;
    const updatedFeature = await this.featuresRepository.save(featureToUpdate);

    return await this.projectsService.getProjectById(updatedFeature.project.id);
  }

  async deleteFeature(id: number) {
    const featureToDelete = await this.featuresRepository.findOne({
      where: {
        id,
      },
      relations: ['project'],
    });

    await this.featuresRepository.delete(featureToDelete);

    return this.projectsService.getProjectById(featureToDelete.project.id);
  }
}
