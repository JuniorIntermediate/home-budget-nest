/*
  Warnings:

  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecurringExpense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validMonth` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BudgetType" AS ENUM ('INCOME', 'OUTCOME');

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_incomeCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_outcomeCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_payerId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_subcategoryId_fkey";

-- DropForeignKey
ALTER TABLE "RecurringExpense" DROP CONSTRAINT "RecurringExpense_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "RecurringExpense" DROP CONSTRAINT "RecurringExpense_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "RecurringExpense" DROP CONSTRAINT "RecurringExpense_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "RecurringExpense" DROP CONSTRAINT "RecurringExpense_incomeCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "RecurringExpense" DROP CONSTRAINT "RecurringExpense_outcomeCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "RecurringExpense" DROP CONSTRAINT "RecurringExpense_payerId_fkey";

-- DropForeignKey
ALTER TABLE "RecurringExpense" DROP CONSTRAINT "RecurringExpense_subcategoryId_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "type" "BudgetType" NOT NULL,
ADD COLUMN     "validMonth" DATE NOT NULL;

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "RecurringExpense";

-- DropTable
DROP TABLE "SubCategory";

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "payerId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "subcategoryId" INTEGER,
    "outcomeCategoryId" INTEGER,
    "incomeCategoryId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecurringTransaction" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "dayOfPayment" DATE NOT NULL,
    "activationDate" DATE NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "payerId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "subcategoryId" INTEGER,
    "outcomeCategoryId" INTEGER,
    "incomeCategoryId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionsOnBudgets" (
    "budgetId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("budgetId","transactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory.name_unique" ON "Subcategory"("name");

-- AddForeignKey
ALTER TABLE "Subcategory" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("payerId") REFERENCES "Payer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("outcomeCategoryId") REFERENCES "OutcomeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("incomeCategoryId") REFERENCES "IncomeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringTransaction" ADD FOREIGN KEY ("payerId") REFERENCES "Payer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringTransaction" ADD FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringTransaction" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringTransaction" ADD FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringTransaction" ADD FOREIGN KEY ("outcomeCategoryId") REFERENCES "OutcomeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringTransaction" ADD FOREIGN KEY ("incomeCategoryId") REFERENCES "IncomeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionsOnBudgets" ADD FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionsOnBudgets" ADD FOREIGN KEY ("transactionId") REFERENCES "RecurringTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
