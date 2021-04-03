import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { FilterParameterDto, QueryParamsDto } from '@transaction/dto/query-params.dto';
import { DateTime } from 'luxon';
import { FieldEnum, OperatorEnum } from '@transaction/enums/filter.enum';

@Injectable()
export class QueryValidatorPipe implements PipeTransform {
  transform(value: QueryParamsDto): QueryParamsDto {
    if (this.isEmpty(value)) {
      return null;
    }
    const errors = this.validate(value);
    if (errors.length) {
      throw new BadRequestException(`Validation failed: ${errors.join(' ')}`);
    }
    return value;
  }

  private isEmpty = (value: QueryParamsDto) => Object.keys(value).length < 1;

  private validate = (object: QueryParamsDto) => {
    const errors: string[] = [];
    if (object.page !== undefined && object.limit === undefined) {
      errors.push('Limit is required with page field!');
    }
    if (object.limit !== undefined && object.page === undefined) {
      errors.push('Page is required with limit field!');
    }
    if (object.orderBy !== undefined && object.orderDirection === undefined) {
      errors.push('Order direction is required with orderBy field!');
    }
    if (object.orderDirection !== undefined && object.orderBy === undefined) {
      errors.push('Order by is required with orderDirection field!');
    }
    if (object.filters) {
      object.filters.forEach(filter => {
        errors.push(...this.validateFilter(filter));
      });
    }
    return errors;
  };

  private validateFilter = (filter: FilterParameterDto): string[] => {
    const errors: string[] = [];
    errors.push(...this.validateFilterOperator(filter));
    switch (filter.field) {
      case FieldEnum.DATE:
        errors.push(...this.validateFilterValue(filter, 'date'));
        break;
      case FieldEnum.AMOUNT:
      case FieldEnum.CURRENCY:
      case FieldEnum.PAY_FROM:
      case FieldEnum.CATEGORY:
      case FieldEnum.SUBCATEGORY:
      case FieldEnum.OUTCOME_CATEGORY:
      case FieldEnum.INCOME_CATEGORY:
      case FieldEnum.PAYER:
        errors.push(...this.validateFilterValue(filter, 'number'));
        break;
      case FieldEnum.NOTE:
        errors.push(...this.validateFilterValue(filter, 'string'));
        break;
      default:
        errors.push('Provided field doesn\'t exist!');
        break;
    }
    return errors;
  };

  private validateFilterOperator = (filter: FilterParameterDto): string[] => {
    const errors: string[] = [];
    switch (filter.operator) {
      case OperatorEnum.NOT_IN:
      case OperatorEnum.IN:
        if (!Array.isArray(filter.value)) {
          errors.push('For IN operator value must be an array!');
        }
        break;
      case OperatorEnum.BETWEEN:
        if (!Array.isArray(filter.value) || filter.value.length !== 2) {
          errors.push('For BETWEEN operator value must be an array and must have 2 values!');
        }
        break;
      case OperatorEnum.GT:
      case OperatorEnum.LT:
      case OperatorEnum.GTE:
      case OperatorEnum.LTE:
      case OperatorEnum.EQ:
      case OperatorEnum.NOT:
        if (Array.isArray(filter.value)) {
          errors.push('For GT/LT/GTE/LTE/EQ/NOT operator value must be one!');
        }
        break;
      case OperatorEnum.CONTAINS:
        if (Array.isArray(filter.value) || typeof filter.value === 'number') {
          errors.push('For CONTAINS operator value must be a single string!');
        }
        if (filter.field !== FieldEnum.NOTE) {
          errors.push('CONTAINS operator are not allowed for this field!');
        }
        break;
      default:
        errors.push('Operator doesn\'t exist!');
        break;
    }
    return errors;
  };

  private validateFilterValue = (filter: FilterParameterDto, fieldType: 'string' | 'number' | 'date'): string[] => {
    const errors: string[] = [];
    switch (fieldType) {
      case 'string': {
        const isArrayAndString = Array.isArray(filter.value) && filter.value.some((v: string | number | Date) => typeof v !== 'string');
        const isNotArrayAndString = !Array.isArray(filter.value) && typeof filter.value !== 'string';
        if (isArrayAndString || isNotArrayAndString) {
          errors.push('Filter value must be string!');
        }
        break;
      }
      case 'number':
        const isArrayAndNumber = Array.isArray(filter.value) && filter.value.some((v: string | number | Date) => typeof v !== 'number');
        const isNotArrayAndNumber = !Array.isArray(filter.value) && typeof filter.value !== 'number';
        if (isArrayAndNumber || isNotArrayAndNumber) {
          errors.push('Filter value must be number!');
        }
        break;
      case 'date':
        const isArray = Array.isArray(filter.value);
        const isArrayAndString = isArray && (filter.value as []).every((v: string | number | Date) => typeof v === 'string');
        const isNotArrayAndString = !isArray && typeof filter.value === 'string';
        if (isArrayAndString || isNotArrayAndString) {
          const isArrayAndDate = isArrayAndString && (filter.value as string[]).map(v => DateTime.fromISO(v)).every(v => v.isValid);
          const isNotArrayAndDate = isNotArrayAndString && DateTime.fromISO(filter.value as string).isValid;
          if (!isArrayAndDate && !isNotArrayAndDate) {
            errors.push('Filter value must be valid ISO date!');
          }
        } else {
          errors.push('Filter value must be string!');
        }
        break;
    }
    return errors;
  };
}

