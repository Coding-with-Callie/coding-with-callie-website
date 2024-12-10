import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './entities/feature.entity';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private featuresRepository: Repository<Feature>,
  ) {}

  async checkIfFeatureExistsInProject(id: number, projectId: number) {
    const feature = await this.featuresRepository.findOne({
      where: { id, project: { id: projectId } },
    });

    if (!feature) {
      return false;
    }

    return true;
  }

  async createFeature(name: string, description: string, projectId: number) {
    return await this.featuresRepository.save({
      name,
      description,
      project: {
        id: projectId,
      },
    });
  }

  async updateFeature(field: string, value: string, id: number) {
    const featureToUpdate = await this.featuresRepository.findOne({
      where: {
        id,
      },
      relations: ['project'],
    });

    if (!featureToUpdate) {
      throw new NotFoundException('Feature not found');
    }

    featureToUpdate[field] = value;
    return await this.featuresRepository.save(featureToUpdate);
  }

  async deleteFeature(id: number) {
    const featureToDelete = await this.featuresRepository.findOne({
      where: {
        id,
      },
      relations: ['project'],
    });

    if (!featureToDelete) {
      throw new NotFoundException('Feature not found');
    }

    return await this.featuresRepository.delete(featureToDelete);
  }
}
