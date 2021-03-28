/*
  Warnings:

  - You are about to drop the column `outcomeCategoryId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_outcomeCategoryId_fkey";

-- DropIndex
DROP INDEX "Category_outcomeCategoryId_unique";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "outcomeCategoryId";
