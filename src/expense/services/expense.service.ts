import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto, ExpenseDto } from '../dto/expense.dto';
import { UserRepository } from '../../core/repositories/user.repository';
import { ExpenseRepository } from '../../core/repositories/expense.repository';
import { ExpenseCreateParams } from '../../core/schema-types/expense.params';
import { Mapper } from '../../core/factories/mapper';
import { CurrencyRepository } from '../../core/repositories/currency.repository';
import { BudgetRepository } from '../../core/repositories/budget.repository';
import { PayerRepository } from '../../core/repositories/payer.repository';
import { CategoryRepository } from '../../core/repositories/category.repository';
import { BudgetUpdateParams } from '../../core/schema-types/budget.params';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly expenseRepository: ExpenseRepository,
    private readonly mapper: Mapper,
    private readonly currencyRepository: CurrencyRepository,
    private readonly budgetRepository: BudgetRepository,
    private readonly payerRepository: PayerRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {
  }

  async createExpense(createExpenseDto: CreateExpenseDto): Promise<ExpenseDto> {
    const user = await this.userRepository.findUserByUniqueField({ email: createExpenseDto.email });
    if (!user) {
      throw new BadRequestException('User doesn\'t exist!');
    }
    const budget = await this.budgetRepository.getBudgetByUniqueField({ id: createExpenseDto.budgetId });
    if (!budget) {
      throw new BadRequestException('Budget doesn\'t exist!');
    }
    const payer = await this.payerRepository.getPayerByUniqueField({ id: createExpenseDto.payerId });
    if (!payer) {
      throw new BadRequestException('Payer doesn\'t exist!');
    }
    const category = await this.categoryRepository
      .findCategoryByUniqueFieldWithSubcategory(createExpenseDto.categoryId, createExpenseDto.subcategoryId);
    if (!category) {
      throw new BadRequestException('Category doesn\'t exist!');
    }
    if (createExpenseDto.incomeCategoryId) {
      const incomeCategory = await this.categoryRepository.findIncomeCategoryByUniqueField({ id: createExpenseDto.incomeCategoryId });
      if (!incomeCategory) {
        throw new BadRequestException('Income category doesn\'t exist!');
      }
    }
    if (createExpenseDto.outcomeCategoryId) {
      const outcomeCategory = await this.categoryRepository.findOutcomeCategoryByUniqueField({ id: createExpenseDto.outcomeCategoryId });
      if (!outcomeCategory) {
        throw new BadRequestException('Outcome category doesn\'t exist!');
      }
    }
    const currency = await this.currencyRepository.getCurrencyByUniqueField({ code: createExpenseDto.currency.code });
    if (currency && currency.isDeleted) {
      await this.currencyRepository.updateCurrency({
        data: { isDeleted: false, exchangeRate: createExpenseDto.currency.exchangeRate },
        where: { code: createExpenseDto.currency.code },
      });
    }
    const budgetUpdateData: BudgetUpdateParams = {
      data: {
        currentValue: Number(budget.currentValue) + createExpenseDto.amount,
      },
      where: {
        id: createExpenseDto.budgetId,
      },
    };
    let data: ExpenseCreateParams = {
      currency: {
        connect: {
          code: createExpenseDto.currency.code,
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
}
