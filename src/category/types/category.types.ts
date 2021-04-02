import { CategoryTypeEnum } from '../enums/category-type.enum';
import { BaseCategoryDto, CreateBaseCategoryDto, UpdateBaseCategoryDto } from '../dto/base-category.dto';

export type CategoryByTypeReturnListFunction = {
  [index in CategoryTypeEnum]?: (email: string) => Promise<BaseCategoryDto[]>
}
export type CategoryByTypeReturnFunction = {
  [index in CategoryTypeEnum]?: (input: CreateBaseCategoryDto | UpdateBaseCategoryDto) => Promise<BaseCategoryDto>
}
export type CategoryByTypeNoReturnFunction = {
  [index in CategoryTypeEnum]?: (id: number) => Promise<void>
}
