import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { BaseCategoryDto, SubcategoryDto } from '@category/dto';
import { Category } from 'src/generated-prisma';

@ApiExtraModels(BaseCategoryDto)
export class CategoryDto extends BaseCategoryDto {
  @ApiProperty({ type: [SubcategoryDto], required: false, readOnly: true })
  subCategories?: SubcategoryDto[];

  constructor(input?: Partial<Category>) {
    super(input);
  }
}
