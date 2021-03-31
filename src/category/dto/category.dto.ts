import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { SubcategoryDto } from './subcategory.dto';
import { BaseCategoryDto } from './base-category.dto';

@ApiExtraModels(BaseCategoryDto)
export class CategoryDto extends BaseCategoryDto {
  @ApiProperty({ type: [SubcategoryDto], required: false, readOnly: true })
  subCategories?: SubcategoryDto[];

  constructor(input?: Partial<Category>) {
    super(input);
  }
}
