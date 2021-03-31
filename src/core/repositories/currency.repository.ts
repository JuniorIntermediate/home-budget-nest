import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Currency } from '@prisma/client';
import {
  CurrencyCreateParams,
  CurrencyGetByUniqueFieldParams,
  CurrencyGetParams,
  CurrencyUpdateParams,
} from '../schema-types/currency.params';

@Injectable()
export class CurrencyRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async createCurrency(data: CurrencyCreateParams): Promise<Currency> {
    return this.prisma.currency.create({ data });
  }

  async updateCurrency(params: CurrencyUpdateParams): Promise<Currency> {
    return this.prisma.currency.update(params);
  }

  async deleteCurrency(id: number): Promise<void> {
    await this.prisma.currency.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    });
  }

  async getCurrencies(params: CurrencyGetParams): Promise<Currency[]> {
    return this.prisma.currency.findMany(params);
  }

  async getCurrencyByUniqueField(where: CurrencyGetByUniqueFieldParams): Promise<Currency | null> {
    return this.prisma.currency.findUnique({ where });
  }
}
