/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { Category } from './category/entities/category.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'Kaampardhyando',
  database: process.env.DB_NAME || 'flipkart_clone',
  entities: [Category], // Ensure your Category entity is here
  synchronize: true,
});


