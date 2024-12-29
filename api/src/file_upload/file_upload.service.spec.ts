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
    jest.clearAllMocks(); // Clear mock calls from previous tests
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an S3 url if S3 putObject is succesful', async () => {
    const file = {
      buffer: Buffer.from('file content'),
      originalname: 'file.txt',
      mimetype: 'text/plain',
    } as Express.Multer.File;

    const response = await service.uploadFile(file);
    expect(response).toEqual(
      'https://coding-with-callie.s3.amazonaws.com/file.txt',
    );
    expect(s3Mock).toHaveReceivedCommandTimes(PutObjectCommand, 1);
    expect(s3Mock).toHaveReceivedCommandWith(PutObjectCommand, {
      Bucket: 'coding-with-callie',
      Key: 'file.txt',
      Body: file.buffer,
      ACL: 'public-read-write',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    });
  });

  it('should return an error if S3 putObject fails', async () => {
    s3Mock.on(PutObjectCommand).rejects('Error uploading file');

    // Suppress console.error output
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const file = {
      buffer: Buffer.from('file content'),
      originalname: 'file.txt',
      mimetype: 'text/plain',
    } as Express.Multer.File;

    await service.uploadFile(file);
    expect(console.error).toHaveBeenCalledWith(
      'S3 Error:',
      'Error uploading file',
    );
  });
});
