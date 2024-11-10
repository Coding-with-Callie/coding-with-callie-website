import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ReviewService } from '../review/review.service';
import { FeaturesService } from '../features/features.service';
import { ProjectsService } from '../projects/projects.service';
import { TasksService } from '../tasks/tasks.service';
import { UserStoriesService } from '../userStories/userStories.service';
import { FileUploadService } from '../file_upload/file_upload.service';
import { ReviewDTO } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private reviewService: ReviewService,
    private projectsService: ProjectsService,
    private featuresService: FeaturesService,
    private userStoriesService: UserStoriesService,
    private tasksService: TasksService,
    private fileUploadService: FileUploadService,
  ) {}
  async getUserProfile(id: number) {
    return await this.usersService.getFrontendFriendlyUser(id);
  }

  async changeAccountDetail(id: number, field: string, value: string) {
    return await this.usersService.changeAccountDetail(id, field, value);
  }

  async deleteUser(id: number) {
    return await this.usersService.softDeleteUser(id);
  }

  async uploadFile(file: Express.Multer.File) {
    return await this.fileUploadService.uploadFile(file);
  }

  async uploadProfileImage(id: number, file: Express.Multer.File) {
    const photoUrl = await this.uploadFile(file);
    return await this.usersService.changeAccountDetail(id, 'photo', photoUrl);
  }

  async submitReview(review: ReviewDTO) {
    return await this.reviewService.submitReview(review);
  }

  async getUserProjects(userId: number) {
    return await this.projectsService.getUserProjects(userId);
  }

  async getProject(userId: number, id: number) {
    return await this.projectsService.getProjectById(id, userId);
  }

  async createProject(name: string, description: string, userId: number) {
    return await this.projectsService.createProject(name, description, userId);
  }

  async updateProject(
    field: string,
    value: string,
    userId: number,
    projectId: number,
  ) {
    return await this.projectsService.updateProject(
      field,
      value,
      userId,
      projectId,
    );
  }

  async deleteProject(projectId: number, userId: number) {
    return await this.projectsService.deleteProject(projectId, userId);
  }

  async createFeature(
    name: string,
    description: string,
    projectId: number,
    userId: number,
  ) {
    return await this.featuresService.createFeature(
      name,
      description,
      projectId,
      userId,
    );
  }

  async updateFeature(
    field: string,
    value: string,
    userId: number,
    featureId: number,
  ) {
    const projectId = await this.featuresService.updateFeature(
      field,
      value,
      userId,
      featureId,
    );
    return await this.projectsService.getProjectById(projectId);
  }

  async deleteFeature(featureId: number, userId: number) {
    const projectId = await this.featuresService.deleteFeature(
      featureId,
      userId,
    );
    return await this.projectsService.getProjectById(projectId);
  }

  async createUserStory(
    name: string,
    description: string,
    userId: number,
    projectId: number,
    featureId: number,
  ) {
    const projects = await this.projectsService.getUserProjects(userId);
    const project = projects.find((project) => project.id === projectId);

    if (project) {
      const features = project.features;
      const feature = features.find((feature) => feature.id === featureId);

      if (feature) {
        await this.userStoriesService.createUserStory(
          name,
          description,
          featureId,
        );
        return await this.projectsService.getProjectById(projectId);
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async updateUserStory(
    field: string,
    value: string,
    userId: number,
    userStoryId: number,
  ) {
    const projectId = await this.userStoriesService.updateUserStory(
      field,
      value,
      userId,
      userStoryId,
    );
    return await this.projectsService.getProjectById(projectId);
  }

  async deleteUserStory(userStoryId: number, userId: number) {
    const projectId = await this.userStoriesService.deleteUserStory(
      userStoryId,
      userId,
    );
    return await this.projectsService.getProjectById(projectId);
  }

  async createTask(
    name: string,
    userId: number,
    projectId: number,
    featureId: number,
    userStoryId: number,
  ) {
    const projects = await this.projectsService.getUserProjects(userId);
    const project = projects.find((project) => project.id === projectId);

    if (project) {
      const features = project.features;
      const feature = features.find((feature) => feature.id === featureId);

      if (feature) {
        const userStories = feature.userStories;
        const userStory = userStories.find((story) => story.id === userStoryId);

        if (userStory) {
          await this.tasksService.createTask(name, userStoryId);
          return await this.projectsService.getProjectById(projectId);
        } else {
          throw new UnauthorizedException('Unauthorized');
        }
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async updateTask(
    field: string,
    value: string,
    userId: number,
    taskId: number,
  ): Promise<any> {
    const userStoryId = await this.tasksService.updateTask(
      field,
      value,
      userId,
      taskId,
    );
    return await this.userStoriesService.getUserStoryStatusById(userStoryId);
  }

  async deleteTask(taskId: number, userId: number) {
    const userStoryId = await this.tasksService.deleteTask(taskId, userId);

    const storyStatus =
      await this.userStoriesService.getUserStoryStatusById(userStoryId);

    const updatedUserStory =
      await this.userStoriesService.getUserStoryById(userStoryId);

    return {
      storyStatus,
      taskList: updatedUserStory.tasks,
    };
  }
}
