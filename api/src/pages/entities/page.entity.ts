import { Section } from '../../sections/entities/section.entity';
import { Users } from '../../users/entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @ManyToOne(() => Users, (user) => user.pages)
  user: Users;

  @OneToMany(() => Section, (section) => section.page)
  sections: Section[];
}
