import { Users } from '../../users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: true })
  rating: number | null;

  @Column()
  comments: string;

  @Column()
  displayName: string;

  @ManyToOne(() => Users, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @CreateDateColumn()
  createdAt: Date;
}
