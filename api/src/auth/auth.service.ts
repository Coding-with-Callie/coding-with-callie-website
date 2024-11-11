import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async submitReviewAndReturnUpdatedReviews(review: ReviewDTO) {
    // Submit the review
    await this.reviewService.submitReview(review);

    // Return the updated reviews
    return await this.reviewService.getAllReviews();
  }

  async getUserProjects(userId: number) {
    return await this.projectsService.getUserProjects(userId);
  }

  async getProject(id: number) {
    return await this.projectsService.getProjectById(id);
  }

  async createProjectAndReturnUpdatedProjects(
    name: string,
    description: string,
    userId: number,
  ) {
    // Create the project
    await this.projectsService.createProject(name, description, userId);

    // Return the updated projects
    return await this.projectsService.getUserProjects(userId);
  }

  async updateProjectAndReturnUpdatedProject(
    field: string,
    value: string,
    projectId: number,
  ) {
    // Update the project
    await this.projectsService.updateProject(field, value, projectId);

    // Return the updated project with statuses
    return await this.projectsService.getProjectById(projectId);
  }

  async deleteProject(projectId: number) {
    // Delete the project and return success message
    return await this.projectsService.deleteProject(projectId);
  }

  async createFeatureAndReturnUpdatedProject(
    name: string,
    description: string,
    projectId: number,
  ) {
    // Create the feature
    await this.featuresService.createFeature(name, description, projectId);

    // Return the updated project
    return await this.projectsService.getProjectById(projectId);
  }

  async updateFeatureAndReturnUpdatedProject(
    field: string,
    value: string,
    featureId: number,
  ) {
    // Update the feature
    await this.featuresService.updateFeature(field, value, featureId);

    // Return the updated project
    return await this.projectsService.getProjectById(featureId);
  }

  async deleteFeatureAndReturnUpdatedProject(featureId: number) {
    // Delete the feature
    await this.featuresService.deleteFeature(featureId);

    // Return the updated project
    return await this.projectsService.getProjectById(featureId);
  }

  async createUserStoryAndReturnUpdatedProject(
    name: string,
    description: string,
    projectId: number,
    featureId: number,
  ) {
    // Check if the feature exists in the project
    const exists = await this.featuresService.checkIfFeatureExistsInProject(
      featureId,
      projectId,
    );

    if (!exists) {
      throw new NotFoundException('Feature does not exist in project');
    }

    // Create the user story
    await this.userStoriesService.createUserStory(name, description, featureId);

    // Return the updated project
    return await this.projectsService.getProjectById(projectId);
  }

  async updateUserStoryAndReturnUpdatedProject(
    field: string,
    value: string,
    userStoryId: number,
    projectId: number,
  ) {
    // Update the user story
    await this.userStoriesService.updateUserStory(field, value, userStoryId);

    // Return the updated project
    return await this.projectsService.getProjectById(projectId);
  }

  async deleteUserStoryAndReturnUpdatedProject(
    userStoryId: number,
    projectId: number,
  ) {
    // Delete the user story
    await this.userStoriesService.deleteUserStory(userStoryId);

    // Return the updated project
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
