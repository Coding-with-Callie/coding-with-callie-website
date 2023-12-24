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

  async deleteUser(id) {
    const userToDelete = await this.findOneById(id);
    return await this.usersRepository.remove(userToDelete);
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async changeAccountDetail(id: number, value: string, field: string) {
    const userToUpdate = await this.findOneById(id);
    userToUpdate[field] = value;
    return await this.usersRepository.save(userToUpdate);
  }
}
