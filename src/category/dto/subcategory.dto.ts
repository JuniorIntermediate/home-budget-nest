import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { SubCategory } from '@prisma/client';
import { BaseCategoryDto, CreateBaseCategoryDto } from './base-category.dto';
import { CategoryTypeEnum } from '../enums/category-type.enum';

export class SubcategoryDto extends BaseCategoryDto {
  @ApiProperty({ writeOnly: true })
  parentId?: number;

  constructor(input: Partial<SubCategory>) {
    super(input);
  }
}

export class CreateSubcategoryDto
  extends IntersectionType(OmitType(SubcategoryDto, ['id'] as const), OmitType(CreateBaseCategoryDto, ['type'] as const)) {
  @ApiHideProperty()
  type: CategoryTypeEnum.SUBCATEGORY;
}

export class UpdateSubcategoryDto extends IntersectionType(SubcategoryDto, CreateSubcategoryDto) {
}
