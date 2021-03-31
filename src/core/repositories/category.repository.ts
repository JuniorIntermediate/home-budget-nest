import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Category, IncomeCategory, OutcomeCategory, SubCategory } from '@prisma/client';
import {
  CategoryCreateParams,
  CategoryGetByUniqueFieldParams,
  CategoryGetParams,
  CategoryUpdateParams,
  GetCategoryWithSubCategories,
  IncomeCategoryCreateParams,
  IncomeCategoryGetByUniqueFieldParams,
  IncomeCategoryGetParams,
  IncomeCategoryUpdateParams,
  OutcomeCategoryCreateParams,
  OutcomeCategoryGetByUniqueFieldParams,
  OutcomeCategoryGetParams,
  OutcomeCategoryUpdateParams,
  SubCategoryCreateParams,
  SubCategoryGetByUniqueFieldParams,
  SubCategoryUpdateParams,
} from '../schema-types/category.params';

@Injectable()
export class CategoryRepository {

  constructor(private readonly prisma: PrismaService) {
  }

  async createIncomeCategory(data: IncomeCategoryCreateParams): Promise<IncomeCategory> {
    return this.prisma.incomeCategory.create({ data });
  }

  async updateIncomeCategory(params: IncomeCategoryUpdateParams): Promise<IncomeCategory> {
    return this.prisma.incomeCategory.update(params);
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
    return this.prisma.incomeCategory.findMany(params);
  }

  async findIncomeCategoryByUniqueField(where: IncomeCategoryGetByUniqueFieldParams): Promise<IncomeCategory | null> {
    return this.prisma.incomeCategory.findUnique({ where });
  }

  async createOutcomeCategory(data: OutcomeCategoryCreateParams): Promise<OutcomeCategory> {
    return this.prisma.outcomeCategory.create({ data });
  }

  async updateOutcomeCategory(params: OutcomeCategoryUpdateParams): Promise<OutcomeCategory> {
    return this.prisma.outcomeCategory.update(params);
  }

  async getOutcomeCategories(params: OutcomeCategoryGetParams): Promise<OutcomeCategory[]> {
    return this.prisma.outcomeCategory.findMany(params);
  }

  async findOutcomeCategoryByUniqueField(where: OutcomeCategoryGetByUniqueFieldParams): Promise<OutcomeCategory | null> {
    return this.prisma.outcomeCategory.findUnique({ where });
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
    return this.prisma.category.update(params);
  }

  async getCategories(params: CategoryGetParams): Promise<GetCategoryWithSubCategories[]> {
    return this.prisma.category.findMany({
      ...params,
      include: {
        subCategories: {
          where: {
            isDeleted: false,
          },
        },
      },
    });
  }

  async findCategoryByUniqueField(where: CategoryGetByUniqueFieldParams): Promise<Category | null> {
    return this.prisma.category.findUnique({ where });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.prisma.category.update({
      data: {
        isDeleted: true,
        subCategories: {
          updateMany: {
            where: {
              categoryId: id,
            },
            data: {
              isDeleted: true,
            },
          },
        },
      },
      where: {
        id,
      },
    });
  }

  async findSubCategoryByUniqueField(where: SubCategoryGetByUniqueFieldParams): Promise<SubCategory | null> {
    return this.prisma.subCategory.findUnique({ where });
  }

  async createSubCategory(data: SubCategoryCreateParams): Promise<SubCategory> {
    return this.prisma.subCategory.create({ data });
  }

  async updateSubCategory(params: SubCategoryUpdateParams): Promise<SubCategory> {
    return this.prisma.subCategory.update(params);
  }

  async deleteSubCategory(id: number): Promise<void> {
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
