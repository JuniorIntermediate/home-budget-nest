
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  warnEnvConflicts,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal
} = require('./runtime')

const path = require('path')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */

Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val


const dirnamePolyfill = path.join(process.cwd(), "src\\generated-prisma")
const dirname = __dirname.length === 1 ? dirnamePolyfill : __dirname

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
 * DMMF
 */

// We are parsing 2 times, as we want independent objects, because
// DMMFClass introduces circular references in the dmmf object
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */

const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "E:\\Projects\\private-projects\\home-budget-api\\src\\generated-prisma",
      "fromEnvVar": null
    },
    "binaryTargets": [],
    "previewFeatures": [],
    "config": {},
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "..\\..\\.env",
    "schemaEnvPath": "..\\..\\.env"
  },
  "relativePath": "..\\..\\prisma",
  "clientVersion": "2.20.1",
  "engineVersion": "60ba6551f29b17d7d6ce479e5733c70d9c00860e",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql"
}
config.document = dmmf
config.dirname = dirname

/**
 * Only for env conflict warning
 * loading of env variable occurs in getPrismaClient
 */
const envPaths = {
  rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
  schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
}
warnEnvConflicts(envPaths)

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

/**
 * Build tool annotations
 * In order to make `ncc` and `@vercel/nft` happy.
 * The process.cwd() annotation is only needed for https://github.com/vercel/vercel/tree/master/packages/now-next
**/
path.join(__dirname, 'query-engine-windows');
path.join(process.cwd(), './src\generated-prisma\query-engine-windows');

/**
 * Annotation for `@vercel/nft`
 * The process.cwd() annotation is only needed for https://github.com/vercel/vercel/tree/master/packages/now-next
**/
path.join(__dirname, 'schema.prisma');
path.join(process.cwd(), './src\generated-prisma\schema.prisma');