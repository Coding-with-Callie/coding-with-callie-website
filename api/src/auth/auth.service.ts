import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { AlumniDto, SpeakerDTO } from './auth.controller';
import { ReviewService } from '../review/review.service';
import { SpeakersService } from '../speakers/speakers.service';
import { AlumniService } from '../alumni/alumni.service';
import { FeaturesService } from '../features/features.service';
import { ProjectsService } from '../projects/projects.service';
import { TasksService } from '../tasks/tasks.service';
import { UserStoriesService } from '../userStories/userStories.service';
import { ResourceService } from '../resource/resource.service';
import { FileUploadService } from '../file_upload/file_upload.service';
import { Resource } from '../resource/entities/resource.entity';
import { hashPassword } from '../helpers/helpers';
import { Speaker } from '../speakers/entities/speaker.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
    private reviewService: ReviewService,
    private speakersService: SpeakersService,
    private alumniService: AlumniService,
    private projectsService: ProjectsService,
    private featuresService: FeaturesService,
    private userStoriesService: UserStoriesService,
    private tasksService: TasksService,
    private resourceService: ResourceService,
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

  // create password reset JWT
  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user === null) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const secret = user.password;
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '10m',
    });

    return await this.mailService.sendPasswordResetEmail(
      user,
      access_token,
      user.id,
    );
  }

  // check password reset token
  async getProfileReset(token, id) {
    const user = await this.usersService.findOneById(id);
    const payload = await this.jwtService.verifyAsync(token, {
      secret: user.password,
    });

    if (payload) {
      return await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
      });
    } else {
      throw new UnauthorizedException();
    }
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

  async createResource(resource: Resource) {
    return await this.resourceService.createResource(resource);
  }

  async deleteResource(id: number) {
    return await this.resourceService.deleteResource(id);
  }

  async updateResource(id: number, resource: Resource) {
    return await this.resourceService.updateResource(id, resource);
  }

  async updateResourceOrder(id: number, direction: string) {
    return await this.resourceService.updateOrder(id, direction);
  }

  async createSpeaker(speaker: SpeakerDTO) {
    return await this.speakersService.createSpeaker(speaker);
  }

  async deleteSpeaker(id: number) {
    const speaker = await this.speakersService.findOneById(id);
    return await this.speakersService.deleteSpeaker(speaker);
  }

  async updateSpeaker(id: number, speaker: Speaker) {
    return await this.speakersService.updateSpeaker(id, speaker);
  }

  async createAlumni(alumni: AlumniDto) {
    return await this.alumniService.createAlumni(alumni);
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
