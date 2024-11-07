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

  async deleteUser(id: number) {
    const userToDelete = await this.findOneById(id);
    return await this.usersRepository.remove(userToDelete);
  }

  async checkIfUsernameExists(username: string) {
    const user = await this.findOneByUsername(username);
    return user ? true : false;
  }

  async checkIfEmailExists(email: string) {
    const user = await this.findOneByEmail(email);
    return user ? true : false;
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

  async findAllUsers() {
    return await this.usersRepository.find({});
  }
}
