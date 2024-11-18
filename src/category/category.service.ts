/* eslint-disable prettier/prettier */
// src/category/category.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    name: string,
    subcategories: string[],
    categoryImage: string,
  ): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name },
      relations: ['subcategories'], // Include subcategories if necessary
    });
  
    // If it exists, return the existing category
    if (existingCategory) {
      throw new HttpException(
        `Category with name '${name}' already exists.`,
        HttpStatus.CONFLICT,
      );
    }
    const category = new Category();
    category.name = name;
    category.categoryImage = categoryImage; // Assign category image URL
    category.subcategories = subcategories.map((sub) => {
      const subcategory = new Subcategory();
      subcategory.name = sub;

      return subcategory;
    });
    return this.categoryRepository.save(category);
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['subcategories'] });
  }
}
