import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty({ readOnly: true })
  userId?: number;

  @ApiProperty()
  parentCategoryId?: number;

  constructor(input?: Partial<CategoryDto>) {
    this.id = input.id;
    this.name = input.name;
    this.icon = input.icon;
    this.parentCategoryId = input.parentCategoryId;
    this.userId = input.userId;
  }
}

export class CreateCategoryDto extends OmitType(CategoryDto, ['id'] as const) {
  @ApiHideProperty()
  email: string;
}

export class UpdateCategoryDto extends IntersectionType(CategoryDto, CreateCategoryDto) {
}
