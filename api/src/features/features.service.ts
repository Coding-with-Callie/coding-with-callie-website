import { BadRequestException, Injectable } from '@nestjs/common';
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

  async createFeature(
    name: string,
    description: string,
    projectId: number,
    userId: number,
  ) {
    const isOwner = await this.projectsService.checkProjectOwnership(
      projectId,
      userId,
    );

    if (!isOwner) {
      throw new BadRequestException(
        'You cannot create a feature for that project',
      );
    }

    await this.featuresRepository.save({
      name,
      description,
      project: {
        id: projectId,
      },
    });
    return await this.projectsService.getProjectById(projectId);
  }

  async updateFeature(
    field: string,
    value: string,
    userId: number,
    featureId: number,
  ) {
    const featureToUpdate = await this.featuresRepository.findOne({
      where: {
        id: featureId,
        project: { user: { id: userId } },
      },
      relations: ['project'],
    });

    if (!featureToUpdate) {
      throw new BadRequestException('You cannot edit that feature');
    }

    featureToUpdate[field] = value;
    const updatedFeature = await this.featuresRepository.save(featureToUpdate);

    return updatedFeature.project.id;
  }

  async deleteFeature(featureId: number, userId: number) {
    const featureToDelete = await this.featuresRepository.findOne({
      where: {
        id: featureId,
        project: { user: { id: userId } },
      },
      relations: ['project'],
    });

    if (featureToDelete) {
      await this.featuresRepository.delete(featureToDelete);

      return featureToDelete.project.id;
    } else {
      throw new BadRequestException('You cannot delete that feature');
    }
  }
}
