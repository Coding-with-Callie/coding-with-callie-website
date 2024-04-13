import { Users } from 'src/users/entities/users.entity';
import { Workshop } from 'src/workshops/entities/workshop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, (user) => user.cart)
  user: Users;

  @ManyToMany(() => Workshop)
  @JoinTable()
  workshops: Workshop[];
}
