import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column('text', { array: true })
  sessionText: string[];

  @Column('text', { array: true })
  bioText: string[];

  @Column()
  websiteUrl: string;

  @Column()
  photoUrl: string;
}