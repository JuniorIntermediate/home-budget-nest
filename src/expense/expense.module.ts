import { Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ExpenseController } from './controllers/expense.controller';
import { QueryValidatorPipe } from './validators/query-validators.pipe';
import { CreateExpenseValidatorPipe } from './validators/create-expense-validator.pipe';
import { FilterBuilder } from './services/filter.builder';

@Module({
  controllers: [ExpenseController],
  providers: [QueryValidatorPipe, CreateExpenseValidatorPipe, FilterBuilder, ExpenseService],
})
export class ExpenseModule {
}
