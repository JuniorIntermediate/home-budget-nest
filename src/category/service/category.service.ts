import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@core/repositories/category.repository';
import {
  CategoryDto,
  CreateSubcategoryDto,
  IncomeCategoryDto,
  OutcomeCategoryDto,
  SubcategoryDto,
  UpdateSubcategoryDto,
} from '@category/dto';
import {
  CategoryCreateParams,
  CategoryGetParams,
  CategoryUpdateParams,
  IncomeCategoryCreateParams,
  IncomeCategoryGetParams,
  IncomeCategoryUpdateParams,
  OutcomeCategoryCreateParams,
  OutcomeCategoryGetParams,
  OutcomeCategoryUpdateParams,
  SubcategoryCreateParams,
  SubcategoryUpdateParams,
} from '@core/schema-types/category.params';
import { Mapper } from '@core/factories/mapper';
import { CategoryTypeEnum } from '@category/enums/category-type.enum';
import { BaseCategoryDto, CreateBaseCategoryDto, UpdateBaseCategoryDto } from '@category/dto/base-category.dto';
import {
  CategoryByTypeNoReturnFunction,
  CreateCategoryByTypeReturnFunction,
  GetCategoriesByTypeReturnFunction,
  GetCategoryByTypeReturnFunction,
  UpdateCategoryByTypeReturnFunction,
} from '@category/types/category.types';

@Injectable()
export class CategoryService {
  private readonly GET_CATEGORIES_BY_TYPE: GetCategoriesByTypeReturnFunction = {
    [CategoryTypeEnum.INCOME]: async (userId: number) => this.getIncomeCategories(userId),
    [CategoryTypeEnum.OUTCOME]: async (userId: number) => this.getOutcomeCategories(userId),
  };
  private readonly GET_CATEGORY_BY_TYPE: GetCategoryByTypeReturnFunction = {
    [CategoryTypeEnum.INCOME]: async (id: number) => this.getIncomeCategory(id),
    [CategoryTypeEnum.OUTCOME]: async (id: number) => this.getOutcomeCategory(id),
  };
  private readonly CREATE_CATEGORY_BY_TYPE: CreateCategoryByTypeReturnFunction = {
    [CategoryTypeEnum.INCOME]: (input: CreateBaseCategoryDto) => this.createIncomeCategory(input),
    [CategoryTypeEnum.OUTCOME]: (input: CreateBaseCategoryDto) => this.createOutcomeCategory(input),
    [CategoryTypeEnum.SUBCATEGORY]: (input: CreateSubcategoryDto) => this.createSubcategory(input),
  };
  private readonly UPDATE_CATEGORY_BY_TYPE: UpdateCategoryByTypeReturnFunction = {
    [CategoryTypeEnum.INCOME]: (input: UpdateBaseCategoryDto) => this.updateIncomeCategory(input),
    [CategoryTypeEnum.OUTCOME]: (input: UpdateBaseCategoryDto) => this.updateOutcomeCategory(input),
    [CategoryTypeEnum.SUBCATEGORY]: (input: UpdateSubcategoryDto) => this.updateSubcategory(input),
  };
  private readonly DELETE_CATEGORY_BY_TYPE: CategoryByTypeNoReturnFunction = {
    [CategoryTypeEnum.INCOME]: (id: number) => this.deleteIncomeCategory(id),
    [CategoryTypeEnum.OUTCOME]: (id: number) => this.deleteOutcomeCategory(id),
    [CategoryTypeEnum.SUBCATEGORY]: (id: number) => this.deleteSubcategory(id),
  };

  constructor(private readonly categoryRepository: CategoryRepository, private readonly mapper: Mapper) {
  }

  public async getProperCategories(userId: number, type?: CategoryTypeEnum): Promise<BaseCategoryDto[]> {
    if (type) {
      return this.GET_CATEGORIES_BY_TYPE[type](userId);
    }
    return this.getCategories(userId);
  }

