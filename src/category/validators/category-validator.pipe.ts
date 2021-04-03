import { BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  CreateBaseCategoryDto,
  CreateSubcategoryDto,
  UpdateBaseCategoryDto,
  UpdateSubcategoryDto,
} from '@category/dto';
import { CategoryRepository } from '@core/repositories/category.repository';
import { Category, IncomeCategory, OutcomeCategory, Subcategory } from 'src/generated-prisma';
import { CategoryTypeEnum } from '@category/enums/category-type.enum';

@Injectable()
export class CategoryValidatorPipe implements PipeTransform {

  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {
  }

  async transform(value: CreateBaseCategoryDto): Promise<CreateBaseCategoryDto> {
    let category: Category | Subcategory | IncomeCategory | OutcomeCategory = null;
    switch (value.type) {
      case CategoryTypeEnum.INCOME:
        category = await this.categoryRepository.findIncomeCategoryByUniqueField({ name: value.name });
        break;
      case CategoryTypeEnum.OUTCOME:
        category = await this.categoryRepository.findOutcomeCategoryByUniqueField({ name: value.name });
        break;
      case CategoryTypeEnum.SUBCATEGORY:
        category = await this.categoryRepository.findSubcategoryByUniqueField({ name: value.name });
        break;
      default:
        category = await this.categoryRepository.findCategoryByUniqueField({ name: value.name });
    }
    if (value instanceof CreateBaseCategoryDto && category) {
      throw new BadRequestException('The name of category must be unique!');
    }
    if (value instanceof UpdateBaseCategoryDto && !category) {
      throw new NotFoundException('Category doesn\'t exist!');
    }
    if (value instanceof CreateSubcategoryDto || value instanceof UpdateSubcategoryDto) {
      const parentCategory = await this.categoryRepository.findCategoryByUniqueField({ id: value.parentId });
      if (!parentCategory) {
        throw new BadRequestException('Parent category with provided id doesn\'t exist!');
      }
    }
    if (value instanceof UpdateBaseCategoryDto) {
      if (category.id !== value.id) {
        throw new BadRequestException('The name of category must be unique!');
      }
    }
    return value;
  }
}
