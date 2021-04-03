import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { BudgetType } from '@budget/enums/budget.type';
import { Budget } from 'src/generated-prisma';
import { DateTime } from 'luxon';
import { Transform, Type } from 'class-transformer';
import { OperatorEnum } from '@transaction/enums/filter.enum';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsValidDateTime, IsValidEnum } from '@core/models/custom.validator';

export class BudgetDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty({ readOnly: true, description: 'Value updated  for each transaction / income' })
  currentValue?: number;

  @ApiProperty({ type: 'string', format: 'ISO date-time', example: '2021-04-01T00:00:00.000Z' })
  @Type(() => DateTime)
  @Transform(({ value }: ({ value: string })) => (value ? DateTime.fromISO(value) : null), {
    toClassOnly: true,
  })
  @Transform(({ value }: ({ value: DateTime })) => value ? value.toISO() : null, {
    toPlainOnly: true,
  })
  @IsValidDateTime()
  validMonth: DateTime;

  @ApiProperty({ enum: BudgetType, enumName: 'Budget type.', required: true, example: BudgetType.INCOME })
  @Transform(({ value }: ({ value: OperatorEnum })) => (value ? value.toUpperCase() : null), { toClassOnly: true })
  @IsString()
  @IsValidEnum(BudgetType)
  type: BudgetType;

  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  constructor(input: Partial<Budget>) {
    this.id = input.id;
    this.value = Number(input.value);
    this.currentValue = Number(input.currentValue);
    this.name = input.name;
    this.type = BudgetType[input.type];
    this.validMonth = DateTime.fromJSDate(input.validMonth);
  }
}

export class CreateBudgetDto extends OmitType(BudgetDto, ['id', 'currentValue'] as const) {
  @ApiHideProperty()
  userId: number;
}

export class UpdateBudgetDto extends OmitType(
  IntersectionType(BudgetDto, CreateBudgetDto), ['validMonth', 'currentValue'] as const) {
}
