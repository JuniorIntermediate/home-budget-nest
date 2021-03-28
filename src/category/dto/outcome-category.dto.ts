import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';

export class OutcomeCategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty({ readOnly: true })
  userId?: number;

  constructor(input?: Partial<OutcomeCategoryDto>) {
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
