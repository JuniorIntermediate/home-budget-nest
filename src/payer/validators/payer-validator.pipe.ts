import { BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { PayerRepository } from '@core/repositories/payer.repository';
import { CreatePayerDto, UpdatePayerDto } from '@payer/dto/payer.dto';

@Injectable()
export class PayerValidatorPipe implements PipeTransform {

  constructor(
    private readonly payerRepository: PayerRepository,
  ) {
  }

  async transform(value: CreatePayerDto): Promise<CreatePayerDto> {
    const payer = await this.payerRepository.getPayerByUniqueField({ name: value.name });

    if (value instanceof CreatePayerDto && payer) {
      throw new BadRequestException('The name of payer must be unique!');
    }
    if (value instanceof UpdatePayerDto && !payer) {
      throw new NotFoundException('Category doesn\'t exist!');
    }
    if (value instanceof UpdatePayerDto) {
      if (payer.id !== value.id) {
        throw new BadRequestException('The name of payer must be unique!');
      }
    }
    return value;
  }
}
