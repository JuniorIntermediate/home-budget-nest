import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform, Type } from 'class-transformer';
import { FieldEnum, OperatorEnum, OrderByFieldEnum, OrderDirectionEnum } from '@transaction/enums/filter.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FilterParameterDto {
  @ApiProperty({ enum: FieldEnum, enumName: 'field', example: 'date', description: 'Filter field' })
  @Transform(({ value }: ({ value: FieldEnum })) => (value ? value : null), { toClassOnly: true })
  @IsNotEmpty()
  @IsEnum(FieldEnum)
  field: FieldEnum;

  @ApiProperty({ enum: OperatorEnum, enumName: 'operator', example: 'EQ', description: 'Filter operator' })
  @Transform(({ value }: ({ value: OperatorEnum })) => (value ? value.toUpperCase() : null), { toClassOnly: true })
  @IsNotEmpty()
  @IsEnum(OperatorEnum)
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
  @IsNotEmpty()
  value: string | string[] | Date | Date[] | number | number[];
}

export class QueryParamsDto {
  @ApiProperty({ required: false, example: 10, description: 'Limit result. Connected with page field.' })
  @Transform(({ value }: ({ value: string })) => (value ? parseInt(value) : null), { toClassOnly: true })
  @IsOptional()
  @IsNumber()
  limit: number;

  @ApiProperty({ required: false, example: 1, description: 'Page describes db offset. Connected with limit field.' })
  @Transform(({ value }: ({ value: string })) => (value ? parseInt(value) : null), { toClassOnly: true })
  @IsOptional()
  @IsNumber()
  page: number;

  @ApiProperty({
    required: false,
    enumName: 'orderBy',
    description: 'Order by field, connected with orderDirection field',
    enum: OrderByFieldEnum,
    example: OrderByFieldEnum.DATE,
  })
  @IsOptional()
  @IsEnum(OrderByFieldEnum)
  orderBy: OrderByFieldEnum;

  @ApiProperty({
    enum: OrderDirectionEnum,
    enumName: 'direction',
    description: 'Order direction, connected with orderBy field',
    required: false,
    example: OrderDirectionEnum.DESC,
  })
  @Transform(({ value }: ({ value: OrderDirectionEnum })) => (value ? value.toLowerCase() : null), { toClassOnly: true })
  @IsOptional()
  @IsEnum(OrderDirectionEnum)
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
  @IsOptional()
  filters: FilterParameterDto[];
}
