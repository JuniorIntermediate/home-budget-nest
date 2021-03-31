import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { SubCategoryDto } from './sub-category.dto';

export class CategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiHideProperty()
  userId?: number;

  @ApiProperty({ type: [SubCategoryDto] })
  subCategories?: SubCategoryDto[];

  constructor(input?: Partial<Category>) {
    this.id = input.id;
    this.name = input.name;
    this.icon = input.icon;
    this.userId = input.userId;
  }
}

export class CreateCategoryDto extends OmitType(CategoryDto, ['id', 'subCategories'] as const) {
  @ApiHideProperty()
  email: string;
}

export class UpdateCategoryDto extends IntersectionType(OmitType(CategoryDto, ['subCategories'] as const), CreateCategoryDto) {
}
