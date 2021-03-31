import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Currency } from '@prisma/client';
import { ExternalCurrencyInterface } from '../interfaces/external-currency.interface';

export class CurrencyDto {
  @ApiProperty({ description: 'Custom currency identifier.' })
  id: number;

  @ApiProperty({ example: 'USD' })
  code: string;

  @ApiProperty({ example: '4.59' })
  exchangeRate: number;

  constructor(input: Partial<Currency & ExternalCurrencyInterface>) {
    if ((input as Currency).id) {
      this.id = input.id;
      this.code = input.code;
      this.exchangeRate = Number(input.exchangeRate);
    } else {
      this.code = input.code;
      this.exchangeRate = input.mid;
    }
  }
}

export class CreateCurrencyDto extends OmitType(CurrencyDto, ['id'] as const) {
  @ApiHideProperty()
  email: string;
}

export class UpdateCurrencyDto extends IntersectionType(CurrencyDto, CreateCurrencyDto) {
}
