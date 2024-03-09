import { Users } from 'src/users/entities/users.entity';
import { Workshop } from 'src/workshops/entities/workshop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, (user) => user.cart)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @ManyToMany(() => Workshop)
  @JoinTable()
  workshops: Workshop[];
}
