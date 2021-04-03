import { Injectable } from '@nestjs/common';
import { Budget } from 'src/generated-prisma';
import { PrismaService } from '@core/prisma.service';
import {
  BudgetCreateParams,
  BudgetGetByUniqueFieldParams,
  BudgetGetParams,
  BudgetUpdateParams,
} from '@core/schema-types/budget.params';

@Injectable()
export class BudgetRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async createBudget(data: BudgetCreateParams): Promise<Budget> {
    return this.prisma.budget.create({ data });
  }

  async updateBudget(params: BudgetUpdateParams): Promise<Budget> {
    return this.prisma.budget.update(params);
  }

  async deleteBudget(id: number): Promise<void> {
    await this.prisma.budget.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    });
  }

  async getBudgets(params: BudgetGetParams): Promise<Budget[]> {
    return this.prisma.budget.findMany(params);
  }

  async getBudgetByUniqueField(where: BudgetGetByUniqueFieldParams): Promise<Budget | null> {
    return this.prisma.budget.findUnique({ where });
  }
}
