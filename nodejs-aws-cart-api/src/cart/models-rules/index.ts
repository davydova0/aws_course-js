import { CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: any): number {
  return cart ? cart.items.reduce((acc: number, { count }: CartItem) => {
    return acc += count;
  }, 0) : 0;
}
