import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { WorkshopsService } from 'src/workshops/workshops.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly workshopsService: WorkshopsService,
  ) {}

  async addWorkshopToCart(workshopId: number, cartId: number) {
    const workshop = await this.workshopsService.findOneById(workshopId);

    console.log('CART ID', cartId);

    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: { workshops: true },
    });

    console.log('CART', cart);

    if (!cart.workshops) {
      console.log('HERE');
      cart.workshops = [];
    }

    cart.workshops = [...cart.workshops, workshop];

    console.log('CART', cart.workshops);

    return await this.cartRepository.save(cart);
  }
}
