import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Users } from 'src/users/entities/users.entity';
import { Workshop } from 'src/workshops/entities/workshop.entity';
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

  @ManyToOne(() => Workshop, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'workshopId' })
  workshop: Workshop;

  @OneToMany(() => Feedback, (feedback) => feedback.submission)
  feedback: Feedback[];
}
