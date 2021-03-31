import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../core/repositories/category.repository';
import {
  CategoryDto,
  CreateCategoryDto,
  CreateIncomeCategoryDto,
  CreateOutcomeCategoryDto,
  CreateSubCategoryDto,
  IncomeCategoryDto,
  OutcomeCategoryDto,
  SubCategoryDto,
  UpdateCategoryDto,
  UpdateIncomeCategoryDto,
  UpdateOutcomeCategoryDto,
  UpdateSubCategoryDto,
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
  SubCategoryCreateParams,
  SubCategoryUpdateParams,
} from '../../core/schema-types/category.params';
import { Factory } from '../../core/factories/factory';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository, private readonly factory: Factory) {
  }

  async createIncomeCategory(incomeCategoryDto: CreateIncomeCategoryDto): Promise<void> {
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
    await this.categoryRepository.createIncomeCategory(data);
  }

  async updateIncomeCategory(incomeCategoryDto: UpdateIncomeCategoryDto): Promise<void> {
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
    await this.categoryRepository.updateIncomeCategory(params);
  }

  async getIncomeCategories(email: string): Promise<IncomeCategoryDto[]> {
    const params: IncomeCategoryGetParams = {
      where: {
        user: {
          email,
        },
        isDeleted: false,
      },
    };
    const categories = await this.categoryRepository.getIncomeCategories(params);
    return categories.map(category => this.factory.mapToDto(category, IncomeCategoryDto));
  }

  async deleteIncomeCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteIncomeCategory(id);
  }

  async createOutcomeCategory(outcomeCategoryDto: CreateOutcomeCategoryDto): Promise<void> {
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
    await this.categoryRepository.createOutcomeCategory(data);
  }

  async updateOutcomeCategory(outcomeCategoryDto: UpdateOutcomeCategoryDto): Promise<void> {
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
    await this.categoryRepository.updateOutcomeCategory(params);
  }

  async getOutcomeCategories(email: string): Promise<OutcomeCategoryDto[]> {
    const params: OutcomeCategoryGetParams = {
      where: {
        user: {
          email,
        },
        isDeleted: false,
      },
    };
    const categories = await this.categoryRepository.getOutcomeCategories(params);
    return categories.map(category => this.factory.mapToDto(category, OutcomeCategoryDto));
  }

  async deleteOutcomeCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteOutcomeCategory(id);
  }

  async createCategory(categoryDto: CreateCategoryDto): Promise<void> {
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
    await this.categoryRepository.createCategory(data);
  }

  async updateCategory(categoryDto: UpdateCategoryDto): Promise<void> {
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
    await this.categoryRepository.updateCategory(params);
  }

  async getCategories(email: string): Promise<CategoryDto[]> {
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
      ...this.factory.mapToDto(category, CategoryDto),
      subCategories: category.subCategories.map(subCategory => this.factory.mapToDto(subCategory, SubCategoryDto)),
    }));
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteCategory(id);
  }

  async createSubCategory(subCategoryDto: CreateSubCategoryDto): Promise<void> {
    const subCategory = await this.categoryRepository.findSubCategoryByUniqueField({ name: subCategoryDto.name });
    const parentCategory = await this.categoryRepository.findCategoryByUniqueField({ id: subCategoryDto.parentId });
    if (!parentCategory) {
      throw new BadRequestException('Parent category with provided id doesn\'t exist!');
    }
    if (subCategory) {
      throw new BadRequestException('The name of category must be unique!');
    }
    const data: SubCategoryCreateParams = {
      name: subCategoryDto.name,
      icon: subCategoryDto.icon,
      category: {
        connect: {
          id: subCategoryDto.parentId,
        },
      },
    };
    await this.categoryRepository.createSubCategory(data);
  }

  async updateSubCategory(subCategoryDto: UpdateSubCategoryDto): Promise<void> {
    const subCategory = await this.categoryRepository.findSubCategoryByUniqueField({ name: subCategoryDto.name });
    const parentCategory = await this.categoryRepository.findCategoryByUniqueField({ id: subCategoryDto.parentId });
    if (!parentCategory) {
      throw new BadRequestException('Parent category with provided id doesn\'t exist!');
    }
    if (subCategory && subCategory.id !== subCategoryDto.id) {
      throw new BadRequestException('The name of category must be unique!');
    }
    const params: SubCategoryUpdateParams = {
      data: {
        name: subCategoryDto.name,
        icon: subCategoryDto.icon,
      },
      where: {
        id: subCategoryDto.id,
      },
    };
    await this.categoryRepository.updateSubCategory(params);
  }

  async deleteSubCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteSubCategory(id);
  }
}
