import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import {
  GetTransactionWithCurrency,
  TransactionCreateParams,
  TransactionGetParams,
} from '@core/schema-types/transaction.params';
import { DateTime } from 'luxon';
import { GroupTransactionDto } from '@transaction/dto/transaction.dto';
import { Transaction } from 'src/generated-prisma';
import { GroupByEnum } from '@transaction/enums/filter.enum';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async createTransaction(data: TransactionCreateParams): Promise<Transaction> {
    return this.prisma.transaction.create({ data });
  }

  async aggregateTransactionsBy(groupBy: GroupByEnum, from?: DateTime, to?: DateTime) {
    if (from) {
      return this.aggregateTransactionsByRestrictByDate(groupBy, from, to);
    }
    return this.prisma.$queryRaw<GroupTransactionDto[]>(`
        SELECT date_part('${groupBy}', date_trunc('${groupBy}', t.date)) as group_by_value,
               array_agg(t.id) as transaction_ids,
               t."budgetId",
               t."payerId",
               t."categoryId",
               t."incomeCategoryId",
               t."outcomeCategoryId",
               t."subcategoryId"
        FROM db.budget_db."Transaction" t
        GROUP BY group_by_value,
                 t."budgetId",
                 t."payerId",
                 t."categoryId",
                 t."incomeCategoryId",
                 t."outcomeCategoryId",
                 t."subcategoryId"
        ORDER BY group_by_value;
    `);
  }

  async getTransactions(params: TransactionGetParams = {}): Promise<{ transactions: GetTransactionWithCurrency[], count: number }> {
    const count = await this.prisma.transaction.count();
    const transactions = await this.prisma.transaction.findMany({
      ...params,
      where: {
        ...params.where,
        isDeleted: false,
      },
      include: {
        currency: true,
      },
    });
    return { count, transactions };
  }

  private aggregateTransactionsByRestrictByDate(groupBy, from: DateTime, to: DateTime) {
    if (!to) {
      return this.prisma.$queryRaw<GroupTransactionDto[]>`SELECT 
        date_part('${groupBy}', date_trunc('${groupBy}', t.date)) as group_by_value,
        array_agg(t.id) as transaction_ids,
        t."budgetId",
        t."payerId",
        t."categoryId",
        t."incomeCategoryId",
        t."outcomeCategoryId",
        t."subcategoryId"
        FROM db.budget_db."Transaction" t
        WHERE date = date(${from.toJSDate()})
        GROUP BY
            group_by_value,
            t."budgetId",
            t."payerId",
            t."categoryId",
            t."incomeCategoryId",
            t."outcomeCategoryId",
            t."subcategoryId"
        ORDER BY group_by_value;`
        ;
    } else {
      return this.prisma.$queryRaw<GroupTransactionDto[]>`SELECT 
        date_part('${groupBy}', date_trunc('${groupBy}', t.date)) as group_by_value,
        array_agg(t.id) as transaction_ids,
        t."budgetId",
        t."payerId",
        t."categoryId",
        t."incomeCategoryId",
        t."outcomeCategoryId",
        t."subcategoryId"
        FROM db.budget_db."Transaction" t
        WHERE date between date(${from.toJSDate()}) and date(${to.toJSDate()})
        GROUP BY
            group_by_value,
            t."budgetId",
            t."payerId",
            t."categoryId",
            t."incomeCategoryId",
            t."outcomeCategoryId",
            t."subcategoryId"
        ORDER BY group_by_value;`
        ;
    }
  }
}
