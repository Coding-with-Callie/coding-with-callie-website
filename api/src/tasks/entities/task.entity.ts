import { UserStory } from '../../userStories/entities/userStory.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserStory, (userStory) => userStory.tasks, {
    onDelete: 'CASCADE',
  })
  userStory: UserStory;

  @Column()
  name: string;

  @Column({ default: 'To Do' })
  status: string;
}
