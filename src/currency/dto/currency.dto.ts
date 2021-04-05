import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { ExternalCurrencyInterface } from '@currency/interfaces/external-currency.interface';
import { Currency } from 'src/generated-prisma';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_CURRENCY } from '@core/models/constants';

export class CurrencyDto {
  @ApiProperty({ description: 'Custom currency identifier', required: false })
  @IsOptional()
  id: number;

  @ApiProperty({
    example: 'USD',
    description: 'Valid ISO 4217 code (required for not default currency in transactions)',
    maxLength: 3,
    required: false,
    default: 'PLN',
  })
  @Transform(({ value }: { value: string }) => value || DEFAULT_CURRENCY.currency)
  @IsString()
  @MaxLength(3)
  code: string;

  @ApiProperty({
    example: 4.59,
    description: 'Currency exchange rate (required for not default currency in transactions)',
    required: false,
    default: 1.0,
  })
  @Transform(({ value }: { value: number }) => value || DEFAULT_CURRENCY.exchangeRate)
  @IsOptional()
  @IsNumber()
  exchangeRate: number;

  constructor(input?: Partial<Currency & ExternalCurrencyInterface>) {
    if (input) {
      if ((input as Currency)?.id) {
        this.id = input?.id;
        this.code = input?.code;
        this.exchangeRate = Number(input?.exchangeRate);
      } else {
        this.code = input?.code;
        this.exchangeRate = input?.mid;
      }
    } else {
      this.code = DEFAULT_CURRENCY.currency;
      this.exchangeRate = DEFAULT_CURRENCY.exchangeRate;
    }
  }
}

export class CreateCurrencyDto extends OmitType(CurrencyDto, ['id'] as const) {
  @ApiHideProperty()
  userId: number;
}

export class UpdateCurrencyDto extends IntersectionType(CurrencyDto, CreateCurrencyDto) {
}
