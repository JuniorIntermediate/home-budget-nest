import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Expense } from '@prisma/client';
import { CurrencyDto } from '../../currency/dto/currency.dto';

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

  @ApiProperty({ required: false, description: 'Pass value only if you want specify category.' })
  subcategoryId: number;

  @ApiProperty({ required: false, description: 'Income/Outcome id should be provided (only one of them)' })
  incomeCategoryId: number;

  @ApiProperty({ required: false, description: 'Income/Outcome id should be provided (only one of them)' })
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
}

export class UpdateExpenseDto extends IntersectionType(ExpenseDto, CreateExpenseDto) {
}