  public async getProperCategory(id: number, type?: CategoryTypeEnum): Promise<BaseCategoryDto> {
    if (type) {
      return this.GET_CATEGORY_BY_TYPE[type](id);
    }
    return this.getCategory(id);
  }

  public async createProperCategory(inputDto: CreateBaseCategoryDto): Promise<BaseCategoryDto> {
    if (inputDto.type) {
      const type = inputDto.type.toLowerCase() as CategoryTypeEnum;
      return this.CREATE_CATEGORY_BY_TYPE[type](inputDto);
    }
    return this.createCategory(inputDto);
  }

  public async updateProperCategory(inputDto: UpdateBaseCategoryDto): Promise<BaseCategoryDto> {
    if (inputDto.type) {
      const type = inputDto.type.toLowerCase() as CategoryTypeEnum;
      return this.UPDATE_CATEGORY_BY_TYPE[type](inputDto);
    }
    return this.updateCategory(inputDto);
  }

  public async deleteProperCategory(id: number, type?: CategoryTypeEnum): Promise<void> {
    if (type) {
      await this.DELETE_CATEGORY_BY_TYPE[type](id);
    }
    await this.deleteCategory(id);
  }

  private async createIncomeCategory(incomeCategoryDto: CreateBaseCategoryDto): Promise<IncomeCategoryDto> {
    const data: IncomeCategoryCreateParams = {
      name: incomeCategoryDto.name,
      icon: incomeCategoryDto.icon,
      user: {
        connect: {
          id: incomeCategoryDto.userId,
        },
      },
    };
    const createdIncomeCategory = await this.categoryRepository.createIncomeCategory(data);
    return this.mapper.mapToDto(createdIncomeCategory, IncomeCategoryDto);
  }

  private async updateIncomeCategory(incomeCategoryDto: UpdateBaseCategoryDto): Promise<IncomeCategoryDto> {
    const params: IncomeCategoryUpdateParams = {
      data: {
        name: incomeCategoryDto.name,
        icon: incomeCategoryDto.icon,
      },
      where: {
        id: incomeCategoryDto.id,
      },
    };
    const updatedIncomeCategory = await this.categoryRepository.updateIncomeCategory(params);
    return this.mapper.mapToDto(updatedIncomeCategory, IncomeCategoryDto);
  }

  private async getIncomeCategories(id: number): Promise<IncomeCategoryDto[]> {
    const params: IncomeCategoryGetParams = {
      where: {
        user: {
          id,
        },
        isDeleted: false,
      },
    };
    const categories = await this.categoryRepository.getIncomeCategories(params);
    return categories.map(category => this.mapper.mapToDto(category, IncomeCategoryDto));
  }

  private async getIncomeCategory(id: number): Promise<IncomeCategoryDto> {
    const category = await this.categoryRepository.findIncomeCategoryByUniqueField({ id });
    return this.mapper.mapToDto(category, IncomeCategoryDto);
  }

