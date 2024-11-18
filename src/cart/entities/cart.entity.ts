// src/cart/entities/cart.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/user.entity'; // Assuming you have a User entity

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true }) // Assume a user can have many cart items
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  item_id: number;

  @Column()
  quantity: number;

  @Column()
  price: number; // Price of a single item

  @Column({ default: true })
  isActive: boolean; // Track if item is active or removed
}
