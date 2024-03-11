import { Cart } from 'src/cart/entities/cart.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Review } from 'src/review/entities/review.entity';
import { Submissions } from 'src/submissions/entities/submissions.entity';
import { Workshop } from 'src/workshops/entities/workshop.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

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

  @OneToMany(() => Submissions, (submission) => submission.user)
  submissions: Submissions[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedback: Feedback[];

  @OneToMany(() => Review, (review) => review.user)
  review: Review[];

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @OneToMany(() => Workshop, (workshop) => workshop.user)
  workshops: Workshop[];
}
