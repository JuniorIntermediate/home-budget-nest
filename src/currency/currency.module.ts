import { HttpModule, Module } from '@nestjs/common';
import { CurrencyService } from '@currency/services/currency.service';
import { CurrencyController } from '@currency/controllers/currency.controller';
import { ExternalApiService } from '@currency/services/external-api.service';
import { CurrencyValidatorPipe } from '@currency/validators/currency-validator.pipe';

@Module({
  imports: [HttpModule],
  providers: [CurrencyValidatorPipe, CurrencyService, ExternalApiService],
  controllers: [CurrencyController],
})
export class CurrencyModule {
}
