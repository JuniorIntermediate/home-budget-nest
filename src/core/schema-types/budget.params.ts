import { Prisma } from '@prisma/client';

export type BudgetCreateParams = Prisma.BudgetCreateInput

export type BudgetUpdateParams = {
  where: Prisma.BudgetWhereUniqueInput,
  data: Prisma.BudgetUpdateInput
}

export type BudgetGetParams = {
  skip?: number,
  take?: number,
  where?: Prisma.BudgetWhereInput,
  orderBy?: Prisma.BudgetOrderByInput
}

export type BudgetGetByUniqueFieldParams = Prisma.BudgetWhereUniqueInput
