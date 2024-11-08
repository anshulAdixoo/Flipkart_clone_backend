import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Category } from './category/entities/category.entity';
import { Subcategory } from './category/entities/subcategory.entity';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'Kaampardhyando',
      database: process.env.DB_NAME || 'flipkart_clone',
      entities: [User, Category, Subcategory], // Add Category and Subcategory
      synchronize: true,
    }),
    AuthModule,
    CategoryModule,
  ],
})
export class AppModule {}
