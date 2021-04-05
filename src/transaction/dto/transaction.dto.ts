import { ApiHideProperty, ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { DateTime } from 'luxon';
import { Transaction } from 'src/generated-prisma';
import { IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CurrencyDto } from '@currency/dto/currency.dto';
import { IsValidDateTime, IsValidEnum } from '@core/models/custom.validator';
import { GroupByEnum } from '@transaction/enums/filter.enum';

export class TransactionDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({ type: 'string', format: 'ISO date-time', example: '2021-04-01T00:00:00.000Z' })
  @Type(() => DateTime)
  @Transform(({ value }: ({ value: string })) => (value ? DateTime.fromISO(value) : null), {
    toClassOnly: true,
  })
  @Transform(({ value }: ({ value: DateTime })) => value ? value.toISO() : null, {
    toPlainOnly: true,
  })
  @IsValidDateTime()
  date: DateTime;

  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  note: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  payerId: number;

  @Expose()
  @ApiProperty({ required: true, example: { code: 'PLN' } })
  @Transform(({ value }: { value: CurrencyDto }) => value || new CurrencyDto(), { toClassOnly: true })
  @Type(() => CurrencyDto)
  @IsOptional()
  @ValidateNested()
  currency: CurrencyDto;

  @ApiProperty()
  budgetId: number;

  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({ required: false, description: 'Pass value only if you want specify category.' })
  @IsNumber()
  @IsOptional()
  subcategoryId: number;

  @ApiProperty({ required: false, description: 'Only one of income|outcome id should be provided!' })
  @IsNumber()
  @IsOptional()
  incomeCategoryId: number;

  @ApiProperty({ required: false, description: 'Only one of income|outcome id should be provided!' })
  @IsNumber()
  @IsOptional()
  outcomeCategoryId: number;

  constructor(input: Partial<Transaction>) {
    this.id = input.id;
    this.date = DateTime.fromJSDate(input.date);
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

export class CreateTransactionDto extends OmitType(TransactionDto, ['id'] as const) {
  @ApiHideProperty()
  userId: number;

  @ApiHideProperty()
  budgetCurrentValue: number;
}

export class GroupTransactionDto extends PickType(TransactionDto,
  ['budgetId', 'categoryId', 'incomeCategoryId', 'outcomeCategoryId', 'payerId', 'subcategoryId']) {
  @ApiProperty({ description: 'Transaction ids included in group', type: [Number] })
  transaction_ids: number[];
  @ApiProperty({ description: 'Grouped by value' })
  group_by_value: number;
}

export class TransactionPaginationDto {
  @ApiProperty({ type: TransactionDto })
  items: TransactionDto[];

  @ApiProperty()
  total: number;
}

export class GroupTransactionQueryDto {
  @ApiProperty({
    required: true,
    enum: GroupByEnum,
    example: GroupByEnum.MONTH,
    description: 'Aggregate transaction by specified group',
  })
  @IsValidEnum(GroupByEnum)
  group: GroupByEnum;

  @ApiProperty({ type: 'string', format: 'ISO date-time', example: '2021-04-01T00:00:00.000Z', required: false })
  @Type(() => DateTime)
  @Transform(({ value }: ({ value: string })) => (value ? DateTime.fromISO(value) : null), {
    toClassOnly: true,
  })
  @Transform(({ value }: ({ value: DateTime })) => value ? value.toISO() : null, {
    toPlainOnly: true,
  })
  @IsOptional()
  @IsValidDateTime()
  dateFrom: DateTime;

  @ApiProperty({ type: 'string', format: 'ISO date-time', example: '2021-04-01T00:00:00.000Z', required: false })
  @Type(() => DateTime)
  @Transform(({ value }: ({ value: string })) => (value ? DateTime.fromISO(value) : null), {
    toClassOnly: true,
  })
  @Transform(({ value }: ({ value: DateTime })) => value ? value.toISO() : null, {
    toPlainOnly: true,
  })
  @IsOptional()
  @IsValidDateTime()
  dateTo: DateTime;
}
