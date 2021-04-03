import { Category, Prisma, Subcategory } from 'src/generated-prisma';

export type IncomeCategoryCreateParams = Prisma.IncomeCategoryCreateInput
export type OutcomeCategoryCreateParams = Prisma.OutcomeCategoryCreateInput
export type CategoryCreateParams = Prisma.CategoryCreateInput
export type SubcategoryCreateParams = Prisma.SubcategoryCreateInput

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
  where: Prisma.SubcategoryWhereUniqueInput,
  data: Prisma.SubcategoryUpdateInput
}

export type GetCategoryWithSubCategories = Category & { subCategories: Subcategory[] }
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
export type SubcategoryGetByUniqueFieldParams = Prisma.SubcategoryWhereUniqueInput
