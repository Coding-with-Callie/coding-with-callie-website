import { Users } from 'src/users/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
  stripe_id: string;

  @ManyToOne(() => Users)
  user: Users;
}
