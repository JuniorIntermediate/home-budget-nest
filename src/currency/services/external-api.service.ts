import { HttpService, Injectable } from '@nestjs/common';
import { ExternalApiResponseInterface } from '../interfaces/external-currency.interface';
import { map } from 'rxjs/operators';
import { CURRENCY_EXTERNAL_API } from 'src/core/models/constants';

@Injectable()
export class ExternalApiService {

  constructor(private httpService: HttpService) {
  }

  getCurrencies(): Promise<ExternalApiResponseInterface> {
    return this.httpService.get<ExternalApiResponseInterface[]>(CURRENCY_EXTERNAL_API)
      .pipe(
        map(({ data }) => data[0]),
      )
      .toPromise();
  }
}
