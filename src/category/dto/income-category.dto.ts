import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';

export class IncomeCategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}

export class CreateIncomeCategoryDto extends OmitType(IncomeCategoryDto, ['id'] as const) {
  @ApiHideProperty()
  email: string;
}

export class UpdateIncomeCategoryDto extends IntersectionType(IncomeCategoryDto, CreateIncomeCategoryDto) {
}
