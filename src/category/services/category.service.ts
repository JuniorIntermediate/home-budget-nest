import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../core/repositories/category.repository';
import { CreateIncomeCategoryDto, IncomeCategoryDto, UpdateIncomeCategoryDto } from '../dto/income-category.dto';
import {
  CategoryCreateParams,
  IncomeCategoryCreateParams,
  OutcomeCategoryCreateParams,
  SubCategoryCreateParams,
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
    return categories.map(category => this.factory.mapToDto(category));
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
      subCategories: {
        create: categoryDto.subCategories.map(subCategory => {
          const model: SubCategoryCreateParams = { name: subCategory.name, icon: subCategory.icon };
          return model;
        }),
      },
    };
    await this.categoryRepository.createCategory(data);
  }

  async updateCategory(categoryDto: UpdateCategoryDto): Promise<void> {
    const category = await this.categoryRepository.findCategoryByUniqueField({ id: categoryDto.id });
    if (!category) {
      throw new NotFoundException('Category with provided id doesn\'t exist!');
    }
    const params: CategoryUpdateParams = {
      data: {
        name: categoryDto.name,
        icon: categoryDto.icon,
        subCategories: {
          deleteMany: category.subCategories,
          create: categoryDto.subCategories.map(subCategory => {
            const model: SubCategoryCreateParams = { name: subCategory.name, icon: subCategory.icon };
            return model;
          }),
        },
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
