import { Prisma } from '@prisma/client';

export type CurrencyCreateParams = Prisma.CurrencyCreateInput

export type CurrencyUpdateParams = {
  where: Prisma.CurrencyWhereUniqueInput,
  data: Prisma.CurrencyUpdateInput
}

export type CurrencyGetParams = {
  skip?: number,
  take?: number,
  where?: Prisma.CurrencyWhereInput,
  orderBy?: Prisma.CurrencyOrderByInput
}

export type CurrencyGetByUniqueFieldParams = Prisma.CurrencyWhereUniqueInput
