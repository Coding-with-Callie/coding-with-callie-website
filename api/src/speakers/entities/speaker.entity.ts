import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column({ default: '8PM EST' })
  time: string;

  @Column('text', { array: true })
  sessionText: string | string[];

  @Column('text', { array: true })
  bioText: string | string[];

  @Column()
  websiteUrl: string;

  @Column()
  photoUrl: string;

  @Column({ nullable: true })
  sessionRecordingUrl: string;
}
