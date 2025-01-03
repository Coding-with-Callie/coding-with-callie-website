import { Resource } from 'src/resource/entities/resource.entity';
import { Users } from '../../users/entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Users, (user) => user.checklists)
  user: Users;

  @ManyToMany(() => Resource, (resource) => resource.pages)
  @JoinTable()
  resources: Resource[];
}
