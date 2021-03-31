import { Prisma } from '@prisma/client';

export type PayerCreateParams = Prisma.PayerCreateInput


export type PayerUpdateParams = {
  where: Prisma.PayerWhereUniqueInput,
  data: Prisma.PayerUpdateInput
}

export type PayerGetParams = {
  skip?: number,
  take?: number,
  where?: Prisma.PayerWhereInput,
  orderBy?: Prisma.PayerOrderByInput
}

export type PayerGetByUniqueFieldParams = Prisma.PayerWhereUniqueInput
