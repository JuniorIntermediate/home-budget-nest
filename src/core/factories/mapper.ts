import { Injectable } from '@nestjs/common';

@Injectable()
export class Mapper {

  mapToDto<T, Y>(model: T, ctor: new (model: T) => Y): Y {
    return new ctor(model);
  }
}
