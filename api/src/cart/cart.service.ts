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

  async createCart(userId: number) {
    const cart = await this.cartRepository.save({ user: { id: userId } });
    return cart.id;
  }

  async addWorkshopToCart(workshopId: number, cartId: number) {
    const workshop = await this.workshopsService.findOneById(workshopId);

    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: { workshops: true, user: { workshops: true } },
    });

    const purchasedWorkshops = cart.user.workshops;

    if (
      purchasedWorkshops.find(
        (purchasedWorkshop) => purchasedWorkshop.id === workshopId,
      )
    ) {
      return cart;
    }

    if (!cart.workshops) {
      cart.workshops = [];
    } else {
      if (cart.workshops.find((workshop) => workshop.id === workshopId)) {
        return cart;
      }
    }

    cart.workshops = [...cart.workshops, workshop];

    return await this.cartRepository.save(cart);
  }

  async updateCart(workshops: any, cartId: number) {
    const cartToUpdate = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: { workshops: true },
    });

    cartToUpdate.workshops = workshops;

    await this.cartRepository.save(cartToUpdate);
  }
}
