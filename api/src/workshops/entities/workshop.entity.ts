import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../content/type';

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
}
