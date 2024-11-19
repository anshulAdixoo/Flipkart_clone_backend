import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}



  @Get()
  async getCategories() {
    return this.categoryService.getCategories();
  }

 
  @Get(':id/subcategories')
  async getSubcategories(@Param('id') id: number) {
    
    return this.categoryService.getSubcategories(id);
  }

  // New Endpoint: Add subcategories to a particular category
  @Post('subcategories')
  async addSubcategoryToCategory(
    @Body('categoryId') categoryId: number,
    @Body('name') name: string,
  ) {
    return this.categoryService.addSubcategoryToCategory(categoryId, name);
  }

  // New Endpoint: Delete a subcategory for a particular category
  @Delete(':categoryId/subcategories/:subcategoryId')
  async deleteSubcategory(
    @Param('categoryId') categoryId: number,
    @Param('subcategoryId') subcategoryId: number,
  ) {
    return this.categoryService.deleteSubcategory(categoryId, subcategoryId);
  }
}
