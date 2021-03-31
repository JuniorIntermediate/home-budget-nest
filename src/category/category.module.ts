import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { IncomeCategoryController } from './controllers/income-category.controller';
import { OutcomeCategoryController } from './controllers/outcome-category.controller';
import { CategoryController } from './controllers/category.controller';
import { SubCategoryController } from './controllers/sub-category.controller';

@Module({
  providers: [CategoryService],
  controllers: [IncomeCategoryController, OutcomeCategoryController, CategoryController, SubCategoryController]
})
export class CategoryModule {}
