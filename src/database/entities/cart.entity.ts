import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { CartItem } from './cartItem.entity';

export enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'date', nullable: false })
  created_at: string;

  @Column({ type: 'date', nullable: false })
  updated_at: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @OneToMany(
    () => CartItem,
    cartItem => cartItem.cart,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  items: CartItem[];
}
