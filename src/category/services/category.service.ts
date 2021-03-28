import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../core/repositories/category.repository';
import { CreateIncomeCategoryDto, IncomeCategoryDto, UpdateIncomeCategoryDto } from '../dto/income-category.dto';
import {
  CategoryCreateParams,
  IncomeCategoryCreateParams,
  OutcomeCategoryCreateParams,
} from '../../core/schema-types/category.create-params';
import {
  CategoryUpdateParams,
  IncomeCategoryUpdateParams,
  OutcomeCategoryUpdateParams,
} from '../../core/schema-types/category.update-params';
import {
  CategoryGetParams,
  IncomeCategoryGetParams,
  OutcomeCategoryGetParams,
} from '../../core/schema-types/category.get-params';
import { CreateOutcomeCategoryDto, OutcomeCategoryDto, UpdateOutcomeCategoryDto } from '../dto/outcome-category.dto';
import { CategoryFactory } from '../factory/category.factory';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository, private readonly factory: CategoryFactory) {
  }

  async createIncomeCategory(incomeCategoryDto: CreateIncomeCategoryDto): Promise<void> {
    const incomeCategory = await this.categoryRepository.findIncomeCategoryByName({ name: incomeCategoryDto.name });
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
    return categories.map(category => this.factory.mapToDto(category));
  }

  async deleteIncomeCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteIncomeCategory(id);
  }

  async createOutcomeCategory(outcomeCategoryDto: CreateOutcomeCategoryDto): Promise<void> {
    const outcomeCategory = await this.categoryRepository.findOutcomeCategoryByName({ name: outcomeCategoryDto.name });
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

  async updateOutcomeCategory(incomeCategoryDto: UpdateOutcomeCategoryDto): Promise<void> {
    const params: OutcomeCategoryUpdateParams = {
      data: {
        name: incomeCategoryDto.name,
        icon: incomeCategoryDto.icon,
      },
      where: {
        id: incomeCategoryDto.id,
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
    return categories.map(category => this.factory.mapToDto(category));
  }

  async deleteOutcomeCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteOutcomeCategory(id);
  }

  async createCategory(categoryDto: CreateCategoryDto): Promise<void> {
    const category = await this.categoryRepository.findCategoryByName({ name: categoryDto.name });
    if (category) {
      throw new BadRequestException('The name of category must be unique!');
    }
    const parentCategory = categoryDto.parentCategoryId !== null ? {
      connect: {
        id: categoryDto.parentCategoryId,
      },
    } : null;
    const data: CategoryCreateParams = {
      name: categoryDto.name,
      icon: categoryDto.icon,
      parentCategory,
      user: {
        connect: {
          email: categoryDto.email,
        },
      },
    };
    await this.categoryRepository.createCategory(data);
  }

  async updateCategory(categoryDto: UpdateCategoryDto): Promise<void> {
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
    return categories.map(category => this.factory.mapToDto(category));
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteCategory(id);
  }
}
