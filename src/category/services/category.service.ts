import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../core/repositories/category.repository';
import { CreateIncomeCategoryDto, UpdateIncomeCategoryDto } from '../dto/income-category.dto';
import {
  IncomeCategoryCreateParams,
  OutcomeCategoryCreateParams,
} from '../../core/schema-types/category.create-params';
import {
  IncomeCategoryUpdateParams,
  OutcomeCategoryUpdateParams,
} from '../../core/schema-types/category.update-params';
import { IncomeCategoryGetParams, OutcomeCategoryGetParams } from '../../core/schema-types/category.get-params';
import { CreateOutcomeCategoryDto, UpdateOutcomeCategoryDto } from '../dto/outcome-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {
  }

  async createIncomeCategory(incomeCategoryDto: CreateIncomeCategoryDto): Promise<void> {
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

  async getIncomeCategories(email: string) {
    const params: IncomeCategoryGetParams = {
      where: {
        user: {
          email,
        },
      },
    };
    return this.categoryRepository.getIncomeCategories(params);
  }

  async deleteIncomeCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteIncomeCategory(id);
  }

  async createOutcomeCategory(incomeCategoryDto: CreateOutcomeCategoryDto): Promise<void> {
    const data: OutcomeCategoryCreateParams = {
      name: incomeCategoryDto.name,
      icon: incomeCategoryDto.icon,
      user: {
        connect: {
          email: incomeCategoryDto.email,
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

  async getOutcomeCategories(email: string) {
    const params: OutcomeCategoryGetParams = {
      where: {
        user: {
          email,
        },
      },
    };
    return this.categoryRepository.getOutcomeCategories(params);
  }

  async deleteOutcomeCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteOutcomeCategory(id);
  }
}
