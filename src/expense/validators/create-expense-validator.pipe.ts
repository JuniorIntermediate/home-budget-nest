import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { BudgetRepository } from '../../core/repositories/budget.repository';
import { PayerRepository } from '../../core/repositories/payer.repository';
import { CategoryRepository } from '../../core/repositories/category.repository';
import { CreateExpenseDto } from '../dto/expense.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CreateExpenseValidatorPipe implements PipeTransform {
  constructor(
    private readonly budgetRepository: BudgetRepository,
    private readonly payerRepository: PayerRepository,
    private readonly categoryRepository: CategoryRepository
  ) {
  }

  async transform(value: CreateExpenseDto): Promise<CreateExpenseDto> {
    const budget = await this.budgetRepository.getBudgetByUniqueField({ id: value.budgetId });
    if (!budget) {
      throw new BadRequestException('Budget doesn\'t exist!');
    }
    const payer = await this.payerRepository.getPayerByUniqueField({ id: value.payerId });
    if (!payer) {
      throw new BadRequestException('Payer doesn\'t exist!');
    }
    const category = await this.categoryRepository
      .findCategoryByUniqueFieldWithSubcategory(value.categoryId, value.subcategoryId);
    if (!category) {
      throw new BadRequestException('Category doesn\'t exist!');
    }
    if (value.incomeCategoryId) {
      const incomeCategory = await this.categoryRepository.findIncomeCategoryByUniqueField({ id: value.incomeCategoryId });
      if (!incomeCategory) {
        throw new BadRequestException('Income category doesn\'t exist!');
      }
    }
    if (value.outcomeCategoryId) {
      const outcomeCategory = await this.categoryRepository.findOutcomeCategoryByUniqueField({ id: value.outcomeCategoryId });
      if (!outcomeCategory) {
        throw new BadRequestException('Outcome category doesn\'t exist!');
      }
    }
    return plainToClass(CreateExpenseDto, { ...value, budgetCurrentValue: Number(budget.currentValue) });
  }
}
