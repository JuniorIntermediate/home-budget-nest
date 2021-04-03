import { Injectable } from '@nestjs/common';
import { PrismaFilterParams, TransactionGetParams } from '@core/schema-types/transaction.params';
import { FilterParameterDto, QueryParamsDto } from '@transaction/dto/query-params.dto';
import { OperatorEnum } from '@transaction/enums/filter.enum';

@Injectable()
export class FilterBuilder {
  private queryBuilder: TransactionGetParams = {};

  build(): TransactionGetParams {
    return this.queryBuilder;
  }

  withLimit({ page, limit }: QueryParamsDto): this {
    if (page && limit) {
      const skip = limit * (page - 1);
      this.queryBuilder = { ...this.queryBuilder, skip, take: limit };
    }
    return this;
  }

  withFilters({ filters }: QueryParamsDto): this {
    if (filters) {
      filters.forEach(filter => {
        const filterOperator = this.applyFilterOperator(filter);
        this.queryBuilder = {
          ...this.queryBuilder,
          where: {
            ...this.queryBuilder.where,
            [filter.field]: filterOperator,
          },
        };
      });
    }
    return this;
  }

  withOrder({ orderBy, orderDirection }: QueryParamsDto): this {
    if (orderBy && orderDirection) {
      this.queryBuilder = {
        ...this.queryBuilder, orderBy: {
          [orderBy]: orderDirection.toLowerCase(),
        },
      };
    }
    return this;
  }

  private applyFilterOperator = <T extends PrismaFilterParams>(filter: FilterParameterDto): T => {
    switch (filter.operator) {
      case OperatorEnum.LT:
      case OperatorEnum.GT:
      case OperatorEnum.IN:
      case OperatorEnum.GTE:
      case OperatorEnum.LTE:
      case OperatorEnum.NOT:
        return {
          [filter.operator.toLowerCase()]: filter.value,
        } as T;
      case OperatorEnum.CONTAINS:
        return {
          contains: filter.value,
          mode: 'insensitive',
        } as T;
      case OperatorEnum.BETWEEN:
        const [gte, lte] = filter.value as [string | number | Date, string | number | Date];
        return {
          gte,
          lte,
        } as T;
      case OperatorEnum.EQ:
        return {
          equals: filter.value,
        } as T;
      case OperatorEnum.NOT_IN:
        return {
          notIn: filter.value,
        } as T;
    }
  };
}
