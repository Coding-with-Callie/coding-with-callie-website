import { Optional } from '@nestjs/common';
import { Project } from '../../projects/entities/project.entity';
import { Review } from '../../review/entities/review.entity';
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

  @OneToMany(() => Review, (review) => review.user)
  review: Review[];

  @OneToMany(() => Project, (review) => review.user)
  projects: Project[];
}
