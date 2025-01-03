import { Page } from 'src/pages/entities/page.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  heading: string;

  @Column('text', { array: true })
  bodyText: string[] | string;

  @Column()
  imageUrl: string;

  @Column()
  buttonText: string;

  @Column()
  linkUrl: string;

  @Column()
  target: boolean;

  @Column()
  order: number;

  @ManyToMany(() => Page, (page) => page.resources)
  pages: Page[];
}
