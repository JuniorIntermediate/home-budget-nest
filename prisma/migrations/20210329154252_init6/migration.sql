/*
  Warnings:

  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - Added the required column `verificationToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivationStatus" AS ENUM ('DISABLED', 'PENDING', 'ACTIVE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActive",
ADD COLUMN     "verificationToken" TEXT NOT NULL,
ADD COLUMN     "activationStatus" "ActivationStatus" NOT NULL DEFAULT E'PENDING';
