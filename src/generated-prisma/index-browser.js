
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 2.20.1
 * Query Engine version: 60ba6551f29b17d7d6ce479e5733c70d9c00860e
 */
Prisma.prismaVersion = {
  client: "2.20.1",
  engine: "60ba6551f29b17d7d6ce479e5733c70d9c00860e"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */

Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.BudgetScalarFieldEnum = makeEnum({
  id: 'id',
  value: 'value',
  currentValue: 'currentValue',
  name: 'name',
  isDeleted: 'isDeleted',
  type: 'type',
  validMonth: 'validMonth',
  userId: 'userId'
});

exports.Prisma.IncomeCategoryScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  icon: 'icon',
  isDeleted: 'isDeleted',
  userId: 'userId'
});

exports.Prisma.OutcomeCategoryScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  icon: 'icon',
  isDeleted: 'isDeleted',
  userId: 'userId'
});

exports.Prisma.CategoryScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  icon: 'icon',
  isDeleted: 'isDeleted',
  userId: 'userId'
});

exports.Prisma.SubcategoryScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  icon: 'icon',
  isDeleted: 'isDeleted',
  categoryId: 'categoryId'
});

exports.Prisma.CurrencyScalarFieldEnum = makeEnum({
  id: 'id',
  code: 'code',
  exchangeRate: 'exchangeRate',
  isDeleted: 'isDeleted',
  userId: 'userId'
});

exports.Prisma.TransactionScalarFieldEnum = makeEnum({
  id: 'id',
  date: 'date',
  note: 'note',
  amount: 'amount',
  isDeleted: 'isDeleted',
  payerId: 'payerId',
  currencyId: 'currencyId',
  budgetId: 'budgetId',
  categoryId: 'categoryId',
  subcategoryId: 'subcategoryId',
  outcomeCategoryId: 'outcomeCategoryId',
  incomeCategoryId: 'incomeCategoryId'
});

exports.Prisma.RecurringTransactionScalarFieldEnum = makeEnum({
  id: 'id',
  date: 'date',
  note: 'note',
  amount: 'amount',
  dayOfPayment: 'dayOfPayment',
  activationDate: 'activationDate',
  isDeleted: 'isDeleted',
  payerId: 'payerId',
  currencyId: 'currencyId',
  categoryId: 'categoryId',
  subcategoryId: 'subcategoryId',
  outcomeCategoryId: 'outcomeCategoryId',
  incomeCategoryId: 'incomeCategoryId'
});

exports.Prisma.TransactionsOnBudgetsScalarFieldEnum = makeEnum({
  budgetId: 'budgetId',
  transactionId: 'transactionId',
  createdAt: 'createdAt'
});

exports.Prisma.PayerScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  isDeleted: 'isDeleted',
  userId: 'userId'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  passwordSalt: 'passwordSalt',
  firstName: 'firstName',
  lastName: 'lastName',
  verificationToken: 'verificationToken',
  activationStatus: 'activationStatus'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});
exports.BudgetType = makeEnum({
  INCOME: 'INCOME',
  OUTCOME: 'OUTCOME'
});

exports.ActivationStatus = makeEnum({
  DISABLED: 'DISABLED',
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE'
});

exports.Prisma.ModelName = makeEnum({
  Budget: 'Budget',
  IncomeCategory: 'IncomeCategory',
  OutcomeCategory: 'OutcomeCategory',
  Category: 'Category',
  Subcategory: 'Subcategory',
  Currency: 'Currency',
  Transaction: 'Transaction',
  RecurringTransaction: 'RecurringTransaction',
  TransactionsOnBudgets: 'TransactionsOnBudgets',
  Payer: 'Payer',
  User: 'User'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
