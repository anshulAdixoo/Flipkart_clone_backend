/* eslint-disable prettier/prettier */

import { Controller, Post, Get, Body } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body('name') name: string,
    @Body('subcategories') subcategories: string[],
    @Body('categoryImage') categoryImage: string, // Add category image to the request body
  ) {
    
    return this.categoryService.createCategory(name, subcategories, categoryImage);
  }

  @Get()
  async getCategories() {
    return this.categoryService.getCategories();
  }
}
