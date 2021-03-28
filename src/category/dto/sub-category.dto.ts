import { ApiProperty } from '@nestjs/swagger';

export class SubCategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}
