import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Expense } from '@prisma/client';
import { ExpenseCreateParams } from '../schema-types/expense.params';

@Injectable()
export class ExpenseRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async createExpense(data: ExpenseCreateParams): Promise<Expense> {
    return this.prisma.expense.create({ data });
  }
}
