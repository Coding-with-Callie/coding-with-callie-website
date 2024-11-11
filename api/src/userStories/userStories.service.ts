import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserStory } from './entities/userStory.entity';

@Injectable()
export class UserStoriesService {
  constructor(
    @InjectRepository(UserStory)
    private userStoriesRepository: Repository<UserStory>,
  ) {}

  async getFeatureUserStories(id: number) {
    return await this.userStoriesRepository.find({
      where: { feature: { id } },
    });
  }

  async createUserStory(name: string, description: string, featureId: number) {
    await this.userStoriesRepository.save({
      name,
      description,
      feature: {
        id: featureId,
      },
    });

    return await this.getFeatureUserStories(featureId);
  }

  async getUserStoryById(id: number) {
    return await this.userStoriesRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async getUserStoryStatusById(id: number) {
    const userStory = await this.getUserStoryById(id);

    const tasks = userStory.tasks;
    const taskCount = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'Done!');
    const completedTasksLength = completedTasks.length;

    return `${completedTasksLength}/${taskCount}`;
  }

  async updateUserStory(field: string, value: string, userStoryId: number) {
    const storyToUpdate = await this.userStoriesRepository.findOne({
      where: {
        id: userStoryId,
      },
      relations: ['feature', 'feature.project'],
    });

    if (!storyToUpdate) {
      throw new NotFoundException('User story not found');
    }

    storyToUpdate[field] = value;
    await this.userStoriesRepository.save(storyToUpdate);
    return 'User story updated';
  }

  async deleteUserStory(userStoryId: number, userId: number) {
    const storyToDelete = await this.userStoriesRepository.findOne({
      where: {
        id: userStoryId,
        feature: { project: { user: { id: userId } } },
      },
      relations: ['feature', 'feature.project'],
    });

    if (storyToDelete) {
      await this.userStoriesRepository.delete(storyToDelete);

      return storyToDelete.feature.project.id;
    } else {
      throw new BadRequestException('You cannot delete that user story');
    }
  }
}
