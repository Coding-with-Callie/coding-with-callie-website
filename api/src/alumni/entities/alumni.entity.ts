import { Workshop } from '../../workshops/entities/workshop.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Alumni {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { array: true })
  opportunities: string[];

  @Column('text', { array: true })
  bioText: string[];

  @Column()
  linkedInUrl: string;

  @Column()
  photoUrl: string;

  @Column()
  projectUrl: string;

  @ManyToOne(() => Workshop, (workshop) => workshop.alumni)
  workshop: Workshop;

  @Column({ nullable: true })
  demoUrl: string;
}
