import { BadRequestException, Injectable } from '@nestjs/common';
import { BudgetDto, CreateBudgetDto, UpdateBudgetDto } from '@budget/dto/budget.dto';
import { BudgetRepository } from '@core/repositories/budget.repository';
import { BudgetCreateParams, BudgetGetParams, BudgetUpdateParams } from '@core/schema-types/budget.params';
import { Mapper } from '@core/factories/mapper';
import { BudgetType } from 'src/generated-prisma';

@Injectable()
export class BudgetService {

  constructor(
    private readonly budgetRepository: BudgetRepository,
    private mapper: Mapper,
  ) {
  }


  async getBudgets(id: number): Promise<BudgetDto[]> {
    const params: BudgetGetParams = {
      where: {
        user: {
          id,
        },
        isDeleted: false,
      },
    };
    const budgets = await this.budgetRepository.getBudgets(params);
    return budgets.map(budget => this.mapper.mapToDto(budget, BudgetDto));
  }

  async getBudget(id: number): Promise<BudgetDto> {
    const budget = await this.budgetRepository.getBudgetByUniqueField({ id });
    return this.mapper.mapToDto(budget, BudgetDto);
  }

  async createBudget(createBudgetDto: CreateBudgetDto): Promise<BudgetDto> {
    const data: BudgetCreateParams = {
      name: createBudgetDto.name,
      value: createBudgetDto.value,
      currentValue: createBudgetDto.value,
      type: createBudgetDto.type.toUpperCase() as BudgetType,
      validMonth: createBudgetDto.validMonth.toJSDate(),
      user: {
        connect: {
          id: createBudgetDto.userId,
        },
      },
    };
    const createBudget = await this.budgetRepository.createBudget(data);
    return this.mapper.mapToDto(createBudget, BudgetDto);
  }

  async updateBudget(updateBudgetDto: UpdateBudgetDto): Promise<BudgetDto> {
    const budget = await this.budgetRepository.getBudgetByUniqueField({ id: updateBudgetDto.id });
    if (!budget) {
      throw new BadRequestException('Budget not found!');
    }
    const params: BudgetUpdateParams = {
      data: {
        name: updateBudgetDto.name,
        value: updateBudgetDto.value,
        type: updateBudgetDto.type.toUpperCase() as BudgetType,
      },
      where: {
        id: updateBudgetDto.id,
      },
    };
    const updateBudget = await this.budgetRepository.updateBudget(params);
    return this.mapper.mapToDto(updateBudget, BudgetDto);
  }

  async deleteBudget(id: number): Promise<void> {
    await this.budgetRepository.deleteBudget(id);
  }
}
