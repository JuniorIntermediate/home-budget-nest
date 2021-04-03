import { CategoryTypeEnum } from '@category/enums/category-type.enum';
import { BaseCategoryDto, CreateBaseCategoryDto, UpdateBaseCategoryDto } from '@category/dto';

export type GetCategoriesByTypeReturnFunction = {
  [index in CategoryTypeEnum]?: (userId: number) => Promise<BaseCategoryDto[]>
}
export type GetCategoryByTypeReturnFunction = {
  [index in CategoryTypeEnum]?: (userId: number) => Promise<BaseCategoryDto>
}
export type CreateCategoryByTypeReturnFunction = {
  [index in CategoryTypeEnum]?: (input: CreateBaseCategoryDto) => Promise<BaseCategoryDto>
}
export type UpdateCategoryByTypeReturnFunction = {
  [index in CategoryTypeEnum]?: (input: UpdateBaseCategoryDto) => Promise<BaseCategoryDto>
}
export type CategoryByTypeNoReturnFunction = {
  [index in CategoryTypeEnum]?: (id: number) => Promise<void>
}
