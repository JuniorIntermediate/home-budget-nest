import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Expense } from '@prisma/client';
import { ExpenseCreateParams, ExpenseGetParams, GetExpenseWithCurrency } from '../schema-types/expense.params';
import { DateTime } from 'luxon';
import { GroupExpenseDto } from '../../expense/dto/expense.dto';

@Injectable()
export class ExpenseRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async createExpense(data: ExpenseCreateParams): Promise<Expense> {
    return this.prisma.expense.create({ data });
  }

  async aggregateExpensesByMonth(from?: DateTime, to?: DateTime) {
    if (from) {
      return this.aggregateExpensesByMonthRestrictByDate(from, to);
    }
    return this.prisma.$queryRaw<GroupExpenseDto[]>(`
        SELECT date_part('month', date_trunc('month', date)) as month,
               e."budgetId",
               e."payerId",
               e."categoryId",
               e."incomeCategoryId",
               e."outcomeCategoryId",
               e."subcategoryId",
               sum(amount)                                   as amount
        FROM db.budget_db."Expense" e
        GROUP BY month,
                 e."budgetId",
                 e."payerId",
                 e."categoryId",
                 e."incomeCategoryId",
                 e."outcomeCategoryId",
                 e."subcategoryId"
        ORDER BY month;
    `);
  }

  async getExpenses(params?: ExpenseGetParams): Promise<GetExpenseWithCurrency[]> {
    return this.prisma.expense.findMany({
      ...params,
      where: {
        ...params.where,
        isDeleted: false,
      },
      include: {
        currency: true,
      },
    });
  }

  private aggregateExpensesByMonthRestrictByDate(from: DateTime, to: DateTime) {
    if (!to) {
      return this.prisma.$queryRaw<GroupExpenseDto[]>`SELECT 
        date_part('month', date_trunc('month', date)) as month,
        e."budgetId",
        e."payerId",
        e."categoryId",
        e."incomeCategoryId",
        e."outcomeCategoryId",
        e."subcategoryId",
        sum(amount) as amount
        FROM db.budget_db."Expense" e
        WHERE date = date(${from.toJSDate()})
        GROUP BY
            month,
            e."budgetId",
            e."payerId",
            e."categoryId",
            e."incomeCategoryId",
            e."outcomeCategoryId",
            e."subcategoryId"
        ORDER BY month;`
        ;
    } else {
      return this.prisma.$queryRaw<GroupExpenseDto[]>`SELECT 
        date_part('month', date_trunc('month', date)) as month,
        e."budgetId",
        e."payerId",
        e."categoryId",
        e."incomeCategoryId",
        e."outcomeCategoryId",
        e."subcategoryId",
        sum(amount) as amount
        FROM db.budget_db."Expense" e
        WHERE date between date(${from.toJSDate()}) and date(${to.toJSDate()})
        GROUP BY
            month,
            e."budgetId",
            e."payerId",
            e."categoryId",
            e."incomeCategoryId",
            e."outcomeCategoryId",
            e."subcategoryId"
        ORDER BY month;`
        ;
    }
  }
}
