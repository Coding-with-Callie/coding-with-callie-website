import { Injectable, NotFoundException } from '@nestjs/common';
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
  async getFrontendFriendlyUser(id: number) {
    return await this.usersService.getFrontendFriendlyUser(id);
  }

  async changeAccountDetail(id: number, field: string, value: string) {
    return await this.usersService.changeAccountDetail(id, field, value);
  }

  async softDeleteUser(id: number) {
    return await this.usersService.softDeleteUser(id);
  }

  async uploadFile(file: Express.Multer.File) {
    return await this.fileUploadService.uploadFile(file);
  }

  async uploadProfileImage(id: number, file: Express.Multer.File) {
    const photoUrl = await this.uploadFile(file);
    return await this.usersService.changeAccountDetail(id, 'photo', photoUrl);
  }

  async submitReviewAndReturnUpdatedReviews(review: ReviewDTO, userId: number) {
    // Submit the review
    await this.reviewService.submitReview(review, userId);

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
    return await this.getUserProjects(userId);
  }

  async updateProjectAndReturnUpdatedProject(
    field: string,
    value: string,
    projectId: number,
  ) {
    // Update the project
    await this.projectsService.updateProject(field, value, projectId);

    // Return the updated project with statuses
    return await this.getProject(projectId);
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
    return await this.getProject(projectId);
  }

  async updateFeatureAndReturnUpdatedProject(
    field: string,
    value: string,
    projectId: number,
    featureId: number,
  ) {
    // Update the feature
    await this.featuresService.updateFeature(field, value, featureId);

    // Return the updated project
    return await this.getProject(projectId);
  }

  async deleteFeatureAndReturnUpdatedProject(featureId: number) {
    // Delete the feature
    await this.featuresService.deleteFeature(featureId);

    // Return the updated project
    return await this.getProject(featureId);
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
    return await this.getProject(projectId);
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
    return await this.getProject(projectId);
  }

  async deleteUserStoryAndReturnUpdatedProject(
    userStoryId: number,
    projectId: number,
  ) {
    // Delete the user story
    await this.userStoriesService.deleteUserStory(userStoryId);

    // Return the updated project
    return await this.getProject(projectId);
  }

  async createTaskAndReturnUpdatedProject(
    name: string,
    projectId: number,
    featureId: number,
    userStoryId: number,
  ) {
    // Check if the user story exists in the feature in the project
    const exists =
      await this.userStoriesService.checkIfUserStoryExistsInFeatureInProject(
        userStoryId,
        featureId,
        projectId,
      );

    if (!exists) {
      throw new NotFoundException(
        'User story does not exist in feature in project',
      );
    }

    // Create the task
    await this.tasksService.createTask(name, userStoryId);

    // Return the updated project
    return await this.getProject(projectId);
  }

  async updateTaskAndReturnTaskCompletionRatio(
    field: string,
    value: string,
    taskId: number,
    userStoryId: number,
  ) {
    // Update the task
    await this.tasksService.updateTask(field, value, taskId);

    // Return user story status (completed tasks over total tasks)
    return await this.userStoriesService.getUserStoryStatusById(userStoryId);
  }

  async deleteTaskAndReturnUpdatedTasksWithTaskCompletionRatio(
    taskId: number,
    userStoryId: number,
  ) {
    // Delete the task
    await this.tasksService.deleteTask(taskId);

    // Get user story status (completed tasks over total tasks)
    const storyStatus =
      await this.userStoriesService.getUserStoryStatusById(userStoryId);

    // Get the updated tasks for the user story
    const updatedTasks = await this.tasksService.getUserStoryTasks(userStoryId);

    return {
      storyStatus,
      taskList: updatedTasks,
    };
  }
}
