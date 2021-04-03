-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "currencyCode" DROP NOT NULL,
ALTER COLUMN "exchangeRate" DROP NOT NULL;
