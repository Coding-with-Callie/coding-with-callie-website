import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getUserStoryTasks(id: number) {
    return await this.tasksRepository.find({
      where: { userStory: { id } },
    });
  }

  async createTask(name: string, userStoryId: number) {
    await this.tasksRepository.save({
      name,
      userStory: {
        id: userStoryId,
      },
    });
    return { message: 'Task created' };
  }

  async updateTask(field: string, value: string, id: number) {
    const taskToUpdate = await this.tasksRepository.findOne({
      where: { id },
      relations: ['userStory'],
    });

    if (!taskToUpdate) {
      throw new BadRequestException('Task not found');
    }

    taskToUpdate[field] = value;
    await this.tasksRepository.save(taskToUpdate);

    return { message: 'Task updated' };
  }

  async deleteTask(id: number) {
    const taskToDelete = await this.tasksRepository.findOneBy({ id });

    if (!taskToDelete) {
      throw new BadRequestException('Task not found');
    }

    await this.tasksRepository.delete(taskToDelete);
    return { message: 'Task deleted' };
  }
}
