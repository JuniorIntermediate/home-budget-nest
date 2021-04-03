/*
  Warnings:

  - Added the required column `currencyCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exchangeRate` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "currencyCode" VARCHAR(3) NOT NULL,
ADD COLUMN     "exchangeRate" DECIMAL(8,4) NOT NULL;
