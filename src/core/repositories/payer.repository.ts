import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Payer } from '@prisma/client';
import {
  PayerCreateParams,
  PayerGetByUniqueFieldParams,
  PayerGetParams,
  PayerUpdateParams,
} from '../schema-types/payer.params';

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
