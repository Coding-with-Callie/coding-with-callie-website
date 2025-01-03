import { Page } from '../../pages/entities/page.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('json')
  data: any;

  @ManyToOne(() => Page, (page) => page.sections)
  page: Page;
}
