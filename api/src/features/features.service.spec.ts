import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeaturesService } from './features.service';
import { Feature } from './entities/feature.entity';

describe('FeaturesService', () => {
  let service: FeaturesService;

  const mockFeatureRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeaturesService,
        {
          provide: getRepositoryToken(Feature),
          useValue: mockFeatureRepository,
        },
      ],
    }).compile();

    service = module.get<FeaturesService>(FeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true if features repository findOne method finds a feature', async () => {
    const featureId = 1;
    const projectId = 1;
    const feature = {} as Feature;

    mockFeatureRepository.findOne.mockReturnValue(feature);

    const result = await service.checkIfFeatureExistsInProject(
      featureId,
      projectId,
    );

    expect(result).toEqual(true);
    expect(mockFeatureRepository.findOne).toHaveBeenCalled();
    expect(mockFeatureRepository.findOne).toHaveBeenCalledWith({
      where: { id: featureId, project: { id: projectId } },
    });
  });

  it('should return false if features repository findOne method does not find a feature', async () => {
    const featureId = 1;
    const projectId = 1;

    mockFeatureRepository.findOne.mockReturnValue(undefined);

    const result = await service.checkIfFeatureExistsInProject(
      featureId,
      projectId,
    );

    expect(result).toEqual(false);
    expect(mockFeatureRepository.findOne).toHaveBeenCalled();
    expect(mockFeatureRepository.findOne).toHaveBeenCalledWith({
      where: { id: featureId, project: { id: projectId } },
    });
  });

  it('should call the features repository save method with the name, description, and project id', async () => {
    const name = 'Feature 1';
    const description = 'f1 description';
    const projectId = 1;

    mockFeatureRepository.save.mockReturnValue({});

    const result = await service.createFeature(name, description, projectId);

    expect(result).toEqual({});
    expect(mockFeatureRepository.save).toHaveBeenCalled();
    expect(mockFeatureRepository.save).toHaveBeenCalledWith({
      name,
      description,
      project: {
        id: projectId,
      },
    });
  });

  it('should call the features repository save method with the updated feature if the feature to update exists', async () => {
    const field = 'name';
    const value = 'Feature 4 - Edited';
    const featureId = 4;

    const featureToUpdate = {
      id: 4,
      name: 'Feature 4',
      description: 'f4 description',
      project: {
        id: 2,
      },
    } as Feature;

    mockFeatureRepository.findOne.mockReturnValue(featureToUpdate);
    mockFeatureRepository.save.mockReturnValue({});

    const result = await service.updateFeature(field, value, featureId);

    expect(result).toEqual({});
    expect(mockFeatureRepository.findOne).toHaveBeenCalled();
    expect(mockFeatureRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: featureId,
      },
      relations: ['project'],
    });
    expect(mockFeatureRepository.save).toHaveBeenCalled();
    expect(mockFeatureRepository.save).toHaveBeenCalledWith(featureToUpdate);
  });

  it('should throw an error if the feature to update does not exist', async () => {
    const field = 'name';
    const value = 'EDITED NAME';
    const featureId = 45;

    mockFeatureRepository.findOne.mockReturnValue(undefined);

    expect(async () => {
      await service.updateFeature(field, value, featureId);
    }).rejects.toThrow('Feature not found');
    expect(mockFeatureRepository.findOne).toHaveBeenCalled();
    expect(mockFeatureRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: featureId,
      },
      relations: ['project'],
    });
  });

  it('should call the features repository delete method if the feature to delete exists', async () => {
    const featureId = 4;

    const featureToDelete = {
      id: 4,
      name: 'Feature 4',
      description: 'f4 description',
      project: {
        id: 2,
      },
    } as Feature;

    mockFeatureRepository.findOne.mockReturnValue(featureToDelete);
    mockFeatureRepository.delete.mockReturnValue({ affected: 1 });

    const result = await service.deleteFeature(featureId);

    expect(result).toEqual({ affected: 1 });
    expect(mockFeatureRepository.findOne).toHaveBeenCalled();
    expect(mockFeatureRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: featureId,
      },
      relations: ['project'],
    });
    expect(mockFeatureRepository.delete).toHaveBeenCalled();
    expect(mockFeatureRepository.delete).toHaveBeenCalledWith(featureToDelete);
  });

  it('should throw an error if the feature to delete does not exist', async () => {
    const featureId = 45;

    mockFeatureRepository.findOne.mockReturnValue(undefined);

    expect(async () => {
      await service.deleteFeature(featureId);
    }).rejects.toThrow('Feature not found');
    expect(mockFeatureRepository.findOne).toHaveBeenCalled();
    expect(mockFeatureRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: featureId,
      },
      relations: ['project'],
    });
  });
});
