/* eslint-disable prettier/prettier */
// src/category/category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  
// Add a subcategory to a specific category
async addSubcategoryToCategory(
  categoryId: number,
  name: string,
): Promise<Subcategory> {
  const category = await this.categoryRepository.findOne({
    where: { id: categoryId },
    relations: ['subcategories'],
  });

  if (!category) {
    throw new Error('Category not found');
  }

  const subcategory = new Subcategory();
  subcategory.name = name;
  subcategory.category = category; // Link the subcategory to the category

  // Save the new subcategory
  return this.subcategoryRepository.save(subcategory);
}
 

  // Get all categories with their subcategories
  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['subcategories'] });
  }
 

  
  // Get all subcategories for a specific category
  async getSubcategories(categoryId: number): Promise<Subcategory[]> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['subcategories'],
    });
    if (!category) {
      throw new Error('Category not found');
    }
    return category.subcategories;
  }

   // Add subcategories to a specific category
   async addSubcategories(
    categoryId: number,
    subcategories: string[],
  ): Promise<Subcategory[]> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['subcategories'],
    });

    if (!category) {
      throw new Error('Category not found');
    }

    const newSubcategories = subcategories.map((sub) => {
      const subcategory = new Subcategory();
      subcategory.name = sub;
      subcategory.category = category; // Link subcategory to the category
      return subcategory;
    });

    // Save the new subcategories
    await this.subcategoryRepository.save(newSubcategories);

    // Return the updated list of subcategories
    return this.getSubcategories(categoryId);
  }

  // Delete a subcategory for a specific category with a message
  async deleteSubcategory(
    categoryId: number,
    subcategoryId: number,
  ): Promise<{ message: string }> {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id: subcategoryId, category: { id: categoryId } },
      relations: ['category'],
    });

    if (!subcategory) {
      throw new Error('Subcategory not found');
    }

    await this.subcategoryRepository.delete(subcategoryId);

    // Log and return a success message
    const message = `Subcategory with ID ${subcategoryId} for category ID ${categoryId} has been deleted successfully.`;
    console.log(message);
    return { message };
  }
}
