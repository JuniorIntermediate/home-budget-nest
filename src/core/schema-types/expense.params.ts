import { Prisma } from '@prisma/client';

export type ExpenseCreateParams = Prisma.ExpenseCreateInput

export type ExpenseUpdateParams = {
  where: Prisma.ExpenseWhereUniqueInput,
  data: Prisma.ExpenseUpdateInput
}

export type ExpenseGetParams = {
  skip?: number,
  take?: number,
  where?: Prisma.ExpenseWhereInput,
  orderBy?: Prisma.ExpenseOrderByInput
}

export type ExpenseGetByUniqueFieldParams = Prisma.ExpenseWhereUniqueInput
