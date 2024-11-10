import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  addStatusesToProject(project: Project) {
    const featureCount = project.features.length;
    let completedFeatures = 0;
    let projectStarted = false;

    project.features.forEach((feature) => {
      feature['userStoryCount'] = feature.userStories.length;
      feature['completedUserStories'] = 0;
      let featureStarted = false;

      const userStories = feature.userStories;

      userStories.forEach((story) => {
        story['taskCount'] = story.tasks.length;
        const inProgressTasks = story.tasks.filter(
          (task) => task.status === 'In Progress',
        ).length;
        const completedTasks = story.tasks.filter(
          (task) => task.status === 'Done!',
        ).length;

        story['completedTasks'] = completedTasks;

        if (completedTasks > 0 || inProgressTasks > 0) {
          featureStarted = true;
          projectStarted = true;
        }

        if (story['taskCount'] === completedTasks && story['taskCount'] > 0) {
          feature['completedUserStories']++;
        }
      });

      if (!featureStarted) {
        feature['status'] = 'To Do';
      } else if (
        feature['userStoryCount'] === feature['completedUserStories']
      ) {
        feature['status'] = 'Done!';
        completedFeatures++;
      } else {
        feature['status'] = 'In Progress';
      }
    });

    if (!projectStarted) {
      project['status'] = 'To Do';
    } else if (featureCount === completedFeatures) {
      project['status'] = 'Done!';
    } else {
      project['status'] = 'In Progress';
    }

    return project;
  }

  async getUserProjects(id: number): Promise<any> {
    const projects = await this.projectsRepository.find({
      where: { user: { id } },
      order: {
        features: {
          id: 'ASC',
          userStories: {
            id: 'ASC',
            tasks: {
              id: 'ASC',
            },
          },
        },
      },
      relations: [
        'features',
        'features.userStories',
        'features.userStories.tasks',
      ],
    });

    return projects.map((project) => {
      return this.addStatusesToProject(project);
    });
  }

  async checkProjectOwnership(projectId: number, userId: number) {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId, user: { id: userId } },
    });

    if (!project) {
      return false;
    }

    return true;
  }

  async getProjectById(id: number, userId?: number): Promise<any> {
    const whereClause = userId ? { id, user: { id: userId } } : { id };

    const project = await this.projectsRepository.findOne({
      where: whereClause,
      order: {
        features: {
          id: 'ASC',
          userStories: {
            id: 'ASC',
            tasks: {
              id: 'ASC',
            },
          },
        },
      },
      relations: [
        'features',
        'features.userStories',
        'features.userStories.tasks',
      ],
    });

    if (!project) {
      throw new BadRequestException('You do not have access to that project.');
    }

    return this.addStatusesToProject(project);
  }

  async createProject(name: string, description: string, userId: number) {
    await this.projectsRepository.save({
      name,
      description,
      user: {
        id: userId,
      },
    });
    return await this.getUserProjects(userId);
  }

  async updateProject(
    field: string,
    value: string,
    userId: number,
    projectId: number,
  ): Promise<any> {
    const projectToUpdate = await this.projectsRepository.findOne({
      where: {
        id: projectId,
        user: { id: userId },
      },
    });

    if (projectToUpdate) {
      projectToUpdate[field] = value;
      const updatedProject =
        await this.projectsRepository.save(projectToUpdate);

      return await this.getProjectById(updatedProject.id);
    } else {
      throw new BadRequestException('You cannot edit that project');
    }
  }

  async deleteProject(projectId: number, userId: number) {
    const projectToDelete = await this.projectsRepository.findOne({
      where: {
        id: projectId,
        user: { id: userId },
      },
    });

    if (!projectToDelete) {
      throw new BadRequestException('You cannot delete that project');
    }

    return await this.projectsRepository.delete(projectToDelete);
  }
}
