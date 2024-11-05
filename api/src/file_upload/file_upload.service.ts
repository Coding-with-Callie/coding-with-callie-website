import { Injectable } from '@nestjs/common';
import { Upload } from '@aws-sdk/lib-storage';
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

    const response = await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );

    return response.Location;
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: ObjectCannedACL.public_read_write,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-1',
      },
    };

    try {
      const s3Response = await new Upload({
        client: this.s3,
        params,
      }).done();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
