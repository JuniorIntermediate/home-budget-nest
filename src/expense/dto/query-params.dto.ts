import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform, Type } from 'class-transformer';
import { FieldEnum, OperatorEnum, OrderByFieldEnum, OrderDirectionEnum } from '../enums/filter.enum';

export class FilterParameterDto {
  @ApiProperty({ enum: FieldEnum, enumName: 'field', example: 'date', description: 'Filter field' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (value ? value : null), { toClassOnly: true })
  field: FieldEnum;

  @ApiProperty({ enum: OperatorEnum, enumName: 'operator', example: 'EQ', description: 'Filter operator' })
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
  @Transform(({ value }) => (value ? value.toUpperCase() : null), { toClassOnly: true })
  operator: OperatorEnum;

  @ApiProperty({
    example: '2021-04-01T00:00:00.000Z', oneOf: [
      {
        type: 'number',
      },
      {
        type: 'Date',
      },
      {
        type: 'string',
      },
      {
        type: 'number[]',
      },
      {
        type: 'Date[]',
      },
      {
        type: 'string[]',
      },
    ],
  })
  value: string | string[] | Date | Date[] | number | number[];
}

export class QueryParamsDto {
  @ApiProperty({ required: false, example: 10, description: 'Limit result. Connected with page field.' })
  @Transform(({ value }) => (value ? parseInt(value) : null), { toClassOnly: true })
  limit: number;

  @ApiProperty({ required: false, example: 1, description: 'Page describes db offset. Connected with limit field.' })
  @Transform(({ value }) => (value ? parseInt(value) : null), { toClassOnly: true })
  page: number;

  @ApiProperty({
    required: false,
    enumName: 'orderBy',
    description: 'Order by field, connected with orderDirection field',
    enum: OrderByFieldEnum,
    example: OrderByFieldEnum.DATE,
  })
  orderBy: OrderByFieldEnum;

  @ApiProperty({
    enum: OrderDirectionEnum,
    enumName: 'direction',
    description: 'Order direction, connected with orderBy field',
    required: false,
    example: OrderDirectionEnum.DESC,
  })
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  @Transform(({ value }) => (value ? value.toLowerCase() : null), { toClassOnly: true })
  orderDirection: OrderDirectionEnum;

  @ApiProperty({
    type: FilterParameterDto,
    required: false,
    isArray: true,
    example: [{ field: 'date', operator: 'EQ', value: '2021-04-01T00:00:00.000Z' }],
    description: 'Filters parameter is array of objects.',
  })
  @Transform(({ value }) => {
    return Array.isArray(value) ? value.map(v => plainToClass(FilterParameterDto, JSON.parse(v))) :
      value ? [plainToClass(FilterParameterDto, JSON.parse(value))]
        : [];
  }, {
    toClassOnly: true,
  })
  @Type(() => FilterParameterDto)
  filters: FilterParameterDto[];
}
