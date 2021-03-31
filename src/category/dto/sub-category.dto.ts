import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { SubCategory } from '@prisma/client';

export class SubCategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty({ writeOnly: true })
  parentId?: number;

  constructor(input: Partial<SubCategory>) {
    this.id = input.id;
    this.name = input.name;
    this.icon = input.icon;
  }
}

export class CreateSubCategoryDto extends OmitType(SubCategoryDto, ['id'] as const) {
}

export class UpdateSubCategoryDto extends IntersectionType(SubCategoryDto, CreateSubCategoryDto) {
}
