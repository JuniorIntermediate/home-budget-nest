import { Module } from '@nestjs/common';
import { BudgetService } from '@budget/services/budget.service';
import { BudgetController } from '@budget/controllers/budget.controller';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService]
})
export class BudgetModule {}
