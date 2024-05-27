import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(() => Alumni, (alumni) => alumni.workshop)
  alumni: Alumni[];
}
