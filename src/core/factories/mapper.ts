import { Injectable } from '@nestjs/common';
import { Category, IncomeCategory, OutcomeCategory, Payer, SubCategory } from '@prisma/client';
import { PayerDto } from '../../payer/dto/payer.dto';
import { CategoryDto, IncomeCategoryDto, OutcomeCategoryDto, SubCategoryDto } from '../../category/dto';

type DtoTypes = IncomeCategoryDto | OutcomeCategoryDto | CategoryDto | SubCategoryDto | PayerDto;
type InputTypes = IncomeCategory | OutcomeCategory | Category | SubCategory | Payer;

@Injectable()
export class Mapper {

  mapToDto<T extends InputTypes, Y extends DtoTypes>(model: T, ctor: new (model: T) => Y): Y {
    return new ctor(model);
  }
}
