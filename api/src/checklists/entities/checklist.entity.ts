import { Users } from '../../users/entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Checklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 'To Do' })
  status: string;

  @ManyToOne(() => Users, (user) => user.checklists)
  user: Users;

  @ManyToOne(() => Checklist, (checklist) => checklist.children, {
    onDelete: 'CASCADE',
    nullable: true, // Make parentList optional
  })
  parentList?: Checklist;

  @OneToMany(() => Checklist, (checklist) => checklist.parentList, {
    nullable: true,
  })
  children?: Checklist[];
}
