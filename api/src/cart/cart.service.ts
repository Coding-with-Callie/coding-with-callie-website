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

  async addWorkshopToCart(workshopId: number, user: any) {
    const workshop = await this.workshopsService.findOneById(workshopId);

    const cart = new Cart();
    cart.user = user;
    if (!cart.workshops) {
      cart.workshops = [];
    }

    cart.workshops = [...cart.workshops, workshop];
    return await this.cartRepository.save(cart);
  }
}
