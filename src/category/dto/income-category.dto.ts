import { IncomeCategory } from '@prisma/client';
import { BaseCategoryDto } from './base-category.dto';

export class IncomeCategoryDto extends BaseCategoryDto {
  constructor(input?: Partial<IncomeCategory>) {
    super(input);
  }
}
