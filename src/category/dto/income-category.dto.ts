import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IncomeCategory } from '@prisma/client';

export class IncomeCategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  constructor(input?: Partial<IncomeCategory>) {
    this.id = input.id;
    this.name = input.name;
    this.icon = input.icon;
  }
}

export class CreateIncomeCategoryDto extends OmitType(IncomeCategoryDto, ['id'] as const) {
  @ApiHideProperty()
  email: string;
}

export class UpdateIncomeCategoryDto extends IntersectionType(IncomeCategoryDto, CreateIncomeCategoryDto) {
}
