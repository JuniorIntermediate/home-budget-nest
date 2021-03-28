import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { IncomeCategoryController } from './controllers/income-category.controller';
import { OutcomeCategoryController } from './controllers/outcome-category.controller';

@Module({
  providers: [CategoryService],
  controllers: [IncomeCategoryController, OutcomeCategoryController]
})
export class CategoryModule {}
