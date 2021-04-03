import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { BaseCategoryDto, CreateBaseCategoryDto } from '@category/dto';
import { CategoryTypeEnum } from '@category/enums/category-type.enum';
import { Subcategory } from 'src/generated-prisma';

export class SubcategoryDto extends BaseCategoryDto {
  @ApiProperty({ writeOnly: true })
  parentId?: number;

  constructor(input: Partial<Subcategory>) {
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
