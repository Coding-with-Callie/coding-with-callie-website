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

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async changeName(id: number, name: string) {
    const userToUpdate = await this.findOneById(id);
    userToUpdate.name = name;
    return await this.usersRepository.save(userToUpdate);
  }

  async changeUsername(id: number, username: string) {
    const userToUpdate = await this.findOneById(id);
    userToUpdate.username = username;
    return await this.usersRepository.save(userToUpdate);
  }

  async changeEmail(id: number, email: string) {
    const userToUpdate = await this.findOneById(id);
    userToUpdate.email = email;
    return await this.usersRepository.save(userToUpdate);
  }

  async changeAccountDetail(id: number, value: string, field: string) {
    const userToUpdate = await this.findOneById(id);
    userToUpdate[field] = value;
    return await this.usersRepository.save(userToUpdate);
  }
}
