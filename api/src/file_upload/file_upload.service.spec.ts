import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadService } from './file_upload.service';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import 'aws-sdk-client-mock-jest';

describe('FileUploadService', () => {
  let service: FileUploadService;
  const s3Mock = mockClient(S3Client);

  beforeAll(() => {
    s3Mock.on(PutObjectCommand).resolves({ $metadata: {} });
  });

  afterAll(() => {
    s3Mock.reset();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadService],
    }).compile();

    service = module.get<FileUploadService>(FileUploadService);
    // jest.clearAllMocks(); // Clear mock calls from previous tests
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload a file', async () => {
    const file = {
      buffer: Buffer.from('file content'),
      originalname: 'file.txt',
      mimetype: 'text/plain',
    } as Express.Multer.File;

    const response = await service.uploadFile(file);
    expect(response).toEqual(
      'https://coding-with-callie.s3.amazonaws.com/file.txt',
    );
  });
});
