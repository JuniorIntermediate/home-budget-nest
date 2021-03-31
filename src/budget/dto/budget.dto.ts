import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Budget } from '@prisma/client';

export class BudgetDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: number;

  @ApiProperty({ readOnly: true, description: 'Value updated  for each expense / income' })
  currentValue?: number;

  @ApiProperty()
  name: string;

  constructor(input: Partial<Budget>) {
    this.id = input.id;
    this.value = Number(input.value);
    this.currentValue = Number(input.currentValue);
    this.name = input.name;
  }
}

export class CreateBudgetDto extends OmitType(BudgetDto, ['id'] as const) {
  @ApiHideProperty()
  email: string;
}

export class UpdateBudgetDto extends IntersectionType(BudgetDto, CreateBudgetDto) {
}
