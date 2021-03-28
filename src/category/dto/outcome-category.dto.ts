import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';

export class OutcomeCategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}

export class CreateOutcomeCategoryDto extends OmitType(OutcomeCategoryDto, ['id'] as const) {
  @ApiHideProperty()
  email: string;
}

export class UpdateOutcomeCategoryDto extends IntersectionType(OutcomeCategoryDto, CreateOutcomeCategoryDto) {
}
