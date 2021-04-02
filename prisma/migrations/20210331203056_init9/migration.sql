-- DropIndex
DROP INDEX "RecurringExpense_payerId_unique";

-- DropIndex
DROP INDEX "Expense_outcomeCategoryId_unique";

-- DropIndex
DROP INDEX "Expense_categoryId_unique";

-- DropIndex
DROP INDEX "Expense_payerId_unique";

-- DropIndex
DROP INDEX "RecurringExpense_currencyId_unique";

-- DropIndex
DROP INDEX "RecurringExpense_outcomeCategoryId_unique";

-- DropIndex
DROP INDEX "Expense_budgetId_unique";

-- DropIndex
DROP INDEX "RecurringExpense_budgetId_unique";

-- DropIndex
DROP INDEX "RecurringExpense_categoryId_unique";

-- DropIndex
DROP INDEX "Expense_currencyId_unique";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "subcategoryId" INTEGER,
ADD COLUMN     "incomeCategoryId" INTEGER,
ALTER COLUMN "outcomeCategoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RecurringExpense" ADD COLUMN     "subcategoryId" INTEGER,
ADD COLUMN     "incomeCategoryId" INTEGER,
ALTER COLUMN "outcomeCategoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("subcategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("incomeCategoryId") REFERENCES "IncomeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringExpense" ADD FOREIGN KEY ("subcategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringExpense" ADD FOREIGN KEY ("incomeCategoryId") REFERENCES "IncomeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
