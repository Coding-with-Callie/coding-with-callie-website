import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartService } from './cart.service';
import { WorkshopsModule } from 'src/workshops/workshops.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), WorkshopsModule],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
