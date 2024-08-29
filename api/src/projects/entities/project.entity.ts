import { Users } from '../../users/entities/users.entity';
import { Feature } from '../../features/entities/feature.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.projects, {
    onDelete: 'CASCADE',
  })
  user: Users;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Feature, (feature) => feature.project)
  features: Feature[];
}
