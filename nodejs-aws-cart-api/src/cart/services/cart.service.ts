import { Injectable } from '@nestjs/common';
import { CartStatus } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../models/cart.entity';
import { CartItem } from '../models/cartItem.entity';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>) {
  }

  async findByUserId(userId: string) {
    const cartEntities = await this.cartRepository.find({ where: { userId } });

    if (cartEntities.length > 0) {
      const cartEntity = cartEntities[0];
      const items = await this.cartItemRepository.find({ where: { cart: { id: cartEntity.id } } });
      console.log(items);
      console.log('cartItems1');

      return {
        id: cartEntity.id,
        status: cartEntity.status,
        userId: cartEntity.userId,
        items,
      };
    }
    return null;
  }

  async createByUserId(userId: string) {
    const newCart = await this.cartRepository.create({ userId, status: CartStatus.OPEN });
    console.log(newCart);
    await this.cartRepository.save(newCart);
    console.log('newCart');

    return {
      userId,
      id: newCart.id,
      items: [],
      status: CartStatus.OPEN,
    };
  }

  async findOrCreateByUserId(userId: string) {
    console.log(userId + 'userId');
    const userCart = await this.findByUserId(userId);
    console.log(userCart);
    console.log('userCart');

    if (userCart) {
      return userCart;
    }

    // @ts-ignore
    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: any) {
    // @ts-ignore
    const { id } = await this.findOrCreateByUserId(userId);
    console.log(id + ' id');
    console.log(items);
    console.log('items');
    const cartItems = items.map(({ product_id, count }) => ({
      cart: id,
      product_id,
      count,
    }));
    await this.cartItemRepository.save(cartItems);
    return this.findOrCreateByUserId(userId);
  }

  async removeByUserId(userId: string) {
    await this.cartRepository.delete({ userId });
  }

}
