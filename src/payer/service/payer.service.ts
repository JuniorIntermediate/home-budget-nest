import { BadRequestException, Injectable } from '@nestjs/common';
import { PayerRepository } from '../../core/repositories/payer.repository';
import { CreatePayerDto, PayerDto, UpdatePayerDto } from '../dto/payer.dto';
import { PayerCreateParams, PayerGetParams, PayerUpdateParams } from '../../core/schema-types/payer.params';
import { Mapper } from '../../core/factories/mapper';

@Injectable()
export class PayerService {

  constructor(
    private readonly payerRepository: PayerRepository,
    private mapper: Mapper,
  ) {
  }

  async createPayer(payerDto: CreatePayerDto): Promise<PayerDto> {
    const payer = await this.payerRepository.getPayerByUniqueField({ name: payerDto.name });
    if (payer) {
      throw new BadRequestException('The name of payer must be unique!');
    }
    const data: PayerCreateParams = {
      name: payerDto.name,
      user: {
        connect: {
          email: payerDto.email,
        },
      },
    };
    const createdPayer = await this.payerRepository.createPayer(data);
    return this.mapper.mapToDto(createdPayer, PayerDto);
  }

  async updatePayer(payerDto: UpdatePayerDto): Promise<PayerDto> {
    const payer = await this.payerRepository.getPayerByUniqueField({ name: payerDto.name });
    if (payer && payer.id !== payerDto.id) {
      throw new BadRequestException('The name of payer must be unique!');
    }
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

  async getPayers(email: string): Promise<PayerDto[]> {
    const params: PayerGetParams = {
      where: {
        user: {
          email,
        },
        isDeleted: false,
      },
    };
    const payers = await this.payerRepository.getPayers(params);
    return payers.map(payer => this.mapper.mapToDto(payer, PayerDto));
  }
}
