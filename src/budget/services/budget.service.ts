import { BadRequestException, Injectable } from '@nestjs/common';
import { BudgetDto, CreateBudgetDto, UpdateBudgetDto } from '../dto/budget.dto';
import { BudgetRepository } from '../../core/repositories/budget.repository';
import { BudgetCreateParams, BudgetGetParams, BudgetUpdateParams } from '../../core/schema-types/budget.params';
import { Mapper } from '../../core/factories/mapper';
import { UserRepository } from '../../core/repositories/user.repository';

@Injectable()
export class BudgetService {

  constructor(
    private readonly budgetRepository: BudgetRepository,
    private mapper: Mapper,
    private userRepository: UserRepository,
  ) {
  }


  async getBudgets(email: string): Promise<BudgetDto[]> {
    const params: BudgetGetParams = {
      where: {
        user: {
          email,
        },
        isDeleted: false,
      },
    };
    const budgets = await this.budgetRepository.getBudgets(params);
    return budgets.map(budget => this.mapper.mapToDto(budget, BudgetDto));
  }

  async createBudget(createBudgetDto: CreateBudgetDto): Promise<BudgetDto> {
    const user = await this.userRepository.findUserByUniqueField({ email: createBudgetDto.email });
    if (!user) {
      throw new BadRequestException('User doesn\'t exist!');
    }
    const data: BudgetCreateParams = {
      name: createBudgetDto.name,
      value: createBudgetDto.value,
      currentValue: createBudgetDto.value,
      user: {
        connect: {
          email: createBudgetDto.email,
        },
      },
    };
    const createBudget = await this.budgetRepository.createBudget(data);
    return this.mapper.mapToDto(createBudget, BudgetDto);
  }

  async updateBudget(updateBudgetDto: UpdateBudgetDto): Promise<BudgetDto> {
    const budget = await this.budgetRepository.getBudgetByUniqueField({ id: updateBudgetDto.id });
    const user = await this.userRepository.findUserByUniqueField({ email: updateBudgetDto.email });
    if (!user) {
      throw new BadRequestException('User doesn\'t exist!');
    }
    if (!budget) {
      throw new BadRequestException('Budget not found!');
    }
    const params: BudgetUpdateParams = {
      data: {
        name: updateBudgetDto.name,
        value: updateBudgetDto.value
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
