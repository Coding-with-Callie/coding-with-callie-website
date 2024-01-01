import { Submissions } from 'src/submissions/entities/submissions.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  positiveFeedback: string;

  @Column()
  immediateChangesRequested: string;

  @Column()
  longTermChangesRequested: string;

  @ManyToOne(() => Users, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'feedbackProviderId' })
  user: Users;

  @ManyToOne(() => Submissions, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'submissionId' })
  submission: Submissions;
}
