import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import * as AWS from 'aws-sdk';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async createUser(user) {
    return await this.usersRepository.save({ ...user, role: 'user' });
  }

  async deleteUser(id) {
    const userToDelete = await this.findOneById(id);
    return await this.usersRepository.remove(userToDelete);
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository
      .createQueryBuilder()
      .where('LOWER(username) = LOWER(:username)', {
        username: username,
      })
      .getOne();
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: [
        'submissions',
        'submissions.feedback',
        'feedback',
        'feedback.submission',
        'cart',
        'cart.workshops',
        'workshops',
      ],
    });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository
      .createQueryBuilder()
      .where('LOWER(email) = LOWER(:email)', {
        email: email,
      })
      .getOne();
  }

  async changeAccountDetail(userToUpdate, field, value) {
    userToUpdate[field] = value;

    return await this.usersRepository.save(userToUpdate);
  }

  AWS_S3_BUCKET = 'coding-with-callie';
  s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  async uploadFile(id, file) {
    const { originalname } = file;

    const response = await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );

    const user = await this.findOneById(id);

    return await this.changeAccountDetail(user, 'photo', response.Location);
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  async findAllUsers() {
    return await this.usersRepository.find({
      relations: [
        'submissions',
        'submissions.feedback',
        'feedback',
        'feedback.submission',
      ],
    });
  }
}
