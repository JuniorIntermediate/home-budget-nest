import { BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { CreateCurrencyDto, UpdateCurrencyDto } from '@currency/dto/currency.dto';
import { CurrencyRepository } from '@core/repositories/currency.repository';

@Injectable()
export class CurrencyValidatorPipe implements PipeTransform {

  constructor(
    private readonly currencyRepository: CurrencyRepository,
  ) {
  }

  async transform(value: CreateCurrencyDto): Promise<CreateCurrencyDto> {
    const currency = await this.currencyRepository.getCurrencyByUniqueField({ code: value.code });
    if (value instanceof CreateCurrencyDto && currency) {
      throw new BadRequestException('The currency code must be unique!');
    }
    if (value instanceof UpdateCurrencyDto && !currency) {
      throw new NotFoundException('The currency not found!');
    }
    if (value instanceof UpdateCurrencyDto) {
      if (currency.id !== value.id) {
        throw new BadRequestException('The currency code must be unique!');
      }
    }
    return value;
  }
}
