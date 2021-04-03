import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { Payer } from 'src/generated-prisma';

export class PayerDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  constructor(input: Partial<Payer>) {
    this.id = input.id;
    this.name = input.name;
  }
}

export class CreatePayerDto extends OmitType(PayerDto, ['id' as const]) {
  @ApiHideProperty()
  userId: number;
}

export class UpdatePayerDto extends IntersectionType(PayerDto, CreatePayerDto) {
}
