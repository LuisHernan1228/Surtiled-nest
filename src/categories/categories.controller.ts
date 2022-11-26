import { Body, Controller, Get, Post, Req, UseGuards, Header, Delete, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './entity/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @Header('content-type', 'application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log("create: ", createCategoryDto)
    const category = this.categoriesService.create(createCategoryDto)
    return category;
  }
  
  @Get()
  async findAll(): Promise<Category[]> {
    const categories = await this.categoriesService.findCategories();
    return categories;
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<Category> {
    const category = await this.categoriesService.remove(id)
    return category
  }
}
