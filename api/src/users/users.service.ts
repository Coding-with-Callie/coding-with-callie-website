import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { NewUserDto } from 'src/app.controller';
import { hashPassword } from '../helpers/helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async createUser(user: NewUserDto) {
    return await this.usersRepository.save({ ...user, role: 'user' });
  }

  async softDeleteUser(id: number) {
    const userToDelete = await this.usersRepository.findOneBy({ id });

    if (!userToDelete) {
      return null;
    }

    userToDelete.name = 'deleted';
    userToDelete.username = `deleted-${Date.now()}`;
    userToDelete.email = 'deleted';
    userToDelete.password = 'deleted';

    await this.usersRepository.save(userToDelete);
    return 'user deleted';
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

  async getFrontendFriendlyUser(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'username', 'role', 'photo'],
    });
  }

  async getUser(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository
      .createQueryBuilder()
      .where('LOWER(email) = LOWER(:email)', {
        email: email,
      })
      .getOne();
  }

  async changeAccountDetail(id: number, field: string, value: string) {
    const userToUpdate = await this.usersRepository.findOneBy({ id });

    if (field === 'password') {
      value = await hashPassword(value);
    }

    const user = await this.usersRepository.save({
      ...userToUpdate,
      [field]: value,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      photo: user.photo,
    };
  }

  async findAllUsers() {
    return await this.usersRepository.find({});
  }
}
