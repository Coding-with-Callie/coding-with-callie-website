import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async createUser(user) {
    return await this.usersRepository.save({ ...user, role: 'user' });
  }

  async findOne(username: string) {
    return await this.usersRepository.findOne({ where: { username } });
  }
}
