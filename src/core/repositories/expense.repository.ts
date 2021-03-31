import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Expense } from '@prisma/client';
import {
  ExpenseCreateParams,
  ExpenseGetByUniqueFieldParams,
  ExpenseGetParams,
  ExpenseUpdateParams,
} from '../schema-types/expense.params';

@Injectable()
export class ExpenseRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async createExpense(data: ExpenseCreateParams): Promise<Expense> {
    return this.prisma.expense.create({ data });
  }

  async updateExpense(params: ExpenseUpdateParams): Promise<Expense> {
    return this.prisma.expense.update(params);
  }

  async deleteExpense(id: number): Promise<void> {
    await this.prisma.expense.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    });
  }

  async getExpenses(params: ExpenseGetParams): Promise<Expense[]> {
    return this.prisma.expense.findMany(params);
  }

  async getExpenseByUniqueField(where: ExpenseGetByUniqueFieldParams): Promise<Expense | null> {
    return this.prisma.expense.findUnique({ where });
  }
}
