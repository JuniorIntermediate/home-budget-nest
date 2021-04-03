import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
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
  SubcategoryCreateParams,
  SubcategoryGetByUniqueFieldParams,
  SubcategoryUpdateParams,
} from '@core/schema-types/category.params';
import { Category, IncomeCategory, OutcomeCategory, Subcategory } from 'src/generated-prisma';

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

  async findCategoryByUniqueField(where: CategoryGetByUniqueFieldParams): Promise<GetCategoryWithSubCategories> {
    return this.prisma.category.findUnique({ where, include: { subCategories: true } });
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

  async findSubcategoryByUniqueField(where: SubcategoryGetByUniqueFieldParams): Promise<Subcategory | null> {
    return this.prisma.subcategory.findUnique({ where });
  }

  async createSubcategory(data: SubcategoryCreateParams): Promise<Subcategory> {
    return this.prisma.subcategory.create({ data });
  }

  async updateSubcategory(params: SubcategoryUpdateParams): Promise<Subcategory> {
    return this.prisma.subcategory.update(params);
  }

  async deleteSubcategory(id: number): Promise<void> {
    await this.prisma.category.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    });
  }

  async findCategoryByUniqueFieldWithSubcategory(id: number, subcategoryId?: number) {
    if (subcategoryId) {
      return this.prisma.category.findFirst({
        where: {
          id,
          isDeleted: false,
          subCategories: {
            some: {
              id: {
                equals: subcategoryId,
              },
            },
          },
        },
      });
    }
    return this.prisma.category.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
  }
}
