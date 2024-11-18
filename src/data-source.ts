/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { Category } from './category/entities/category.entity';
import { Subcategory } from './category/entities/subcategory.entity';
import { Carousel } from './carousel/entities/carousel.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host:  'localhost',
  port:   5432,
  username: 'postgres',
  password:  'Admin',
  database: 'FlipKart_DB',
  entities: [Category, Subcategory,Carousel], // Added Subcategory here
  synchronize: true,
});
