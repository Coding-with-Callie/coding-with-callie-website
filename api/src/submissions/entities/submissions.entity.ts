import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Submissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  session: number;

  @Column()
  url: string;

  @ManyToOne(() => Users, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @OneToMany(() => Feedback, (feedback) => feedback.submission)
  feedback: Feedback[];
}
