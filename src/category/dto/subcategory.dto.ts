import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { SubCategory } from '@prisma/client';
import { BaseCategoryDto, CreateBaseCategoryDto, UpdateBaseCategoryDto } from './base-category.dto';

export class SubcategoryDto extends BaseCategoryDto {
  @ApiProperty({ writeOnly: true })
  parentId?: number;

  constructor(input: Partial<SubCategory>) {
    super(input);
  }
}

export class CreateSubcategoryDto extends IntersectionType(OmitType(SubcategoryDto, ['id'] as const), CreateBaseCategoryDto) {
}

export class UpdateSubcategoryDto extends IntersectionType(SubcategoryDto, UpdateBaseCategoryDto) {
}
