import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, Status } from '../../database/entities/cart.entity';
import { CartItem } from '../../database/entities/cartItem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItemsRepository: Repository<CartItem>,
  ) {}

  findByUserId(userId: string): Promise<Cart> {
    return this.cartRepository.findOne({
      where: {
        user_id: userId,
      },
      relations: [ 'items' ]
    });
  }

  createByUserId(userId: string) {
    // const [isoDate] = new Date().toISOString().split('T');
    const userCart = {
      user_id: userId,
      // created_at: isoDate,
      // updated_at: isoDate,
      status: Status.OPEN,
    };

    const newCart = this.cartRepository.create(userCart);
    return this.cartRepository.save(newCart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);
    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string,  items : CartItem[]): Promise<Cart> {
    const cart = await this.findOrCreateByUserId(userId);

    cart.items = items;

    this.cartRepository.save(cart);

    return cart;
  }

  removeByUserId(userId): void {
    this.cartRepository.delete({user_id: userId});
  }

}
