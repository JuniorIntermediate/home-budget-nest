import { Module } from '@nestjs/common';
import { TransactionService } from '@transaction/services/transaction.service';
import { TransactionController } from '@transaction/controllers/transaction.controller';
import { QueryValidatorPipe } from '@transaction/validators/query-validators.pipe';
import { CreateTransactionValidatorPipe } from '@transaction/validators/create-transaction-validator.pipe';
import { FilterBuilder } from '@transaction/services/filter.builder';

@Module({
  controllers: [TransactionController],
  providers: [QueryValidatorPipe, CreateTransactionValidatorPipe, FilterBuilder, TransactionService],
})
export class TransactionModule {
}
