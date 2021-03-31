import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Category, IncomeCategory, OutcomeCategory, SubCategory } from '@prisma/client';
import { CategoryTypeEnum } from '../enums/category-type.enum';

export class BaseCategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  constructor(input: Partial<Category | IncomeCategory | OutcomeCategory | SubCategory>) {
    this.id = input.id;
    this.name = input.name;
    this.icon = input.icon;
  }
}

export class CreateBaseCategoryDto extends OmitType(BaseCategoryDto, ['id'] as const) {
  @ApiHideProperty()
  email: string;
  @ApiProperty({
    enum: [CategoryTypeEnum.INCOME, CategoryTypeEnum.OUTCOME],
  })
  type: CategoryTypeEnum;
}

export class UpdateBaseCategoryDto extends IntersectionType(BaseCategoryDto, CreateBaseCategoryDto) {

}
