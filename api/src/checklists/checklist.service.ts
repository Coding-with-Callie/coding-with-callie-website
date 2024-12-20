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
    // Find the checklist and all of its parent and grandparent checklists
    // until the top-level checklist is reached
    const query = `
      WITH RECURSIVE checklist_path AS (
        SELECT id, "parentListId", name, description, "userId"
        FROM checklist
        WHERE id = $1 AND "userId" = $2
        UNION ALL
        SELECT c.id, c."parentListId", c.name, c.description, c."userId"
        FROM checklist c
        JOIN checklist_path cp ON cp."parentListId" = c.id
      )
      SELECT * FROM checklist_path;
    `;
    let breadcrumbs = await this.checklistRepository.query(query, [
      checklistId,
      userId,
    ]);

    breadcrumbs.reverse(); // Reverse the array to get the top-level checklist first

    breadcrumbs = breadcrumbs.map((checklist) => {
      return {
        id: checklist.id,
        name: checklist.name,
      };
    });

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

    return { ...checklist, breadcrumbs };
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
  async createChecklist(
    userId: number,
    name: string,
    description?: string,
    parentId?: number,
  ) {
    await this.checklistRepository.save({
      name,
      description,
      user: {
        id: userId,
      },
      parentList: parentId ? { id: parentId } : null,
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
