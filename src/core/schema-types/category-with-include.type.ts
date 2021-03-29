import { Category, SubCategory } from '@prisma/client';

export type GetCategoryWithSubCategories = Category & { subCategories: SubCategory[] }
