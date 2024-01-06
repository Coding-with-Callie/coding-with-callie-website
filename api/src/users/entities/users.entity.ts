import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Submissions } from 'src/submissions/entities/submissions.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({
    nullable: true,
    default: null,
  })
  photo: string;

  @OneToMany(() => Submissions, (submission) => submission.user)
  submissions: Submissions[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedback: Feedback[];
}
