import { OutcomeCategory } from 'src/generated-prisma';
import { BaseCategoryDto } from '@category/dto';

export class OutcomeCategoryDto extends BaseCategoryDto {

  constructor(input?: Partial<OutcomeCategory>) {
    super(input);
  }
}
