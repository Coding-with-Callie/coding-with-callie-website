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
  async getChecklists(userId: number, topLevel: boolean) {
    const checklists = await this.checklistRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['children', 'parentList'],
    });

    if (topLevel) {
      return checklists.filter((checklist) => checklist.parentList === null)
    }

    return checklists
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
}
