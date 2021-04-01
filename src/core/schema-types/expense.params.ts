import { Currency, Expense, Prisma } from '@prisma/client';

export type ExpenseCreateParams = Prisma.ExpenseCreateInput
export type ExpenseGetParams = {
  skip?: number,
  take?: number,
  where?: Prisma.ExpenseWhereInput,
  orderBy?: Prisma.ExpenseOrderByInput
}
export type GetExpenseWithCurrency = Expense & { currency: Currency };
type Filter<T> = {
  equals?: T
  in?: T[]
  notIn?: T[]
  lt?: T
  lte?: T
  gt?: T
  gte?: T
  not?: T
}
export type DecimalFilter = Filter<number>;
export type IntFilter = Filter<number>;
export type IntNullableFilter = Filter<number>;
export type StringFilter = Filter<string> & {
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: 'default' | 'insensitive'
  not?: string
}
export type DateTimeFilter = Filter<Date>;

export type PrismaFilterParams = Partial<DecimalFilter
  | IntFilter
  | IntNullableFilter
  | StringFilter
  | DateTimeFilter>
  ;
