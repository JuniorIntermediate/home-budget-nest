import { ApiHideProperty, ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Expense } from '@prisma/client';
import { CurrencyDto } from '../../currency/dto/currency.dto';
import { Transform, Type } from 'class-transformer';
import { DateTime } from 'luxon';

export class ExpenseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: Date })
  date: Date;

  @ApiProperty({ maxLength: 255 })
  note: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  payerId: number;

  @ApiProperty()
  currency: CurrencyDto;

  @ApiProperty()
  budgetId: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty({ required: false })
  subcategoryId: number;

  @ApiProperty({ required: false })
  incomeCategoryId: number;

  @ApiProperty({ required: false })
  outcomeCategoryId: number;

  constructor(input: Partial<Expense>) {
    this.id = input.id;
    this.date = input.date;
    this.note = input.note;
    this.amount = Number(input.amount);
    this.payerId = input.payerId;
    this.budgetId = input.budgetId;
    this.categoryId = input.categoryId;
    this.outcomeCategoryId = input.outcomeCategoryId;
    this.subcategoryId = input.subcategoryId;
    this.incomeCategoryId = input.incomeCategoryId;
  }
}

export class CreateExpenseDto extends OmitType(ExpenseDto, ['id'] as const) {
  @ApiHideProperty()
  email: string;
  @ApiProperty({ required: false, description: 'Pass value only if you want specify category.' })
  subcategoryId: number;

  @ApiProperty({ required: false, description: 'Income/Outcome id should be provided (only one of them)' })
  incomeCategoryId: number;

  @ApiProperty({ required: false, description: 'Income/Outcome id should be provided (only one of them)' })
  outcomeCategoryId: number;

  @ApiHideProperty()
  budgetCurrentValue: number;
}

export class GroupExpenseDto extends PickType(ExpenseDto,
  ['budgetId', 'amount', 'categoryId', 'incomeCategoryId', 'outcomeCategoryId', 'payerId', 'subcategoryId']) {
  @ApiProperty({ description: 'Month as number' })
  month: number;
}

export class ExpensePaginationDto {
  @ApiProperty({ type: ExpenseDto })
  items: ExpenseDto[];

  @ApiProperty()
  total: number;
}

export class GroupExpenseQueryDto {
  @ApiProperty({ type: DateTime, example: '2021-04-01T00:00:00.000Z', required: false })
  @Type(() => DateTime)
  @Transform(({ value }) => (value ? DateTime.fromISO(value) : null), {
    toClassOnly: true,
  })
  dateFrom: DateTime;

  @ApiProperty({ type: DateTime, example: '2021-04-01T00:00:00.000Z', required: false })
  @Type(() => DateTime)
  @Transform(({ value }) => (value ? DateTime.fromISO(value) : null), {
    toClassOnly: true,
  })
  dateTo: DateTime;
}
