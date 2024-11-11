import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

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

  async checkProjectAccess(projectId: number, userId: number) {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId, user: { id: userId } },
    });

    if (!project) {
      return false;
    }

    return true;
  }

  async getProjectById(id: number): Promise<any> {
    const project = await this.projectsRepository.findOne({
      where: { id },
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
    return { message: 'Project created' };
  }

  async updateProject(field: string, value: string, id: number): Promise<any> {
    const projectToUpdate = await this.projectsRepository.findOneBy({ id });

    if (!projectToUpdate) {
      throw new NotFoundException('Project not found');
    }

    projectToUpdate[field] = value;
    await this.projectsRepository.save(projectToUpdate);
    return { message: 'Project updated' };
  }

  async deleteProject(id: number) {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.projectsRepository.delete({ id });
    return { message: 'Project deleted' };
  }
}
