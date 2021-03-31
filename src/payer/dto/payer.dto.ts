import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Payer } from '@prisma/client';

export class PayerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(input: Partial<Payer>) {
    this.id = input.id;
    this.name = input.name;
  }
}

export class CreatePayerDto extends OmitType(PayerDto, ['id' as const]) {
  @ApiHideProperty()
  email: string;
}

export class UpdatePayerDto extends IntersectionType(PayerDto, CreatePayerDto) {
}
