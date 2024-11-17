import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SpeakersService } from './speakers.service';
import { Speaker } from './entities/speaker.entity';
import { FileUploadService } from '../file_upload/file_upload.service';
import { SpeakerDTO } from '../admin/admin.controller';

describe('SpeakersService', () => {
  let service: SpeakersService;

  const mockSpeakersRepository = {
    find: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
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

  it('should find a speaker by id', async () => {
    const id = 1;
    const speaker = {
      id,
      name: 'Test Speaker',
      date: '2022-01-01',
      bioText: 'This is the bio test.\nIt has multiple lines.',
      sessionText: 'This is the session test.\nIt has multiple lines.',
      websiteUrl: 'https://example.com',
    };
    mockSpeakersRepository.findOne.mockResolvedValue(speaker);

    expect(await service.findOneById(id)).toEqual(speaker);
    expect(mockSpeakersRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSpeakersRepository.findOne).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('should delete a speaker and return a success message if speaker exists', async () => {
    const id = 1;

    mockSpeakersRepository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.deleteSpeaker(id);
    expect(result).toEqual({ message: 'Speaker deleted successfully' });
    expect(mockSpeakersRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockSpeakersRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error if speaker does not exist when deleting', async () => {
    const id = 1;

    mockSpeakersRepository.delete.mockResolvedValue({ affected: 0 });

    await expect(service.deleteSpeaker(id)).rejects.toThrow(
      'Speaker not found',
    );
    expect(mockSpeakersRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockSpeakersRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should update a speaker with a new photo and return a success message', async () => {
    const id = 1;
    const speaker: SpeakerDTO = {
      name: 'Test Speaker EDITED',
      date: '2022-01-01',
      bioText: 'This is the bio test.\nIt has multiple lines.',
      sessionText: 'This is the session test.\nIt has multiple lines.',
      websiteUrl: 'https://example.com',
    };
    const file = {} as Express.Multer.File;

    const speakerToUpdate = {
      id,
      name: 'Test Speaker',
      date: '2022-01-01',
      bioText: ['This is the bio test.', 'It has multiple lines.'],
      sessionText: ['This is the session test.', 'It has multiple lines.'],
      websiteUrl: 'https://example.com',
      photoUrl: 'https://example.com/photo.jpg',
    };

    const updatedSpeaker = {
      id,
      name: 'Test Speaker EDITED',
      date: '2022-01-01',
      bioText: ['This is the bio test.', 'It has multiple lines.'],
      sessionText: ['This is the session test.', 'It has multiple lines.'],
      websiteUrl: 'https://example.com',
      photoUrl: 'https://example.com/photoEDITED.jpg',
    };

    mockSpeakersRepository.findOne.mockResolvedValue(speakerToUpdate);
    mockFileUploadService.uploadFile.mockResolvedValue(updatedSpeaker.photoUrl);

    const result = await service.updateSpeaker(id, speaker, file);
    expect(result).toEqual({ message: 'Speaker updated successfully' });
    expect(mockSpeakersRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSpeakersRepository.findOne).toHaveBeenCalledWith({
      where: { id },
    });
    expect(mockFileUploadService.uploadFile).toHaveBeenCalledTimes(1);
    expect(mockFileUploadService.uploadFile).toHaveBeenCalledWith(file);
    expect(mockSpeakersRepository.save).toHaveBeenCalledTimes(1);
    expect(mockSpeakersRepository.save).toHaveBeenCalledWith(updatedSpeaker);
  });

  it('should update a speaker without a new photo and return a success message', async () => {
    const id = 1;
    const speaker: SpeakerDTO = {
      name: 'Test Speaker',
      date: '2022-01-01',
      bioText: 'This is the EDITED bio test.\nIt has multiple lines.',
      sessionText: 'This is the session test.\nIt has multiple lines.',
      websiteUrl: 'https://example.com',
    };
    const file = null;

    const speakerToUpdate = {
      id,
      name: 'Test Speaker',
      date: '2022-01-01',
      bioText: ['This is the bio test.', 'It has multiple lines.'],
      sessionText: ['This is the session test.', 'It has multiple lines.'],
      websiteUrl: 'https://example.com',
      photoUrl: 'https://example.com/photo.jpg',
    };

    const updatedSpeaker = {
      id,
      name: 'Test Speaker',
      date: '2022-01-01',
      bioText: ['This is the EDITED bio test.', 'It has multiple lines.'],
      sessionText: ['This is the session test.', 'It has multiple lines.'],
      websiteUrl: 'https://example.com',
      photoUrl: 'https://example.com/photo.jpg',
    };

    mockSpeakersRepository.findOne.mockResolvedValue(speakerToUpdate);

    const result = await service.updateSpeaker(id, speaker, file);
    expect(result).toEqual({ message: 'Speaker updated successfully' });
    expect(mockSpeakersRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSpeakersRepository.findOne).toHaveBeenCalledWith({
      where: { id },
    });
    expect(mockFileUploadService.uploadFile).toHaveBeenCalledTimes(0);
    expect(mockSpeakersRepository.save).toHaveBeenCalledTimes(1);
    expect(mockSpeakersRepository.save).toHaveBeenCalledWith(updatedSpeaker);
  });
});
