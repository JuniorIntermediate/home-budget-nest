import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { CategoryTypeEnum } from '@category/enums/category-type.enum';
import { Category, IncomeCategory, OutcomeCategory, Subcategory } from 'src/generated-prisma';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsValidEnum } from '@core/models/custom.validator';
import { Transform } from 'class-transformer';
import { OperatorEnum } from '@transaction/enums/filter.enum';

export class BaseCategoryDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ maxLength: 100 })
  @IsString()
  @MaxLength(100)
  icon: string;

  constructor(input: Partial<Category | IncomeCategory | OutcomeCategory | Subcategory>) {
    this.id = input.id;
    this.name = input.name;
    this.icon = input.icon;
  }
}

export class CreateBaseCategoryDto extends OmitType(BaseCategoryDto, ['id'] as const) {
  @ApiHideProperty()
  userId: number;
  @ApiProperty({
    required: false,
    enum: [CategoryTypeEnum.INCOME, CategoryTypeEnum.OUTCOME],
  })
  @Transform(({ value }: ({ value: OperatorEnum })) => (value ? value.toUpperCase() : null), { toClassOnly: true })
  @IsOptional()
  @IsString()
  @IsValidEnum(CategoryTypeEnum)
  type: CategoryTypeEnum;
}

export class UpdateBaseCategoryDto extends IntersectionType(BaseCategoryDto, CreateBaseCategoryDto) {

}
