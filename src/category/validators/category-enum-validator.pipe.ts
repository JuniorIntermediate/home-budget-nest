import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CategoryTypeEnum } from '@category/enums/category-type.enum';

@Injectable()
export class CategoryEnumValidatorPipe implements PipeTransform {

  constructor() {
  }

  transform(value: string): string | null {
    if (!!value) {
      if (!!CategoryTypeEnum[value.toUpperCase()]) {
        return CategoryTypeEnum[value.toUpperCase()] as string;
      }
      throw new BadRequestException('Provided category doesn\'t exist!');
    }
    return null;
  }
}
