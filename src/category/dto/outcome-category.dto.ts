import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { OutcomeCategory } from '@prisma/client';

export class OutcomeCategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiHideProperty()
  userId?: number;

  constructor(input?: Partial<OutcomeCategory>) {
    this.id = input.id;
    this.name = input.name;
    this.icon = input.icon;
    this.userId = input.userId;
  }
}

export class CreateOutcomeCategoryDto extends OmitType(OutcomeCategoryDto, ['id'] as const) {
  @ApiHideProperty()
  email: string;
}

export class UpdateOutcomeCategoryDto extends IntersectionType(OutcomeCategoryDto, CreateOutcomeCategoryDto) {
}
