import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ReviewService } from '../review/review.service';
import { FeaturesService } from '../features/features.service';
import { ProjectsService } from '../projects/projects.service';
import { TasksService } from '../tasks/tasks.service';
import { UserStoriesService } from '../userStories/userStories.service';
import { FileUploadService } from '../file_upload/file_upload.service';
import { hashPassword } from '../helpers/helpers';

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
    const user = await this.usersService.findOneById(id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      photo: user.photo,
    };
  }

  async changeAccountDetail(id: number, value: string, field: string) {
    const userToUpdate = await this.usersService.findOneById(id);

    if (field === 'password') {
      value = await hashPassword(value);
    }

    const user = await this.usersService.changeAccountDetail(
      userToUpdate,
      field,
      value,
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      submissions: user.submissions,
      feedback: user.feedback,
      photo: user.photo,
    };
  }

  async deleteUser(id: number) {
    const user = await this.usersService.findOneById(id);

    await this.usersService.changeAccountDetail(user, 'name', 'deleted');
    await this.usersService.changeAccountDetail(
      user,
      'username',
      `deleted-${Date.now()}`,
    );
    await this.usersService.changeAccountDetail(user, 'email', 'deleted');
    await this.usersService.changeAccountDetail(user, 'password', 'deleted');

    return 'deleted';
  }

  async uploadFile(file) {
    return await this.fileUploadService.uploadFile(file);
  }

  async uploadProfileImage(id, file) {
    const user = await this.usersService.findOneById(id);
    const photoUrl = await this.uploadFile(file);
    return await this.usersService.changeAccountDetail(user, 'photo', photoUrl);
  }

  async submitReview(review) {
    return await this.reviewService.submitReview(review);
  }

  async getUserProjects(userId: number) {
    const user = await this.getUserProfile(userId);
    const projects = await this.projectsService.getUserProjects(userId);

    return {
      user,
      projects,
    };
  }

  async getProject(userId: number, id: number) {
    const projects = await this.projectsService.getUserProjects(userId);
    return projects.find((project) => project.id === id);
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
    userId: number,
    projectId: number,
  ) {
    const projects = await this.projectsService.getUserProjects(userId);
    const project = projects.find((project) => project.id === projectId);

    if (project) {
      await this.featuresService.createFeature(name, description, projectId);
      return await this.projectsService.getProjectById(projectId);
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
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
