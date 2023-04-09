import {
    Column,
    PrimaryColumn,
    Entity,
    JoinColumn,
    ManyToOne
  } from 'typeorm';
import { Cart } from './cart.entity';
  
  @Entity('cart_items')
  export class CartItem {
    @ManyToOne(() => Cart, (cart) => cart.items)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart: Cart;
  
    @PrimaryColumn({ type: 'uuid' })
    product_id: string;
  
    @Column({ type: 'integer' })
    count: number;
  }
  