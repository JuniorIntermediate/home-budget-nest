import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import {
  PayerCreateParams,
  PayerGetByUniqueFieldParams,
  PayerGetParams,
  PayerUpdateParams,
} from '@core/schema-types/payer.params';
import { Payer } from 'src/generated-prisma';

@Injectable()
export class PayerRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async createPayer(data: PayerCreateParams): Promise<Payer> {
    return this.prisma.payer.create({ data });
  }

  async updatePayer(params: PayerUpdateParams): Promise<Payer> {
    return this.prisma.payer.update(params);
  }

  async deletePayer(id: number): Promise<void> {
    await this.prisma.payer.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    });
  }

  async getPayers(params: PayerGetParams): Promise<Payer[]> {
    return this.prisma.payer.findMany(params);
  }

  async getPayerByUniqueField(where: PayerGetByUniqueFieldParams): Promise<Payer | null> {
    return this.prisma.payer.findUnique({ where });
  }
}
