import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../core/repositories/category.repository';
import {
  CategoryDto,
  CreateSubcategoryDto,
  IncomeCategoryDto,
  OutcomeCategoryDto,
  SubcategoryDto,
  UpdateSubcategoryDto,
} from '../dto';
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
} from '../../core/schema-types/category.params';
import { Mapper } from '../../core/factories/mapper';
import { CategoryTypeEnum } from '../enums/category-type.enum';
import { BaseCategoryDto, CreateBaseCategoryDto, UpdateBaseCategoryDto } from '../dto/base-category.dto';

type CategoryByTypeReturnListFunction = {
  [index in CategoryTypeEnum]?: (email: string) => Promise<BaseCategoryDto[]>
}
type CategoryByTypeReturnFunction = {
  [index in CategoryTypeEnum]?: (input: CreateBaseCategoryDto | UpdateBaseCategoryDto) => Promise<BaseCategoryDto>
}
type CategoryByTypeNoReturnFunction = {
  [index in CategoryTypeEnum]?: (id: number) => Promise<void>
}

@Injectable()
export class CategoryService {
  private readonly GET_CATEGORY_BY_TYPE: CategoryByTypeReturnListFunction = {
    [CategoryTypeEnum.INCOME]: async (email: string) => this.getIncomeCategories(email),
    [CategoryTypeEnum.OUTCOME]: async (email: string) => this.getOutcomeCategories(email),
  };
  private readonly CREATE_CATEGORY_BY_TYPE: CategoryByTypeReturnFunction = {
    [CategoryTypeEnum.INCOME]: (input: CreateBaseCategoryDto) => this.createIncomeCategory(input),
    [CategoryTypeEnum.OUTCOME]: (input: CreateBaseCategoryDto) => this.createOutcomeCategory(input),
    [CategoryTypeEnum.SUBCATEGORY]: (input: CreateSubcategoryDto) => this.createSubcategory(input),
  };
  private readonly UPDATE_CATEGORY_BY_TYPE: CategoryByTypeReturnFunction = {
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

  public async getProperCategories(email: string, type?: CategoryTypeEnum): Promise<BaseCategoryDto[]> {
    if (type) {
      return this.GET_CATEGORY_BY_TYPE[type](email);
    }
    return this.getCategories(email);
  }

  public async createProperCategory(inputDto: CreateBaseCategoryDto, type: CategoryTypeEnum): Promise<BaseCategoryDto> {
    if (type) {
      return this.CREATE_CATEGORY_BY_TYPE[type](inputDto);
    }
    return this.createCategory(inputDto);
  }

  public async updateProperCategory(inputDto: UpdateBaseCategoryDto, type?: CategoryTypeEnum): Promise<BaseCategoryDto> {
    if (type) {
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
    const incomeCategory = await this.categoryRepository.findIncomeCategoryByUniqueField({ name: incomeCategoryDto.name });
    if (incomeCategory) {
      throw new BadRequestException('The name of category must be unique!');
    }
    const data: IncomeCategoryCreateParams = {
      name: incomeCategoryDto.name,
      icon: incomeCategoryDto.icon,
      user: {
        connect: {
          email: incomeCategoryDto.email,
        },
      },
    };
    const createdIncomeCategory = await this.categoryRepository.createIncomeCategory(data);
    return this.mapper.mapToDto(createdIncomeCategory, IncomeCategoryDto);
  }

  private async updateIncomeCategory(incomeCategoryDto: UpdateBaseCategoryDto): Promise<IncomeCategoryDto> {
    const incomeCategory = await this.categoryRepository.findIncomeCategoryByUniqueField({ id: incomeCategoryDto.id });
    if (!incomeCategory) {
      throw new NotFoundException('Category with provided id doesn\'t exist!');
    }
    if (incomeCategory && incomeCategory.id !== incomeCategory.id) {
      throw new BadRequestException('The name of category must be unique!');
    }
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

  private async getIncomeCategories(email: string): Promise<IncomeCategoryDto[]> {
    const params: IncomeCategoryGetParams = {
      where: {
        user: {
          email,
        },
        isDeleted: false,
      },
    };
    const categories = await this.categoryRepository.getIncomeCategories(params);
    return categories.map(category => this.mapper.mapToDto(category, IncomeCategoryDto));
  }

  private async deleteIncomeCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteIncomeCategory(id);
  }

  private async createOutcomeCategory(outcomeCategoryDto: CreateBaseCategoryDto): Promise<OutcomeCategoryDto> {
    const outcomeCategory = await this.categoryRepository.findOutcomeCategoryByUniqueField({ name: outcomeCategoryDto.name });
    if (outcomeCategory) {
      throw new BadRequestException('The name of category must be unique!');
    }
    const data: OutcomeCategoryCreateParams = {
      name: outcomeCategoryDto.name,
      icon: outcomeCategoryDto.icon,
      user: {
        connect: {
          email: outcomeCategoryDto.email,
        },
      },
    };
    const createdOutcomeCategory = await this.categoryRepository.createOutcomeCategory(data);
    return this.mapper.mapToDto(createdOutcomeCategory, OutcomeCategoryDto);
  }

  private async updateOutcomeCategory(outcomeCategoryDto: UpdateBaseCategoryDto): Promise<OutcomeCategoryDto> {
    const outcomeCategory = await this.categoryRepository.findOutcomeCategoryByUniqueField({ id: outcomeCategoryDto.id });
    if (!outcomeCategory) {
      throw new NotFoundException('Category with provided id doesn\'t exist!');
    }
    if (outcomeCategory && outcomeCategory.id !== outcomeCategoryDto.id) {
      throw new BadRequestException('The name of category must be unique!');
    }
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

  private async getOutcomeCategories(email: string): Promise<OutcomeCategoryDto[]> {
    const params: OutcomeCategoryGetParams = {
      where: {
        user: {
          email,
        },
        isDeleted: false,
      },
    };
    const categories = await this.categoryRepository.getOutcomeCategories(params);
    return categories.map(category => this.mapper.mapToDto(category, OutcomeCategoryDto));
  }

  private async deleteOutcomeCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteOutcomeCategory(id);
  }

  private async createCategory(categoryDto: CreateBaseCategoryDto): Promise<CategoryDto> {
    const category = await this.categoryRepository.findCategoryByUniqueField({ name: categoryDto.name });
    if (category) {
      throw new BadRequestException('The name of category must be unique!');
    }
    const data: CategoryCreateParams = {
      name: categoryDto.name,
      icon: categoryDto.icon,
      user: {
        connect: {
          email: categoryDto.email,
        },
      },
    };
    const createdCategory = await this.categoryRepository.createCategory(data);
    return this.mapper.mapToDto(createdCategory, CategoryDto);
  }

  private async updateCategory(categoryDto: UpdateBaseCategoryDto): Promise<CategoryDto> {
    const category = await this.categoryRepository.findCategoryByUniqueField({ id: categoryDto.id });
    if (!category) {
      throw new NotFoundException('Category with provided id doesn\'t exist!');
    }
    if (category && category.id !== categoryDto.id) {
      throw new BadRequestException('The name of category must be unique!');
    }
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

  private async getCategories(email: string): Promise<CategoryDto[]> {
    const params: CategoryGetParams = {
      where: {
        user: {
          email,
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
    const subCategory = await this.categoryRepository.findSubcategoryByUniqueField({ name: subCategoryDto.name });
    const parentCategory = await this.categoryRepository.findCategoryByUniqueField({ id: subCategoryDto.parentId });
    if (!parentCategory) {
      throw new BadRequestException('Parent category with provided id doesn\'t exist!');
    }
    if (subCategory && subCategory.id !== subCategoryDto.id) {
      throw new BadRequestException('The name of category must be unique!');
    }
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
