import { HttpModule, Module } from '@nestjs/common';
import { CurrencyService } from './services/currency.service';
import { CurrencyController } from './controllers/currency.controller';
import { ExternalApiService } from './services/external-api.service';

@Module({
  imports: [HttpModule],
  providers: [CurrencyService, ExternalApiService],
  controllers: [CurrencyController]
})
export class CurrencyModule {}
