import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controllers/category.controller';
import { SubcategoryController } from './controllers/subcategory.controller';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController, SubcategoryController]
})
export class CategoryModule {}
