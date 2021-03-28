import { Prisma } from '@prisma/client';

export type IncomeCategoryUpdateParams = {
  where: Prisma.IncomeCategoryWhereUniqueInput,
  data: Prisma.IncomeCategoryUpdateInput
}

export type OutcomeCategoryUpdateParams = {
  where: Prisma.OutcomeCategoryWhereUniqueInput,
  data: Prisma.OutcomeCategoryUpdateInput
}

export type CategoryUpdateParams = {
  where: Prisma.CategoryWhereUniqueInput,
  data: Prisma.CategoryUpdateInput
}

export type SubCategoryUpdateParams = Prisma.SubCategoryUpdateManyWithoutCategoryInput