  private async deleteIncomeCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteIncomeCategory(id);
  }

  private async createOutcomeCategory(outcomeCategoryDto: CreateBaseCategoryDto): Promise<OutcomeCategoryDto> {
    const data: OutcomeCategoryCreateParams = {
      name: outcomeCategoryDto.name,
      icon: outcomeCategoryDto.icon,
      user: {
        connect: {
          id: outcomeCategoryDto.userId,
        },
      },
    };
    const createdOutcomeCategory = await this.categoryRepository.createOutcomeCategory(data);
    return this.mapper.mapToDto(createdOutcomeCategory, OutcomeCategoryDto);
  }

  private async updateOutcomeCategory(outcomeCategoryDto: UpdateBaseCategoryDto): Promise<OutcomeCategoryDto> {
    const params: OutcomeCategoryUpdateParams = {
      data: {
        name: outcomeCategoryDto.name,
        icon: outcomeCategoryDto.icon,
      },
      where: {
        id: outcomeCategoryDto.id,
      },
    };
    const updatedOutcomeCategory = await this.categoryRepository.updateOutcomeCategory(params);
    return this.mapper.mapToDto(updatedOutcomeCategory, OutcomeCategoryDto);
  }

  private async getOutcomeCategories(id: number): Promise<OutcomeCategoryDto[]> {
    const params: OutcomeCategoryGetParams = {
      where: {
        user: {
          id,
        },
        isDeleted: false,
      },
    };
    const categories = await this.categoryRepository.getOutcomeCategories(params);
    return categories.map(category => this.mapper.mapToDto(category, OutcomeCategoryDto));
  }

  private async getOutcomeCategory(id: number): Promise<OutcomeCategoryDto> {
    const category = await this.categoryRepository.findOutcomeCategoryByUniqueField({ id });
    return this.mapper.mapToDto(category, OutcomeCategoryDto);
  }

  private async deleteOutcomeCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteOutcomeCategory(id);
  }

  private async createCategory(categoryDto: CreateBaseCategoryDto): Promise<CategoryDto> {
    const data: CategoryCreateParams = {
      name: categoryDto.name,
      icon: categoryDto.icon,
      user: {
        connect: {
          id: categoryDto.userId,
        },
      },
    };
    const createdCategory = await this.categoryRepository.createCategory(data);
    return this.mapper.mapToDto(createdCategory, CategoryDto);
  }

  private async updateCategory(categoryDto: UpdateBaseCategoryDto): Promise<CategoryDto> {
    const params: CategoryUpdateParams = {
      data: {
        name: categoryDto.name,
        icon: categoryDto.icon,
      },
      where: {
        id: categoryDto.id,
      },
    };
    const updatedCategory = await this.categoryRepository.updateCategory(params);
    return this.mapper.mapToDto(updatedCategory, CategoryDto);
  }

  private async getCategories(id: number): Promise<CategoryDto[]> {
    const params: CategoryGetParams = {
      where: {
        user: {
          id,
        },
        isDeleted: false,
      },
    };
    const categories = await this.categoryRepository.getCategories(params);
    return categories.map(category => ({
      ...this.mapper.mapToDto(category, CategoryDto),
      subCategories: category.subCategories.map(subCategory => this.mapper.mapToDto(subCategory, SubcategoryDto)),
    }));
  }

  private async getCategory(id: number): Promise<CategoryDto> {
    const category = await this.categoryRepository.findCategoryByUniqueField({ id });
    return {
      ...this.mapper.mapToDto(category, CategoryDto),
      subCategories: category.subCategories.map(subCategory => this.mapper.mapToDto(subCategory, SubcategoryDto)),
    };
  }


  private async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteCategory(id);
  }

  private async createSubcategory(subCategoryDto: CreateSubcategoryDto): Promise<SubcategoryDto> {
    const subCategory = await this.categoryRepository.findSubcategoryByUniqueField({ name: subCategoryDto.name });
    const parentCategory = await this.categoryRepository.findCategoryByUniqueField({ id: subCategoryDto.parentId });
    if (!parentCategory) {
      throw new BadRequestException('Parent category with provided id doesn\'t exist!');
    }
    if (subCategory) {
      throw new BadRequestException('The name of category must be unique!');
    }
    const data: SubcategoryCreateParams = {
      name: subCategoryDto.name,
      icon: subCategoryDto.icon,
      category: {
        connect: {
          id: subCategoryDto.parentId,
        },
      },
    };
    const createdSubcategory = await this.categoryRepository.createSubcategory(data);
    return this.mapper.mapToDto(createdSubcategory, SubcategoryDto);
  }

  private async updateSubcategory(subCategoryDto: UpdateSubcategoryDto): Promise<SubcategoryDto> {
    const params: SubcategoryUpdateParams = {
      data: {
        name: subCategoryDto.name,
        icon: subCategoryDto.icon,
      },
      where: {
        id: subCategoryDto.id,
      },
    };
    const updatedSubcategory = await this.categoryRepository.updateSubcategory(params);
    return this.mapper.mapToDto(updatedSubcategory, SubcategoryDto);
  }

  private async deleteSubcategory(id: number): Promise<void> {
    await this.categoryRepository.deleteSubcategory(id);
  }
}
