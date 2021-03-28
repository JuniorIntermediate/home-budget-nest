import { Prisma } from '@prisma/client';

export type IncomeCategoryCreateParams = Prisma.IncomeCategoryCreateInput
export type OutcomeCategoryCreateParams = Prisma.OutcomeCategoryCreateInput
export type CategoryCreateParams = Prisma.CategoryCreateInput
export type SubCategoryCreateParams = Prisma.SubCategoryCreateWithoutCategoryInput
