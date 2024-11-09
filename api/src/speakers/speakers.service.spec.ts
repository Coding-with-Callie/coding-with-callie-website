import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SpeakersService } from './speakers.service';
import { Speaker } from './entities/speaker.entity';
import { FileUploadService } from '../file_upload/file_upload.service';

describe('SpeakersService', () => {
  let service: SpeakersService;

  const mockSpeakersRepository = {
    find: jest.fn(),
  };

  const mockFileUploadService = {
    uploadFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeakersService,
        {
          provide: getRepositoryToken(Speaker),
          useValue: mockSpeakersRepository,
        },
        {
          provide: FileUploadService,
          useValue: mockFileUploadService,
        },
      ],
    }).compile();

    service = module.get<SpeakersService>(SpeakersService);
    jest.clearAllMocks(); // Clear mock calls from previous tests
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return speakers', async () => {
    const speakers = [
      {
        name: 'Test Speaker',
        date: '2022-01-01',
        bioText: ['Test bio'],
        sessionText: ['Test session'],
        websiteUrl: 'https://example.com',
        photoUrl: 'https://example.com/photo.jpg',
      },
      {
        name: 'Test Speaker 2',
        date: '3037-01-02',
        bioText: ['Test bio 2'],
        sessionText: ['Test session 2'],
        websiteUrl: 'https://example.com/2',
        photoUrl: 'https://example.com/photo2.jpg',
      },
    ];
    mockSpeakersRepository.find.mockReturnValue(speakers);

    expect(await service.getSpeakers()).toEqual({
      upcomingSpeakers: [speakers[1]],
      pastSpeakers: [speakers[0]],
    });
    expect(mockSpeakersRepository.find).toHaveBeenCalledTimes(1);
  });
});
