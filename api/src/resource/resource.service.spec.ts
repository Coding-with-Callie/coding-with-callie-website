import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from './resource.service';
import { Resource } from './entities/resource.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileUploadService } from '../file_upload/file_upload.service';

describe('ResourceService', () => {
  let service: ResourceService;

  const highestOrderResource = {
    id: 1,
    heading: 'Heading 1',
    bodyText: 'Body text 1',
    imageUrl: 'image1url.com',
    buttonText: 'button 1 text',
    linkUrl: 'linkurl1.com',
    target: true,
    order: 1,
  };

  const mockQueryBuilder = {
    orderBy: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockResolvedValue(highestOrderResource),
  };

  const mockResourceRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
  };

  const mockFileUploadService = {
    uploadFile: jest.fn().mockResolvedValue('newimageurl.com'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourceService,
        {
          provide: getRepositoryToken(Resource),
          useValue: mockResourceRepository,
        },
        {
          provide: FileUploadService,
          useValue: mockFileUploadService,
        },
      ],
    }).compile();

    service = module.get<ResourceService>(ResourceService);
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all resources', async () => {
    const resources = [
      {
        id: 1,
        heading: 'Heading',
        bodyText: 'Body text',
        imageUrl: 'imageurl.com',
        buttonText: 'button text',
        linkUrl: 'linkurl.com',
        target: true,
        order: 2,
      },
    ];
    mockResourceRepository.find.mockReturnValue(resources);
    const result = await service.getResources();
    expect(result).toEqual(resources);
    expect(mockResourceRepository.find).toHaveBeenCalled();
    expect(mockResourceRepository.find).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.find).toHaveBeenCalledWith({
      order: { order: 'ASC' },
    });
  });

  it('should create a resource', async () => {
    const resourceToCreate = {
      heading: 'Heading 2',
      bodyText: 'Body text 2',
      buttonText: 'button 2 text',
      linkUrl: 'linkurl2.com',
      target: true,
      order: 1,
    };

    const updatedHighestOrderResource: Resource = {
      id: 1,
      heading: 'Heading 1',
      bodyText: 'Body text 1',
      imageUrl: 'image1url.com',
      buttonText: 'button 1 text',
      linkUrl: 'linkurl1.com',
      target: true,
      order: 1,
    };

    const newResource: Resource = {
      id: 2,
      heading: 'Heading 2',
      bodyText: 'Body text 2',
      imageUrl: 'newimageurl.com',
      buttonText: 'button 2 text',
      linkUrl: 'linkurl2.com',
      target: true,
      order: 2,
    };

    const file = {} as Express.Multer.File;

    mockResourceRepository.find.mockReturnValue([
      updatedHighestOrderResource,
      newResource,
    ]);

    const result = await service.createResource(resourceToCreate, file);
    expect(result).toEqual([updatedHighestOrderResource, newResource]);
  });
});
