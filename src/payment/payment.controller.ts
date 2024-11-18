// payment/payment.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Endpoint to create a new payment
  @Post()
  async createPayment(@Body() paymentDto: PaymentDto) {
    const payment = await this.paymentService.createPayment(paymentDto);
    console.log('payment done!',payment);
    return { message: 'Payment successful', payment };
  }
   
  // Endpoint to fetch all payments
  @Get()
  async getPayments() {
    return this.paymentService.getPayments();
  }
}
