/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Carousel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;  
 
  @Column()
  redirectUrl: string;

  @Column({ default: true })
  isActive: boolean;
}
