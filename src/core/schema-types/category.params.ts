import { Category, Prisma, SubCategory } from '@prisma/client';

export type IncomeCategoryCreateParams = Prisma.IncomeCategoryCreateInput
export type OutcomeCategoryCreateParams = Prisma.OutcomeCategoryCreateInput
export type CategoryCreateParams = Prisma.CategoryCreateInput
export type SubcategoryCreateParams = Prisma.SubCategoryCreateInput

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

export type SubcategoryUpdateParams = {
  where: Prisma.SubCategoryWhereUniqueInput,
  data: Prisma.SubCategoryUpdateInput
}

export type GetCategoryWithSubCategories = Category & { subCategories: SubCategory[] }
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

export type IncomeCategoryGetByUniqueFieldParams = Prisma.IncomeCategoryWhereUniqueInput
export type OutcomeCategoryGetByUniqueFieldParams = Prisma.OutcomeCategoryWhereUniqueInput
export type CategoryGetByUniqueFieldParams = Prisma.CategoryWhereUniqueInput
export type SubcategoryGetByUniqueFieldParams = Prisma.SubCategoryWhereUniqueInput
