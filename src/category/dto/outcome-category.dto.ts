import { OutcomeCategory } from '@prisma/client';
import { BaseCategoryDto } from './base-category.dto';

export class OutcomeCategoryDto extends BaseCategoryDto {

  constructor(input?: Partial<OutcomeCategory>) {
    super(input);
  }
}
