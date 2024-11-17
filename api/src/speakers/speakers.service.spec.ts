import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SpeakersService } from './speakers.service';
import { Speaker } from './entities/speaker.entity';
import { FileUploadService } from '../file_upload/file_upload.service';

describe('SpeakersService', () => {
  let service: SpeakersService;

  const mockSpeakersRepository = {
    find: jest.fn(),
    save: jest.fn(),
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

  it('should return an object with upcoming and past speakers sorted by date', async () => {
    const speakers = [
      {
        name: 'Past Speaker 1',
        date: '2021-01-01',
      },
      {
        name: 'Past Speaker 2',
        date: '2021-02-01',
      },
      {
        name: 'Upcoming Speaker 1',
        date: '3037-01-01',
      },
      {
        name: 'Upcoming Speaker 2',
        date: '3037-02-01',
      },
    ];
    mockSpeakersRepository.find.mockReturnValue(speakers);

    expect(await service.getSpeakers()).toEqual({
      upcomingSpeakers: [speakers[2], speakers[3]],
      pastSpeakers: [speakers[1], speakers[0]],
    });
    expect(mockSpeakersRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should create a speaker and return a success message', async () => {
    const speaker = {
      name: 'Test Speaker',
      date: '2022-01-01',
      bioText: 'This is the bio test.\nIt has multiple lines.',
      sessionText: 'This is the session test.\nIt has multiple lines.',
      websiteUrl: 'https://example.com',
    };

    const file = {} as Express.Multer.File;

    const speakerToSave = {
      name: 'Test Speaker',
      date: '2022-01-01',
      bioText: ['This is the bio test.', 'It has multiple lines.'],
      sessionText: ['This is the session test.', 'It has multiple lines.'],
      websiteUrl: 'https://example.com',
      photoUrl: 'https://example.com/photo.jpg',
    };

    mockFileUploadService.uploadFile.mockResolvedValue(speakerToSave.photoUrl);

    const result = await service.createSpeaker(speaker, file);
    expect(result).toEqual({ message: 'Speaker created successfully' });
    expect(mockFileUploadService.uploadFile).toHaveBeenCalledTimes(1);
    expect(mockFileUploadService.uploadFile).toHaveBeenCalledWith(file);
    expect(mockSpeakersRepository.save).toHaveBeenCalledTimes(1);
    expect(mockSpeakersRepository.save).toHaveBeenCalledWith(speakerToSave);
  });
});
