import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';

export class IncomeCategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty({ readOnly: true })
  userId?: number;

  constructor(input?: Partial<IncomeCategoryDto>) {
    this.id = input.id;
    this.name = input.name;
    this.icon = input.icon;
    this.userId = input.userId;
  }
}

export class CreateIncomeCategoryDto extends OmitType(IncomeCategoryDto, ['id'] as const) {
  @ApiHideProperty()
  email: string;
}

export class UpdateIncomeCategoryDto extends IntersectionType(IncomeCategoryDto, CreateIncomeCategoryDto) {
}
