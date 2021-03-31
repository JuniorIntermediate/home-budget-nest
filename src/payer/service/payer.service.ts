import { BadRequestException, Injectable } from '@nestjs/common';
import { PayerRepository } from '../../core/repositories/payer.repository';
import { UserRepository } from '../../core/repositories/user.repository';
import { CreatePayerDto, PayerDto, UpdatePayerDto } from '../dto/payer.dto';
import { PayerCreateParams, PayerGetParams, PayerUpdateParams } from '../../core/schema-types/payer.params';
import { Factory } from '../../core/factories/factory';

@Injectable()
export class PayerService {

  constructor(
    private readonly payerRepository: PayerRepository,
    private readonly userRepository: UserRepository,
    private factory: Factory,
  ) {
  }

  async createPayer(payerDto: CreatePayerDto): Promise<void> {
    const payer = await this.payerRepository.getPayerByUniqueField({ name: payerDto.name });
    const user = await this.userRepository.findUserByUniqueField({ email: payerDto.email });
    if (!user) {
      throw new BadRequestException('User doesn\'t exist!');
    }
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
    await this.payerRepository.createPayer(data);
  }

  async updatePayer(payerDto: UpdatePayerDto): Promise<void> {
    const payer = await this.payerRepository.getPayerByUniqueField({ name: payerDto.name });
    const user = await this.userRepository.findUserByUniqueField({ email: payerDto.email });
    if (!user) {
      throw new BadRequestException('User doesn\'t exist!');
    }
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
    await this.payerRepository.updatePayer(params);
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
    return payers.map(payer => this.factory.mapToDto(payer, PayerDto));
  }
}
