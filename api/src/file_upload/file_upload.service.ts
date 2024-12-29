import { Injectable } from '@nestjs/common';
import { ObjectCannedACL, S3 } from '@aws-sdk/client-s3';

@Injectable()
export class FileUploadService {
  private readonly AWS_S3_BUCKET: string;
  private readonly s3: S3;

  constructor() {
    this.AWS_S3_BUCKET = 'coding-with-callie';
    this.s3 = new S3({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const { originalname } = file;

    await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );

    return `https://${this.AWS_S3_BUCKET}.s3.amazonaws.com/${originalname}`;
  }

  async s3_upload(
    buffer: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: buffer,
      ACL: ObjectCannedACL.public_read_write,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-1',
      },
    };

    try {
      await this.s3.putObject(params);
    } catch (error) {
      console.error('S3 Error:', error.message);
    }
  }
}
