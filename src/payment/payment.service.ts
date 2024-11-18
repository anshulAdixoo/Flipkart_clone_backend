// payment/payment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  // Method to create a new payment
  async createPayment(paymentDto: PaymentDto): Promise<Payment> {
    const payment = new Payment();
    payment.order_id = paymentDto.order_id;
    payment.payment_method = paymentDto.payment_method;
    payment.payment_status = paymentDto.payment_status;
    payment.amount = paymentDto.amount;
    console.log("going inside the payment",payment); 
    return this.paymentRepository.save(payment);
  }
  
  // Method to fetch all payments (optional, you can modify based on your needs)
  async getPayments(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }
}
