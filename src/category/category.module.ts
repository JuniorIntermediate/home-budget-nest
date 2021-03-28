import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { IncomeCategoryController } from './controllers/income-category.controller';
import { OutcomeCategoryController } from './controllers/outcome-category.controller';
import { CategoryFactory } from './factory/category.factory';
import { CategoryController } from './controllers/category.controller';

@Module({
  providers: [CategoryService, CategoryFactory],
  controllers: [IncomeCategoryController, OutcomeCategoryController, CategoryController]
})
export class CategoryModule {}
