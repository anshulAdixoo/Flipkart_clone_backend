import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Category } from './category/entities/category.entity';
import { Subcategory } from './category/entities/subcategory.entity';
import { CategoryModule } from './category/category.module';
import { CarouselModule } from './carousel/carousel.module';
import { Carousel } from './carousel/entities/carousel.entity';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/entities/payment.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port:  5432,
      username: 'postgres',
      password: 'Admin',
      database: 'flipkart_db',
      // eslint-disable-next-line prettier/prettier
      entities: [User, Category, Subcategory,Carousel,Payment,Cart], // Add Category and Subcategory
      synchronize: true,
    }),
    AuthModule,
    CategoryModule,
    CarouselModule,
    PaymentModule,
    CartModule
  ],
})
export class AppModule {}
