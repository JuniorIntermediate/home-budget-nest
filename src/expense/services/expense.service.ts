import { Injectable } from '@nestjs/common';
import {
  CreateExpenseDto,
  ExpenseDto,
  ExpensePaginationDto,
  GroupExpenseDto,
  GroupExpenseQueryDto,
} from '../dto/expense.dto';
import { ExpenseRepository } from '../../core/repositories/expense.repository';
import { ExpenseCreateParams, ExpenseGetParams } from '../../core/schema-types/expense.params';
import { Mapper } from '../../core/factories/mapper';
import { CurrencyRepository } from '../../core/repositories/currency.repository';
import { BudgetRepository } from '../../core/repositories/budget.repository';
import { BudgetUpdateParams } from '../../core/schema-types/budget.params';
import { QueryParamsDto } from '../dto/query-params.dto';
import { CurrencyDto } from '../../currency/dto/currency.dto';
import { FilterBuilder } from './filter.builder';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly currencyRepository: CurrencyRepository,
    private readonly budgetRepository: BudgetRepository,
    private readonly mapper: Mapper,
    private readonly filterBuilder: FilterBuilder,
  ) {
  }

  async createExpense(createExpenseDto: CreateExpenseDto): Promise<ExpenseDto> {
    const currency = await this.currencyRepository.getCurrencyByUniqueField({ code: createExpenseDto.currency.code });
    if (currency && currency.isDeleted) {
      await this.currencyRepository.updateCurrency({
        data: { isDeleted: false, exchangeRate: createExpenseDto.currency.exchangeRate },
        where: { code: createExpenseDto.currency.code },
      });
    }
    const budgetUpdateData: BudgetUpdateParams = {
      data: {
        currentValue: createExpenseDto.budgetCurrentValue + createExpenseDto.amount,
      },
      where: {
        id: createExpenseDto.budgetId,
      },
    };
    let data: ExpenseCreateParams = {
      currency: {
        connectOrCreate: {
          where: {
            code: createExpenseDto.currency.code,
          },
          create: {
            code: createExpenseDto.currency.code,
            exchangeRate: createExpenseDto.currency.exchangeRate,
            user: {
              connect: {
                email: createExpenseDto.email,
              },
            },
          },
        },
      },
      category: {
        connect: {
          id: createExpenseDto.categoryId,
        },
      },
      amount: createExpenseDto.amount,
      note: createExpenseDto.note,
      date: createExpenseDto.date,
      payer: {
        connect: {
          id: createExpenseDto.payerId,
        },
      },
      payFrom: {
        connect: {
          id: createExpenseDto.budgetId,
        },
      },
    };
    if (createExpenseDto.subcategoryId) {
      data = {
        ...data, subcategory: {
          connect: {
            id: createExpenseDto.subcategoryId,
          },
        },
      };
    }
    if (createExpenseDto.incomeCategoryId) {
      data = {
        ...data,
        incomeCategory: {
          connect: {
            id: createExpenseDto.incomeCategoryId,
          },
        },
      };
    }
    if (createExpenseDto.outcomeCategoryId) {
      data = {
        ...data,
        outcomeCategory: {
          connect: {
            id: createExpenseDto.outcomeCategoryId,
          },
        },
      };
    }
    await this.budgetRepository.updateBudget(budgetUpdateData);
    const createdExpense = await this.expenseRepository.createExpense(data);
    return this.mapper.mapToDto(createdExpense, ExpenseDto);
  }

  async getExpensesGroupedByMonth(query: GroupExpenseQueryDto): Promise<GroupExpenseDto[]> {
    return this.expenseRepository.aggregateExpensesByMonth(query?.dateFrom, query?.dateTo);
  }

  async getExpenses(query?: QueryParamsDto): Promise<ExpensePaginationDto> {
    if (!query) {
      const expenses = await this.expenseRepository.getExpenses();
      const items = expenses.map(expense => ({
        ...this.mapper.mapToDto(expense, ExpenseDto),
        currency: this.mapper.mapToDto(expense.currency, CurrencyDto),
      }));
      return {
        items,
        total: items.length,
      };
    }
    const queryBuilder: ExpenseGetParams = this.filterBuilder
      .withLimit(query)
      .withFilters(query)
      .withOrder(query)
      .build();
    const expenses = await this.expenseRepository.getExpenses(queryBuilder);
    const items = expenses.map(expense => ({
      ...this.mapper.mapToDto(expense, ExpenseDto),
      currency: this.mapper.mapToDto(expense.currency, CurrencyDto),
    }));
    return {
      items,
      total: items.length,
    };
  }
}
