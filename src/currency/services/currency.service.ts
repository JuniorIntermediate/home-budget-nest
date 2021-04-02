import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrencyRepository } from '../../core/repositories/currency.repository';
import { CurrencyCreateParams, CurrencyGetParams, CurrencyUpdateParams } from '../../core/schema-types/currency.params';
import { CreateCurrencyDto, CurrencyDto, UpdateCurrencyDto } from '../dto/currency.dto';
import { ExternalApiService } from './external-api.service';

@Injectable()
export class CurrencyService {

  constructor
  (
    private readonly currencyRepository: CurrencyRepository,
    private readonly externalApiService: ExternalApiService,
  ) {
  }

  async getCurrencies(email: string): Promise<CurrencyDto[]> {
    const params: CurrencyGetParams = {
      where: {
        user: {
          email,
        },
        isDeleted: false,
      },
    };
    const currenciesFromRepository = await this.currencyRepository.getCurrencies(params);
    let currencies: CurrencyDto[];
    try {
      const currenciesFromExternalApi = await this.externalApiService.getCurrencies();
      currencies = [...currenciesFromRepository, ...currenciesFromExternalApi.rates].reduce<CurrencyDto[]>(
        (acc: CurrencyDto[], currency) => {
          if (acc.find(y => y.code === currency.code)) {
            return acc;
          } else {
            return [...acc, new CurrencyDto(currency)];
          }
        }, [],
      );
    } catch (e) {
      currencies = currenciesFromRepository.map(currency => new CurrencyDto(currency));
    }
    return currencies.sort((a, b) => a.code.localeCompare(b.code));
  }

  async createCurrency(currencyDto: CreateCurrencyDto): Promise<CurrencyDto> {
    const currency = await this.currencyRepository.getCurrencyByUniqueField({ code: currencyDto.code });
    if (currency) {
      throw new BadRequestException('The currency code must be unique!');
    }
    const data: CurrencyCreateParams = {
      code: currencyDto.code,
      exchangeRate: currencyDto.exchangeRate,
      user: {
        connect: {
          email: currencyDto.email,
        },
      },
    };
    const createdCurrency = await this.currencyRepository.createCurrency(data);
    return new CurrencyDto(createdCurrency);
  }

  async updateCurrency(currencyDto: UpdateCurrencyDto): Promise<CurrencyDto> {
    const currency = await this.currencyRepository.getCurrencyByUniqueField({ code: currencyDto.code });
    if (currency && currency.id !== currencyDto.id) {
      throw new BadRequestException('The currency code must be unique!');
    }
    const params: CurrencyUpdateParams = {
      data: {
        code: currencyDto.code,
        exchangeRate: currencyDto.exchangeRate,
      },
      where: {
        id: currencyDto.id,
      },
    };
    const updatedCurrency = await this.currencyRepository.updateCurrency(params);
    return new CurrencyDto(updatedCurrency);
  }

  async deleteCurrency(id: number): Promise<void> {
    await this.currencyRepository.deleteCurrency(id);
  }
}
