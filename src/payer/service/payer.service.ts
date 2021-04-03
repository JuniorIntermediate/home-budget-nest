import { Injectable } from '@nestjs/common';
import { PayerRepository } from '@core/repositories/payer.repository';
import { CreatePayerDto, PayerDto, UpdatePayerDto } from '@payer/dto/payer.dto';
import { PayerCreateParams, PayerGetParams, PayerUpdateParams } from '@core/schema-types/payer.params';
import { Mapper } from '@core/factories/mapper';

@Injectable()
export class PayerService {

  constructor(
    private readonly payerRepository: PayerRepository,
    private mapper: Mapper,
  ) {
  }

  async createPayer(payerDto: CreatePayerDto): Promise<PayerDto> {
    const data: PayerCreateParams = {
      name: payerDto.name,
      user: {
        connect: {
          id: payerDto.userId,
        },
      },
    };
    const createdPayer = await this.payerRepository.createPayer(data);
    return this.mapper.mapToDto(createdPayer, PayerDto);
  }

  async updatePayer(payerDto: UpdatePayerDto): Promise<PayerDto> {
    const params: PayerUpdateParams = {
      data: {
        name: payerDto.name,
      },
      where: {
        id: payerDto.id,
      },
    };
    const updatedPayer = await this.payerRepository.updatePayer(params);
    return this.mapper.mapToDto(updatedPayer, PayerDto);
  }

  async deletePayer(id: number): Promise<void> {
    await this.payerRepository.deletePayer(id);
  }

  async getPayers(id: number): Promise<PayerDto[]> {
    const params: PayerGetParams = {
      where: {
        user: {
          id,
        },
        isDeleted: false,
      },
    };
    const payers = await this.payerRepository.getPayers(params);
    return payers.map(payer => this.mapper.mapToDto(payer, PayerDto));
  }

  async getPayer(id: number): Promise<PayerDto> {
    const payer = await this.payerRepository.getPayerByUniqueField({ id });
    return this.mapper.mapToDto(payer, PayerDto);
  }
}
