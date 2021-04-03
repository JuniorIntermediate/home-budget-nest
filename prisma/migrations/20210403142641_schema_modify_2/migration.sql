-- AlterTable
ALTER TABLE "RecurringTransaction" ALTER COLUMN "currencyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "currencyId" DROP NOT NULL;
