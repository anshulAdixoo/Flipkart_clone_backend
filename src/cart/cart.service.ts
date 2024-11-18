import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  // Add item to cart
  async addToCart(cartDto: CartDto): Promise<Cart> {
    const cartItem = this.cartRepository.create(cartDto);
    return this.cartRepository.save(cartItem);
  }

  // Get all items in a user's cart with relations
  async getCartItems(id: number): Promise<Cart[]> {
    const cartItems = await this.cartRepository.find({
      where: { user: { id: id }, isActive: true },
      relations: ['user'],
    });
    
    if (cartItems.length === 0) {
      throw new NotFoundException('No items found in cart.');
    }

    return cartItems;
  }

  // Update cart item quantity
  async updateCartItem(cartId: number, quantity: number): Promise<Cart> {
    const cartItem = await this.cartRepository.findOne({ where: { id: cartId } });

    if (!cartItem) {
      throw new NotFoundException(`Item with ID ${cartId} not found`);
    }

    // Update the quantity
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be a positive number');
    }

    cartItem.quantity = quantity;
    return this.cartRepository.save(cartItem);
  }

  // Delete item from cart (soft delete)
  async deleteCartItem(cartId: number): Promise<void> {
    const cartItem = await this.cartRepository.findOne({ where: { id: cartId } });

    if (!cartItem) {
      throw new NotFoundException(`Item with ID ${cartId} not found`);
    }

    cartItem.isActive = false; // Mark as inactive instead of deleting
    await this.cartRepository.save(cartItem);
  }
}
