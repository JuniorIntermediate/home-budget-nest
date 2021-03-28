import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { GetCategoryWithSubCategories } from 'src/core/schema-types/category-with-sub-categories.type';
import { SubCategoryDto } from './sub-category.dto';

export class CategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty({ readOnly: true })
  userId?: number;

  @ApiProperty({ type: [SubCategoryDto] })
  subCategories?: SubCategoryDto[];

  constructor(input?: Partial<GetCategoryWithSubCategories>) {
    this.id = input.id;
    this.name = input.name;
    this.icon = input.icon;
    this.subCategories = input.subCategories.map(subCategory => ({
      id: subCategory.id,
      icon: subCategory.icon,
      name: subCategory.name,
    }));
    this.userId = input.userId;
  }
}

export class CreateCategoryDto extends OmitType(CategoryDto, ['id'] as const) {
  @ApiHideProperty()
  email: string;
}

export class UpdateCategoryDto extends IntersectionType(CategoryDto, CreateCategoryDto) {
}
