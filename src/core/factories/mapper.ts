import { Injectable } from '@nestjs/common';

@Injectable()
export class Mapper {

  mapToDto<T, Y>(model: Partial<T>, ctor: new (model: Partial<T>) => Y): Y {
    return new ctor(model);
  }
}
