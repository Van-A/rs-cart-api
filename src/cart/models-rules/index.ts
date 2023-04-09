import { Cart } from '../../database/entities/cart.entity';
import { CartItem } from '../../database/entities/cartItem.entity';

const ITEM_PRICE = 1;

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart
    ? cart.items.reduce(
        (acc: number, { count }: CartItem) => {
          return (acc += ITEM_PRICE * count);
        },
        0,
      )
    : 0;
}
