import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Category, IncomeCategory, OutcomeCategory, Prisma } from '@prisma/client';
import {
  CategoryUpdateParams,
  IncomeCategoryUpdateParams,
  OutcomeCategoryUpdateParams,
} from '../schema-types/category.update-params';
import {
  CategoryCreateParams,
  IncomeCategoryCreateParams,
  OutcomeCategoryCreateParams,
} from '../schema-types/category.create-params';
import {
  CategoryGetParams,
  IncomeCategoryGetParams,
  OutcomeCategoryGetParams,
} from '../schema-types/category.get-params';
import { GetCategoryWithSubCategories } from '../schema-types/category-with-include.type';

@Injectable()
export class CategoryRepository {

  constructor(private readonly prisma: PrismaService) {
  }

  async createIncomeCategory(data: IncomeCategoryCreateParams): Promise<IncomeCategory> {
    return this.prisma.incomeCategory.create({ data });
  }

  async updateIncomeCategory(params: IncomeCategoryUpdateParams): Promise<IncomeCategory> {
    const { where, data } = params;
    return this.prisma.incomeCategory.update({ where, data });
  }

  async deleteIncomeCategory(id: number): Promise<void> {
    await this.prisma.incomeCategory.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    });
  }

  async getIncomeCategories(params: IncomeCategoryGetParams): Promise<IncomeCategory[]> {
    return this.prisma.incomeCategory.findMany({
      ...params,
    });
  }

  async findIncomeCategoryByUniqueField(where: Prisma.IncomeCategoryWhereUniqueInput): Promise<IncomeCategory | null> {
    return this.prisma.incomeCategory.findUnique({
      where,
    });
  }

  async createOutcomeCategory(data: OutcomeCategoryCreateParams): Promise<OutcomeCategory> {
    return this.prisma.outcomeCategory.create({ data });
  }

  async updateOutcomeCategory(params: OutcomeCategoryUpdateParams): Promise<OutcomeCategory> {
    const { where, data } = params;
    return this.prisma.outcomeCategory.update({ where, data });
  }

  async getOutcomeCategories(params: OutcomeCategoryGetParams): Promise<OutcomeCategory[]> {
    return this.prisma.outcomeCategory.findMany(params);
  }

  async findOutcomeCategoryByUniqueField(where: Prisma.OutcomeCategoryWhereUniqueInput): Promise<OutcomeCategory | null> {
    return this.prisma.outcomeCategory.findUnique({
      where,
    });
  }

  async deleteOutcomeCategory(id: number): Promise<void> {
    await this.prisma.outcomeCategory.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    });
  }

  async createCategory(data: CategoryCreateParams): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async updateCategory(params: CategoryUpdateParams): Promise<Category> {
    const { where, data } = params;
    return this.prisma.category.update({ where, data });
  }

  async getCategories(params: CategoryGetParams): Promise<GetCategoryWithSubCategories[]> {
    return this.prisma.category.findMany({
      ...params, include: {
        subCategories: true,
      },
    });
  }

  async findCategoryByUniqueField(where: Prisma.CategoryWhereUniqueInput): Promise<GetCategoryWithSubCategories | null> {
    return this.prisma.category.findFirst({
      where,
      include: {
        subCategories: true,
      },
    });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.prisma.category.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    });
  }
}
