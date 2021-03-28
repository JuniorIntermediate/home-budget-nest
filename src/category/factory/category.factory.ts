import { Injectable } from '@nestjs/common';
import { Category, IncomeCategory, OutcomeCategory } from '@prisma/client';
import { IncomeCategoryDto } from '../dto/income-category.dto';
import { OutcomeCategoryDto } from '../dto/outcome-category.dto';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryFactory {

  mapToDto<T extends IncomeCategory | OutcomeCategory | Category>(model: T): IncomeCategoryDto | OutcomeCategoryDto | CategoryDto {
    let returnModel = isIncomeCategory(model) ? new IncomeCategoryDto(model) : new OutcomeCategoryDto(model);
    returnModel = !isCategory(model) ? returnModel : new CategoryDto(model);
    return returnModel;
  }
}


function isIncomeCategory(model: IncomeCategory | OutcomeCategory | Category): model is IncomeCategory {
  return true;
}

function isCategory(model: IncomeCategory | OutcomeCategory | Category): model is Category {
  return true;
}
