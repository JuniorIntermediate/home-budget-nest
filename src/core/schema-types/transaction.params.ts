import { Currency, Prisma, Transaction } from 'src/generated-prisma';

export type TransactionCreateParams = Prisma.TransactionCreateInput
export type TransactionGetParams = {
  skip?: number,
  take?: number,
  where?: Prisma.TransactionWhereInput,
  orderBy?: Prisma.TransactionOrderByInput
}
export type TransactionGetByUniqueField = Prisma.TransactionWhereUniqueInput;
export type GetTransactionWithCurrency = Transaction & { currency?: Currency };
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
