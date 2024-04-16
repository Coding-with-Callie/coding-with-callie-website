import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Session } from '../content/type';
import { Submissions } from 'src/submissions/entities/submissions.entity';
import { Review } from 'src/review/entities/review.entity';
import { Alumni } from 'src/alumni/entities/alumni.entity';

@Entity()
export class Workshop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  photo: string;

  @Column('text', { array: true })
  details: string[];

  @Column('text', { array: true })
  objectives: string[];

  @Column('text', { array: true })
  techStack: string[];

  @Column()
  price: number;

  @Column({ default: false })
  available: boolean;

  @Column({ nullable: true })
  stripeId: string;

  @Column('jsonb')
  sessions: Session[];

  @OneToMany(() => Submissions, (submission) => submission.workshop)
  submissions: Submissions[];

  @OneToMany(() => Review, (review) => review.workshop)
  reviews: Review[];

  @OneToMany(() => Alumni, (alumni) => alumni.workshop)
  alumni: Alumni[];
}
