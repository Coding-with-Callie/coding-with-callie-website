import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checklist } from './entities/checklist.entity';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(Checklist)
    private checklistRepository: Repository<Checklist>,
  ) {}

  // Get all checklists from the database for a specific user
  async getChecklists(userId: number, topLevel: boolean, checklistId?: number) {
    if (checklistId) {
      const checklist = await this.checklistRepository.findOne({
        where: {
          id: checklistId,
          user: {
            id: userId,
          },
        },
        relations: ['children', 'children.children', 'parentList'],
      });

      if (!checklist) {
        return null;
      }

      return [checklist];
    }

    const checklists = await this.checklistRepository.find({
      where: {
        user: {
          id: userId,
        },
        ...(checklistId && { parentList: { id: checklistId } }),
      },
      relations: ['children', 'children.children', 'parentList'],
    });

    if (topLevel) {
      return checklists.filter((checklist) => checklist.parentList === null);
    }

    return checklists;
  }

  // Add a new checklist to the database
  async createChecklist(name: string, userId: number) {
    await this.checklistRepository.save({
      name,
      user: {
        id: userId,
      },
    });
    return { message: 'Checklist created' };
  }

  // Update a field on a checklist
  async updateChecklistField(
    userId: number,
    checklistId: number,
    field: string,
    value: string,
  ) {
    const checklist = await this.checklistRepository.findOne({
      where: {
        id: checklistId,
        user: {
          id: userId,
        },
      },
    });

    if (!checklist) {
      return { message: 'Checklist not found' };
    }

    checklist[field] = value;
    await this.checklistRepository.save(checklist);
    return { message: 'Checklist updated' };
  }
}
