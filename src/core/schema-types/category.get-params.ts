import { Prisma } from '@prisma/client';

export type IncomeCategoryGetParams = {
  skip?: number,
  take?: number,
  where?: Prisma.IncomeCategoryWhereInput,
  orderBy?: Prisma.IncomeCategoryOrderByInput
}

export type OutcomeCategoryGetParams = {
  skip?: number,
  take?: number,
  where?: Prisma.OutcomeCategoryWhereInput,
  orderBy?: Prisma.OutcomeCategoryOrderByInput
}

export type CategoryGetParams = {
  skip?: number,
  take?: number,
  where?: Prisma.CategoryWhereInput,
  orderBy?: Prisma.CategoryOrderByInput
}
