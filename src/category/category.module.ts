import { Module } from '@nestjs/common';
import { CategoryService } from '@category/service/category.service';
import { CategoryController } from '@category/controllers/category.controller';
import { SubcategoryController } from '@category/controllers/subcategory.controller';
import { CategoryValidatorPipe } from '@category/validators/category-validator.pipe';
import { CategoryEnumValidatorPipe } from '@category/validators/category-enum-validator.pipe';

@Module({
  providers: [CategoryValidatorPipe, CategoryEnumValidatorPipe, CategoryService],
  controllers: [CategoryController, SubcategoryController],
})
export class CategoryModule {
}
