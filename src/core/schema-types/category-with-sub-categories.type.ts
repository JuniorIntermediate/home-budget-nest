import { SubCategory } from '@prisma/client';

export type GetCategoryWithSubCategories = {
  id: number
  name: string
  icon: string
  isDeleted: boolean
  userId: number;
  subCategories: SubCategory[]
}
