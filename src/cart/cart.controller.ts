import { Controller, Post, Get, Body, Param, Patch, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Add item to cart
  @Post()
  async addToCart(@Body() cartDto: CartDto) {
    return this.cartService.addToCart(cartDto);
  }

  // Get all items in the cart for a user
  @Get(':id')
  async getCartItems(@Param('id') user_id: number) {
    return this.cartService.getCartItems(user_id);
  }

  // Update item quantity in the cart
  @Patch(':cartId')
  async updateCartItem(
    @Param('cartId') cartId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateCartItem(cartId, quantity);
  }

  // Delete item from cart (soft delete)
  @Delete(':cartId')
  async deleteCartItem(@Param('cartId') cartId: number) {
    return this.cartService.deleteCartItem(cartId);
  }
}
