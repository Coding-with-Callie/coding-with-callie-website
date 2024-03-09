import { Injectable, BadRequestException } from '@nestjs/common';
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

    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: { workshops: true },
    });

    if (!cart.workshops) {
      cart.workshops = [];
    } else {
      if (cart.workshops.find((workshop) => workshop.id === workshopId)) {
        throw new BadRequestException(
          'You are already registered for that workshop!',
        );
      }
    }

    cart.workshops = [...cart.workshops, workshop];

    return await this.cartRepository.save(cart);
  }
}
