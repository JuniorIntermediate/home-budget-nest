import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IncomeCategory, OutcomeCategory } from '@prisma/client';
import { IncomeCategoryUpdateParams, OutcomeCategoryUpdateParams } from '../schema-types/category.update-params';
import { IncomeCategoryCreateParams, OutcomeCategoryCreateParams } from '../schema-types/category.create-params';
import { IncomeCategoryGetParams, OutcomeCategoryGetParams } from '../schema-types/category.get-params';

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
    return this.prisma.incomeCategory.findMany(params);
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
}
