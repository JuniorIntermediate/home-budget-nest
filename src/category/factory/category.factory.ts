import { Injectable } from '@nestjs/common';
import { Category, IncomeCategory, OutcomeCategory, SubCategory } from '@prisma/client';
import { IncomeCategoryDto } from '../dto/income-category.dto';
import { OutcomeCategoryDto } from '../dto/outcome-category.dto';
import { CategoryDto } from '../dto/category.dto';
import { SubCategoryDto } from '../dto/sub-category.dto';

type DtoTypes = IncomeCategoryDto | OutcomeCategoryDto | CategoryDto | SubCategoryDto;
type InputTypes = IncomeCategory | OutcomeCategory | Category | SubCategory;

@Injectable()
export class CategoryFactory {

  mapToDto<T extends InputTypes, Y extends DtoTypes>(model: T, value: new (model: T) => Y): Y {
    return new value(model);
  }
}
