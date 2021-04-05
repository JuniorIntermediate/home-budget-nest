import { Injectable } from '@nestjs/common';
import {
  CreateTransactionDto,
  GroupTransactionDto,
  GroupTransactionQueryDto,
  TransactionDto,
  TransactionPaginationDto,
} from '@transaction/dto/transaction.dto';
import { TransactionRepository } from '@core/repositories/transaction.repository';
import {
  GetTransactionWithCurrency,
  TransactionCreateParams,
  TransactionGetParams,
} from '@core/schema-types/transaction.params';
import { Mapper } from '@core/factories/mapper';
import { CurrencyRepository } from '@core/repositories/currency.repository';
import { BudgetRepository } from '@core/repositories/budget.repository';
import { BudgetUpdateParams } from '@core/schema-types/budget.params';
import { QueryParamsDto } from '@transaction/dto/query-params.dto';
import { CurrencyDto } from '@currency/dto/currency.dto';
import { FilterBuilder } from '@transaction/services/filter.builder';
import { Currency } from 'src/generated-prisma';
import { DEFAULT_CURRENCY } from '@core/models/constants';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly currencyRepository: CurrencyRepository,
    private readonly budgetRepository: BudgetRepository,
    private readonly mapper: Mapper,
    private readonly filterBuilder: FilterBuilder,
  ) {
  }

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionDto> {
    const { currency, amount } = createTransactionDto;
    const currentValue = createTransactionDto.budgetCurrentValue + (amount * currency.exchangeRate);
    const budgetUpdateData: BudgetUpdateParams = {
      data: {
        currentValue,
      },
      where: {
        id: createTransactionDto.budgetId,
      },
    };
    let data: TransactionCreateParams = {
      category: {
        connect: {
          id: createTransactionDto.categoryId,
        },
      },
      amount: amount,
      note: createTransactionDto.note,
      date: createTransactionDto.date.toJSDate(),
      payer: {
        connect: {
          id: createTransactionDto.payerId,
        },
      },
      payFrom: {
        connect: {
          id: createTransactionDto.budgetId,
        },
      },
    };
    if (currency.id) {
      data = {
        ...data,
        currency: {
          connect: {
            id: currency.id,
          },
        },
      };
    } else if (currency.code !== DEFAULT_CURRENCY.currency) {
      data = {
        ...data,
        exchangeRate: currency.exchangeRate,
        currencyCode: currency.code,
      };
    }
    if (createTransactionDto.subcategoryId) {
      data = {
        ...data, subcategory: {
          connect: {
            id: createTransactionDto.subcategoryId,
          },
        },
      };
    }
    if (createTransactionDto.incomeCategoryId) {
      data = {
        ...data,
        incomeCategory: {
          connect: {
            id: createTransactionDto.incomeCategoryId,
          },
        },
      };
    }
    if (createTransactionDto.outcomeCategoryId) {
      data = {
        ...data,
        outcomeCategory: {
          connect: {
            id: createTransactionDto.outcomeCategoryId,
          },
        },
      };
    }
    await this.budgetRepository.updateBudget(budgetUpdateData);
    const transaction = await this.transactionRepository.createTransaction(data);
    return this.mapper.mapToDto(transaction, TransactionDto);
  }

  async getTransactionsGroupedByMonth(query: GroupTransactionQueryDto): Promise<GroupTransactionDto[]> {
    return this.transactionRepository.aggregateTransactionsBy(query.group, query?.dateFrom, query?.dateTo);
  }

  async getTransactions(query?: QueryParamsDto): Promise<TransactionPaginationDto> {
    return !query ? this.getAllTransactions() : this.getFilteredTransactions(query);
  }

  async getTransaction(id: number): Promise<TransactionDto> {
    const transaction = await this.transactionRepository.getTransactionByUniqueField({id});
    return { ...this.mapper.mapToDto(transaction, TransactionDto), currency: this.applyCurrency(transaction) };
  }

  private getAllTransactions = async (): Promise<TransactionPaginationDto> => {
    const transactions  = await this.transactionRepository.getTransactions();
    const items = transactions.map(transaction => {
      return { ...this.mapper.mapToDto(transaction, TransactionDto), currency: this.applyCurrency(transaction) };
    });
    return {
      items,
      total: items.length,
    };
  };

  private getFilteredTransactions = async (query: QueryParamsDto): Promise<TransactionPaginationDto> => {
    const queryBuilder: TransactionGetParams = this.filterBuilder
      .withLimit(query)
      .withFilters(query)
      .withOrder(query)
      .build();
    const transactions  = await this.transactionRepository.getTransactions(queryBuilder);
    const items = transactions.map(transaction => {
      return { ...this.mapper.mapToDto(transaction, TransactionDto), currency: this.applyCurrency(transaction) };
    });
    return {
      items,
      total: items.length,
    };
  };

  private applyCurrency = (transaction: GetTransactionWithCurrency) => {
    if (transaction.currency) {
      return this.mapper.mapToDto(transaction.currency, CurrencyDto);
    } else if (transaction.currencyCode && transaction.exchangeRate) {
      const currency: Partial<Currency> = {
        exchangeRate: transaction.exchangeRate,
        code: transaction.currencyCode,
      };
      return this.mapper.mapToDto(currency, CurrencyDto);
    }
    return this.mapper.mapToDto(null, CurrencyDto);
  };
}
