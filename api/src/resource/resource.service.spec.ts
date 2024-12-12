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
    findOneBy: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
    delete: jest.fn(),
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

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
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
      target: 'true',
      order: 1,
    };

    const highestOrderResource: Resource = {
      id: 1,
      heading: 'Heading 1',
      bodyText: 'Body text 1',
      imageUrl: 'image1url.com',
      buttonText: 'button 1 text',
      linkUrl: 'linkurl1.com',
      target: true,
      order: 1,
    };

    const newResource = {
      id: undefined,
      heading: 'Heading 2',
      bodyText: ['Body text 2'],
      imageUrl: 'newimageurl.com',
      buttonText: 'button 2 text',
      linkUrl: 'linkurl2.com',
      target: true,
      order: 2,
    };

    const file = {} as Express.Multer.File;

    mockQueryBuilder.getOne.mockResolvedValue(highestOrderResource);

    const result = await service.createResource(resourceToCreate, file);
    expect(result).toEqual({ message: 'Resource created successfully' });
    expect(mockResourceRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.createQueryBuilder).toHaveBeenCalledWith(
      'resource',
    );
    expect(mockQueryBuilder.orderBy).toHaveBeenCalledTimes(1);
    expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
      'resource.order',
      'DESC',
    );
    expect(mockQueryBuilder.getOne).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.save).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.save).toHaveBeenCalledWith(newResource);
  });

  it('should update the order of a resource so it moves up', async () => {
    const id = 1;
    const direction = 'down';

    const resource = {
      id: 1,
      heading: 'Heading 1',
      bodyText: 'Body text 1',
      imageUrl: 'image1url.com',
      buttonText: 'button 1 text',
      linkUrl: 'linkurl1.com',
      target: true,
      order: 1,
    };

    const resourceToSwap = {
      id: 2,
      heading: 'Heading 2',
      bodyText: 'Body text 2',
      imageUrl: 'image2url.com',
      buttonText: 'button 2 text',
      linkUrl: 'linkurl2.com',
      target: true,
      order: 2,
    };

    mockResourceRepository.findOneBy.mockResolvedValueOnce(resource);
    mockResourceRepository.findOneBy.mockResolvedValueOnce(resourceToSwap);

    const resources = [
      {
        id: 1,
        heading: 'Heading 1',
        bodyText: 'Body text 1',
        imageUrl: 'image1url.com',
        buttonText: 'button 1 text',
        linkUrl: 'linkurl1.com',
        target: true,
        order: 2,
      },
      {
        id: 2,
        heading: 'Heading 2',
        bodyText: 'Body text 2',
        imageUrl: 'image2url.com',
        buttonText: 'button 2 text',
        linkUrl: 'linkurl2.com',
        target: true,
        order: 1,
      },
    ];

    mockResourceRepository.find.mockResolvedValue(resources);

    const result = await service.updateOrder(id, direction);
    expect(result).toEqual({ message: 'Resource order updated successfully' });
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledTimes(2);
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledWith({ order: 2 });
    expect(mockResourceRepository.save).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.save).toHaveBeenCalledWith(resources);
    expect(resource.order).toBe(2);
    expect(resourceToSwap.order).toBe(1);
  });

  it('should update the order of a resource so it moves down', async () => {
    const id = 2;
    const direction = 'up';

    const resource = {
      id: 2,
      heading: 'Heading 2',
      bodyText: 'Body text 2',
      imageUrl: 'image2url.com',
      buttonText: 'button 2 text',
      linkUrl: 'linkurl2.com',
      target: true,
      order: 2,
    };

    const resourceToSwap = {
      id: 1,
      heading: 'Heading 1',
      bodyText: 'Body text 1',
      imageUrl: 'image1url.com',
      buttonText: 'button 1 text',
      linkUrl: 'linkurl1.com',
      target: true,
      order: 1,
    };

    mockResourceRepository.findOneBy.mockResolvedValueOnce(resource);
    mockResourceRepository.findOneBy.mockResolvedValueOnce(resourceToSwap);

    const resources = [
      {
        id: 2,
        heading: 'Heading 2',
        bodyText: 'Body text 2',
        imageUrl: 'image2url.com',
        buttonText: 'button 2 text',
        linkUrl: 'linkurl2.com',
        target: true,
        order: 1,
      },
      {
        id: 1,
        heading: 'Heading 1',
        bodyText: 'Body text 1',
        imageUrl: 'image1url.com',
        buttonText: 'button 1 text',
        linkUrl: 'linkurl1.com',
        target: true,
        order: 2,
      },
    ];

    mockResourceRepository.find.mockResolvedValue(resources);

    const result = await service.updateOrder(id, direction);
    expect(result).toEqual({ message: 'Resource order updated successfully' });
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledTimes(2);
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledWith({ id: 2 });
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledWith({ order: 1 });
    expect(mockResourceRepository.save).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.save).toHaveBeenCalledWith(resources);
    expect(resource.order).toBe(1);
    expect(resourceToSwap.order).toBe(2);
  });

  it('should update all resource fields and an uploaded file', async () => {
    const id = 1;
    const resource = {
      heading: 'Heading 1 EDITED',
      bodyText: 'Body text 1 EDITED',
      buttonText: 'button 1 text EDITED',
      linkUrl: 'editedlinkurl.com',
      target: 'false',
    };
    const file = {} as Express.Multer.File;

    const resourceToUpdate = {
      id: 1,
      heading: 'Heading 1',
      bodyText: 'Body text 1',
      imageUrl: 'image1url.com',
      buttonText: 'button 1 text',
      linkUrl: 'linkurl.com',
      target: true,
      order: 1,
    };

    const updatedResource = {
      id: 1,
      heading: 'Heading 1 EDITED',
      bodyText: ['Body text 1 EDITED'],
      imageUrl: 'newimageurl.com',
      buttonText: 'button 1 text EDITED',
      linkUrl: 'editedlinkurl.com',
      target: false,
      order: 1,
    };

    mockFileUploadService.uploadFile.mockResolvedValue('newimageurl.com');
    mockResourceRepository.findOneBy.mockResolvedValue(resourceToUpdate);

    const result = await service.updateResource(id, resource, file);
    expect(result).toEqual({ message: 'Resource updated successfully' });
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledWith({ id });
    expect(mockFileUploadService.uploadFile).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.save).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.save).toHaveBeenCalledWith(updatedResource);
  });

  it('should update all resource fields without an uploaded file', async () => {
    const id = 1;
    const resource = {
      heading: 'Heading 1 EDITED',
      bodyText: 'Body text 1 EDITED',
      buttonText: 'button 1 text EDITED',
      linkUrl: 'linkurl1edited.com',
      target: 'false',
    };
    const file = null;

    const resourceToUpdate = {
      id: 1,
      heading: 'Heading 1',
      bodyText: 'Body text 1',
      imageUrl: 'image1url.com',
      buttonText: 'button 1 text',
      linkUrl: 'linkurl1.com',
      target: true,
      order: 1,
    };

    const updatedResource = {
      id: 1,
      heading: 'Heading 1 EDITED',
      bodyText: ['Body text 1 EDITED'],
      imageUrl: 'image1url.com',
      buttonText: 'button 1 text EDITED',
      linkUrl: 'linkurl1edited.com',
      target: false,
      order: 1,
    };

    mockResourceRepository.findOneBy.mockResolvedValue(resourceToUpdate);

    const result = await service.updateResource(id, resource, file);
    expect(result).toEqual({ message: 'Resource updated successfully' });
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledWith({ id });
    expect(mockFileUploadService.uploadFile).toHaveBeenCalledTimes(0);
    expect(mockResourceRepository.save).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.save).toHaveBeenCalledWith(updatedResource);
  });

  it('should delete a resource', async () => {
    const id = 1;

    const resourceToDelete = {
      id: 1,
      heading: 'Heading 1',
      bodyText: 'Body text 1',
      imageUrl: 'image1url.com',
      buttonText: 'button 1 text',
      linkUrl: 'linkurl1.com',
      target: true,
      order: 1,
    };

    const resources = [
      {
        id: 2,
        heading: 'Heading 2',
        bodyText: 'Body text 2',
        imageUrl: 'image2url.com',
        buttonText: 'button 2 text',
        linkUrl: 'linkurl2.com',
        target: true,
        order: 2,
      },
    ];

    const updatedResources = [
      {
        id: 2,
        heading: 'Heading 2',
        bodyText: 'Body text 2',
        imageUrl: 'image2url.com',
        buttonText: 'button 2 text',
        linkUrl: 'linkurl2.com',
        target: true,
        order: 1,
      },
    ];

    mockResourceRepository.findOneBy.mockResolvedValue(resourceToDelete);
    mockResourceRepository.find.mockResolvedValueOnce(resources);
    mockResourceRepository.save.mockResolvedValue(updatedResources);
    mockResourceRepository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.deleteResource(id);
    expect(result).toEqual({ message: 'Resource deleted successfully' });
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.findOneBy).toHaveBeenCalledWith({ id });
    expect(mockResourceRepository.save).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.save).toHaveBeenCalledWith(updatedResources);
    expect(mockResourceRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockResourceRepository.delete).toHaveBeenCalledWith(id);
  });
});
