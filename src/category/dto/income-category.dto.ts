import { IncomeCategory } from 'src/generated-prisma';
import { BaseCategoryDto } from '@category/dto';

export class IncomeCategoryDto extends BaseCategoryDto {
  constructor(input?: Partial<IncomeCategory>) {
    super(input);
  }
}
