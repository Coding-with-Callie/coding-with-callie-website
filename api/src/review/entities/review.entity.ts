import { Users } from 'src/users/entities/users.entity';
import { Workshop } from 'src/workshops/entities/workshop.entity';
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

  @Column()
  rating: number | null;

  @ManyToOne(() => Workshop, (workshop) => workshop.id)
  @JoinColumn({ name: 'workshopId' })
  workshop: Workshop;

  @Column()
  session: number;

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
