/*
  Warnings:

  - You are about to alter the column `value` on the `Budget` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(12,2)`.
  - You are about to alter the column `currentValue` on the `Budget` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(12,2)`.
  - You are about to alter the column `exchangeRate` on the `Currency` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(8,4)`.
  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(12,2)`.
  - You are about to alter the column `amount` on the `RecurringExpense` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "Budget" ALTER COLUMN "value" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "currentValue" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "Currency" ALTER COLUMN "exchangeRate" SET DATA TYPE DECIMAL(8,4);

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "RecurringExpense" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2);
