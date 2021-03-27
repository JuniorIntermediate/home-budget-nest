-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "value" MONEY NOT NULL,
    "currentValue" MONEY NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutcomeCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "userId" INTEGER NOT NULL,
    "outcomeCategoryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "exchangeRate" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "amount" MONEY NOT NULL,
    "payerId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "subCategoryId" INTEGER NOT NULL,
    "outcomeCategoryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecurringExpense" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "amount" MONEY NOT NULL,
    "dayOfPayment" DATE NOT NULL,
    "activationDate" DATE NOT NULL,
    "payerId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "subCategoryId" INTEGER NOT NULL,
    "outcomeCategoryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" BYTEA NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IncomeCategory.name_unique" ON "IncomeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OutcomeCategory.name_unique" ON "OutcomeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory.name_unique" ON "SubCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_outcomeCategoryId_unique" ON "SubCategory"("outcomeCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Currency.code_unique" ON "Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_userId_unique" ON "Currency"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_payerId_unique" ON "Expense"("payerId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_currencyId_unique" ON "Expense"("currencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_budgetId_unique" ON "Expense"("budgetId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_subCategoryId_unique" ON "Expense"("subCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_outcomeCategoryId_unique" ON "Expense"("outcomeCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "RecurringExpense_payerId_unique" ON "RecurringExpense"("payerId");

-- CreateIndex
CREATE UNIQUE INDEX "RecurringExpense_currencyId_unique" ON "RecurringExpense"("currencyId");

-- CreateIndex
CREATE UNIQUE INDEX "RecurringExpense_budgetId_unique" ON "RecurringExpense"("budgetId");

-- CreateIndex
CREATE UNIQUE INDEX "RecurringExpense_subCategoryId_unique" ON "RecurringExpense"("subCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "RecurringExpense_outcomeCategoryId_unique" ON "RecurringExpense"("outcomeCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Payer.name_unique" ON "Payer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Budget" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeCategory" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutcomeCategory" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD FOREIGN KEY ("outcomeCategoryId") REFERENCES "OutcomeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("payerId") REFERENCES "Payer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("outcomeCategoryId") REFERENCES "OutcomeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringExpense" ADD FOREIGN KEY ("payerId") REFERENCES "Payer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringExpense" ADD FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringExpense" ADD FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringExpense" ADD FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringExpense" ADD FOREIGN KEY ("outcomeCategoryId") REFERENCES "OutcomeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payer" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
