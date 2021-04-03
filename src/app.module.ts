import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { CoreModule } from '@core/core.module';
import { CategoryModule } from '@category/category.module';
import { PayerModule } from '@payer/payer.module';
import { CurrencyModule } from '@currency/currency.module';
import { BudgetModule } from '@budget/budget.module';
import { TransactionModule } from '@transaction/transaction.module';

@Module({
  imports: [CoreModule.register(), AuthModule, CategoryModule, PayerModule, CurrencyModule, BudgetModule, TransactionModule],
})
export class AppModule {
}
