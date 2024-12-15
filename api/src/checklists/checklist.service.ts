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
  // Get checklist by id from the database for a specific user
  async getChecklistById(userId: number, checklistId: number) {
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

    return checklist;
  }

  // Get all checklists from the database for a specific user
  async getChecklists(userId: number) {
    const checklists = await this.checklistRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['children', 'children.children', 'parentList'],
    });

    return checklists.filter((checklist) => checklist.parentList === null);
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
