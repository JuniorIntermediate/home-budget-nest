
/**
 * Client
**/

import * as runtime from './runtime';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Budget
 */

export type Budget = {
  id: number
  value: Prisma.Decimal
  currentValue: Prisma.Decimal
  name: string
  isDeleted: boolean
  type: BudgetType
  validMonth: Date
  userId: number
}

/**
 * Model IncomeCategory
 */

export type IncomeCategory = {
  id: number
  name: string
  icon: string
  isDeleted: boolean
  userId: number
}

/**
 * Model OutcomeCategory
 */

export type OutcomeCategory = {
  id: number
  name: string
  icon: string
  isDeleted: boolean
  userId: number
}

/**
 * Model Category
 */

export type Category = {
  id: number
  name: string
  icon: string
  isDeleted: boolean
  userId: number
}

/**
 * Model Subcategory
 */

export type Subcategory = {
  id: number
  name: string
  icon: string
  isDeleted: boolean
  categoryId: number
}

/**
 * Model Currency
 */

export type Currency = {
  id: number
  code: string
  exchangeRate: Prisma.Decimal
  isDeleted: boolean
  userId: number
}

/**
 * Model Transaction
 */

export type Transaction = {
  id: number
  date: Date
  note: string
  amount: Prisma.Decimal
  isDeleted: boolean
  payerId: number
  currencyCode: string | null
  exchangeRate: Prisma.Decimal | null
  currencyId: number | null
  budgetId: number
  categoryId: number
  subcategoryId: number | null
  outcomeCategoryId: number | null
  incomeCategoryId: number | null
}

/**
 * Model RecurringTransaction
 */

export type RecurringTransaction = {
  id: number
  date: Date
  note: string
  amount: Prisma.Decimal
  dayOfPayment: Date
  activationDate: Date
  isDeleted: boolean
  payerId: number
  currencyId: number | null
  categoryId: number
  subcategoryId: number | null
  outcomeCategoryId: number | null
  incomeCategoryId: number | null
}

/**
 * Model TransactionsOnBudgets
 */

export type TransactionsOnBudgets = {
  budgetId: number
  transactionId: number
  createdAt: Date
}

/**
 * Model Payer
 */

export type Payer = {
  id: number
  name: string
  isDeleted: boolean
  userId: number
}

/**
 * Model User
 */

export type User = {
  id: number
  email: string
  passwordHash: string
  passwordSalt: string
  firstName: string
  lastName: string
  verificationToken: string | null
  activationStatus: ActivationStatus
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const BudgetType: {
  INCOME: 'INCOME',
  OUTCOME: 'OUTCOME'
};

export type BudgetType = (typeof BudgetType)[keyof typeof BudgetType]


export const ActivationStatus: {
  DISABLED: 'DISABLED',
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE'
};

export type ActivationStatus = (typeof ActivationStatus)[keyof typeof ActivationStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Budgets
 * const budgets = await prisma.budget.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Budgets
   * const budgets = await prisma.budget.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>

      /**
   * `prisma.budget`: Exposes CRUD operations for the **Budget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Budgets
    * const budgets = await prisma.budget.findMany()
    * ```
    */
  get budget(): Prisma.BudgetDelegate<GlobalReject>;

  /**
   * `prisma.incomeCategory`: Exposes CRUD operations for the **IncomeCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IncomeCategories
    * const incomeCategories = await prisma.incomeCategory.findMany()
    * ```
    */
  get incomeCategory(): Prisma.IncomeCategoryDelegate<GlobalReject>;

  /**
   * `prisma.outcomeCategory`: Exposes CRUD operations for the **OutcomeCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutcomeCategories
    * const outcomeCategories = await prisma.outcomeCategory.findMany()
    * ```
    */
  get outcomeCategory(): Prisma.OutcomeCategoryDelegate<GlobalReject>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<GlobalReject>;

  /**
   * `prisma.subcategory`: Exposes CRUD operations for the **Subcategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subcategories
    * const subcategories = await prisma.subcategory.findMany()
    * ```
    */
  get subcategory(): Prisma.SubcategoryDelegate<GlobalReject>;

  /**
   * `prisma.currency`: Exposes CRUD operations for the **Currency** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Currencies
    * const currencies = await prisma.currency.findMany()
    * ```
    */
  get currency(): Prisma.CurrencyDelegate<GlobalReject>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<GlobalReject>;

  /**
   * `prisma.recurringTransaction`: Exposes CRUD operations for the **RecurringTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecurringTransactions
    * const recurringTransactions = await prisma.recurringTransaction.findMany()
    * ```
    */
  get recurringTransaction(): Prisma.RecurringTransactionDelegate<GlobalReject>;

  /**
   * `prisma.transactionsOnBudgets`: Exposes CRUD operations for the **TransactionsOnBudgets** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TransactionsOnBudgets
    * const transactionsOnBudgets = await prisma.transactionsOnBudgets.findMany()
    * ```
    */
  get transactionsOnBudgets(): Prisma.TransactionsOnBudgetsDelegate<GlobalReject>;

  /**
   * `prisma.payer`: Exposes CRUD operations for the **Payer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payers
    * const payers = await prisma.payer.findMany()
    * ```
    */
  get payer(): Prisma.PayerDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 2.20.1
   * Query Engine version: 60ba6551f29b17d7d6ce479e5733c70d9c00860e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
   type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  export type Union = any

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, 'avg' | 'sum' | 'count' | 'min' | 'max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
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
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Budget
   */


  export type AggregateBudget = {
    count: BudgetCountAggregateOutputType | null
    avg: BudgetAvgAggregateOutputType | null
    sum: BudgetSumAggregateOutputType | null
    min: BudgetMinAggregateOutputType | null
    max: BudgetMaxAggregateOutputType | null
  }

  export type BudgetAvgAggregateOutputType = {
    id: number
    value: Decimal
    currentValue: Decimal
    userId: number
  }

  export type BudgetSumAggregateOutputType = {
    id: number
    value: Decimal
    currentValue: Decimal
    userId: number
  }

  export type BudgetMinAggregateOutputType = {
    id: number
    value: Decimal
    currentValue: Decimal
    name: string | null
    isDeleted: boolean | null
    type: BudgetType | null
    validMonth: Date | null
    userId: number
  }

  export type BudgetMaxAggregateOutputType = {
    id: number
    value: Decimal
    currentValue: Decimal
    name: string | null
    isDeleted: boolean | null
    type: BudgetType | null
    validMonth: Date | null
    userId: number
  }

  export type BudgetCountAggregateOutputType = {
    id: number
    value: number
    currentValue: number
    name: number | null
    isDeleted: number | null
    type: number | null
    validMonth: number | null
    userId: number
    _all: number
  }


  export type BudgetAvgAggregateInputType = {
    id?: true
    value?: true
    currentValue?: true
    userId?: true
  }

  export type BudgetSumAggregateInputType = {
    id?: true
    value?: true
    currentValue?: true
    userId?: true
  }

  export type BudgetMinAggregateInputType = {
    id?: true
    value?: true
    currentValue?: true
    name?: true
    isDeleted?: true
    type?: true
    validMonth?: true
    userId?: true
  }

  export type BudgetMaxAggregateInputType = {
    id?: true
    value?: true
    currentValue?: true
    name?: true
    isDeleted?: true
    type?: true
    validMonth?: true
    userId?: true
  }

  export type BudgetCountAggregateInputType = {
    id?: true
    value?: true
    currentValue?: true
    name?: true
    isDeleted?: true
    type?: true
    validMonth?: true
    userId?: true
    _all?: true
  }

  export type BudgetAggregateArgs = {
    /**
     * Filter which Budget to aggregate.
    **/
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
    **/
    orderBy?: Enumerable<BudgetOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Budgets
    **/
    count?: true | BudgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: BudgetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: BudgetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: BudgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: BudgetMaxAggregateInputType
  }

  export type GetBudgetAggregateType<T extends BudgetAggregateArgs> = {
    [P in keyof T & keyof AggregateBudget]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudget[P]>
      : GetScalarType<T[P], AggregateBudget[P]>
  }


    
    
  export type BudgetGroupByArgs = {
    where?: BudgetWhereInput
    orderBy?: Enumerable<BudgetOrderByInput>
    by: Array<BudgetScalarFieldEnum>
    having?: BudgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: BudgetCountAggregateInputType | true
    avg?: BudgetAvgAggregateInputType
    sum?: BudgetSumAggregateInputType
    min?: BudgetMinAggregateInputType
    max?: BudgetMaxAggregateInputType
  }


  export type BudgetGroupByOutputType = {
    id: number
    value: Decimal
    currentValue: Decimal
    name: string
    isDeleted: boolean
    type: BudgetType
    validMonth: Date
    userId: number
    count: BudgetCountAggregateOutputType | null
    avg: BudgetAvgAggregateOutputType | null
    sum: BudgetSumAggregateOutputType | null
    min: BudgetMinAggregateOutputType | null
    max: BudgetMaxAggregateOutputType | null
  }

  type GetBudgetGroupByPayload<T extends BudgetGroupByArgs> = Promise<Array<
    PickArray<BudgetGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof BudgetGroupByOutputType))]: GetScalarType<T[P], BudgetGroupByOutputType[P]>
    }
  >>
    

  export type BudgetSelect = {
    id?: boolean
    value?: boolean
    currentValue?: boolean
    name?: boolean
    isDeleted?: boolean
    type?: boolean
    validMonth?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    transactions?: boolean | TransactionFindManyArgs
    recurringTransactions?: boolean | TransactionsOnBudgetsFindManyArgs
  }

  export type BudgetInclude = {
    user?: boolean | UserArgs
    transactions?: boolean | TransactionFindManyArgs
    recurringTransactions?: boolean | TransactionsOnBudgetsFindManyArgs
  }

  export type BudgetGetPayload<
    S extends boolean | null | undefined | BudgetArgs,
    U = keyof S
      > = S extends true
        ? Budget
    : S extends undefined
    ? never
    : S extends BudgetArgs | BudgetFindManyArgs
    ?'include' extends U
    ? Budget  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['include'][P]>>  :
        P extends 'recurringTransactions'
        ? Array < TransactionsOnBudgetsGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Budget ?Budget [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['select'][P]>>  :
        P extends 'recurringTransactions'
        ? Array < TransactionsOnBudgetsGetPayload<S['select'][P]>>  : never
  } 
    : Budget
  : Budget


  type BudgetCountArgs = Merge<
    Omit<BudgetFindManyArgs, 'select' | 'include'> & {
      select?: BudgetCountAggregateInputType | true
    }
  >

  export interface BudgetDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Budget that matches the filter.
     * @param {BudgetFindUniqueArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BudgetFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BudgetFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Budget'> extends True ? CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>> : CheckSelect<T, Prisma__BudgetClient<Budget | null >, Prisma__BudgetClient<BudgetGetPayload<T> | null >>

    /**
     * Find the first Budget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BudgetFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BudgetFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Budget'> extends True ? CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>> : CheckSelect<T, Prisma__BudgetClient<Budget | null >, Prisma__BudgetClient<BudgetGetPayload<T> | null >>

    /**
     * Find zero or more Budgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Budgets
     * const budgets = await prisma.budget.findMany()
     * 
     * // Get first 10 Budgets
     * const budgets = await prisma.budget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetWithIdOnly = await prisma.budget.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BudgetFindManyArgs>(
      args?: SelectSubset<T, BudgetFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Budget>>, PrismaPromise<Array<BudgetGetPayload<T>>>>

    /**
     * Create a Budget.
     * @param {BudgetCreateArgs} args - Arguments to create a Budget.
     * @example
     * // Create one Budget
     * const Budget = await prisma.budget.create({
     *   data: {
     *     // ... data to create a Budget
     *   }
     * })
     * 
    **/
    create<T extends BudgetCreateArgs>(
      args: SelectSubset<T, BudgetCreateArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Create many Budgets.
     *     @param {BudgetCreateManyArgs} args - Arguments to create many Budgets.
     *     @example
     *     // Create many Budgets
     *     const budget = await prisma.budget.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BudgetCreateManyArgs>(
      args?: SelectSubset<T, BudgetCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Budget.
     * @param {BudgetDeleteArgs} args - Arguments to delete one Budget.
     * @example
     * // Delete one Budget
     * const Budget = await prisma.budget.delete({
     *   where: {
     *     // ... filter to delete one Budget
     *   }
     * })
     * 
    **/
    delete<T extends BudgetDeleteArgs>(
      args: SelectSubset<T, BudgetDeleteArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Update one Budget.
     * @param {BudgetUpdateArgs} args - Arguments to update one Budget.
     * @example
     * // Update one Budget
     * const budget = await prisma.budget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BudgetUpdateArgs>(
      args: SelectSubset<T, BudgetUpdateArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Delete zero or more Budgets.
     * @param {BudgetDeleteManyArgs} args - Arguments to filter Budgets to delete.
     * @example
     * // Delete a few Budgets
     * const { count } = await prisma.budget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BudgetDeleteManyArgs>(
      args?: SelectSubset<T, BudgetDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BudgetUpdateManyArgs>(
      args: SelectSubset<T, BudgetUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Budget.
     * @param {BudgetUpsertArgs} args - Arguments to update or create a Budget.
     * @example
     * // Update or create a Budget
     * const budget = await prisma.budget.upsert({
     *   create: {
     *     // ... data to create a Budget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Budget we want to update
     *   }
     * })
    **/
    upsert<T extends BudgetUpsertArgs>(
      args: SelectSubset<T, BudgetUpsertArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Count the number of Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCountArgs} args - Arguments to filter Budgets to count.
     * @example
     * // Count the number of Budgets
     * const count = await prisma.budget.count({
     *   where: {
     *     // ... the filter for the Budgets we want to count
     *   }
     * })
    **/
    count<T extends BudgetCountArgs>(
      args?: Subset<T, BudgetCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BudgetAggregateArgs>(args: Subset<T, BudgetAggregateArgs>): PrismaPromise<GetBudgetAggregateType<T>>

    /**
     * Group by Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetGroupByArgs['orderBy'] }
        : { orderBy?: BudgetGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BudgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Budget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BudgetClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    transactions<T extends TransactionFindManyArgs = {}>(args?: Subset<T, TransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Transaction>>, PrismaPromise<Array<TransactionGetPayload<T>>>>;

    recurringTransactions<T extends TransactionsOnBudgetsFindManyArgs = {}>(args?: Subset<T, TransactionsOnBudgetsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<TransactionsOnBudgets>>, PrismaPromise<Array<TransactionsOnBudgetsGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Budget findUnique
   */
  export type BudgetFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Budget
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: BudgetInclude | null
    /**
     * Throw an Error if a Budget can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Budget to fetch.
    **/
    where: BudgetWhereUniqueInput
  }


  /**
   * Budget findFirst
   */
  export type BudgetFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Budget
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: BudgetInclude | null
    /**
     * Throw an Error if a Budget can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Budget to fetch.
    **/
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
    **/
    orderBy?: Enumerable<BudgetOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
    **/
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
    **/
    distinct?: Enumerable<BudgetScalarFieldEnum>
  }


  /**
   * Budget findMany
   */
  export type BudgetFindManyArgs = {
    /**
     * Select specific fields to fetch from the Budget
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: BudgetInclude | null
    /**
     * Filter, which Budgets to fetch.
    **/
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
    **/
    orderBy?: Enumerable<BudgetOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Budgets.
    **/
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
    **/
    skip?: number
    distinct?: Enumerable<BudgetScalarFieldEnum>
  }


  /**
   * Budget create
   */
  export type BudgetCreateArgs = {
    /**
     * Select specific fields to fetch from the Budget
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: BudgetInclude | null
    /**
     * The data needed to create a Budget.
    **/
    data: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
  }


  /**
   * Budget createMany
   */
  export type BudgetCreateManyArgs = {
    data: Enumerable<BudgetCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Budget update
   */
  export type BudgetUpdateArgs = {
    /**
     * Select specific fields to fetch from the Budget
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: BudgetInclude | null
    /**
     * The data needed to update a Budget.
    **/
    data: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
    /**
     * Choose, which Budget to update.
    **/
    where: BudgetWhereUniqueInput
  }


  /**
   * Budget updateMany
   */
  export type BudgetUpdateManyArgs = {
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>
    where?: BudgetWhereInput
  }


  /**
   * Budget upsert
   */
  export type BudgetUpsertArgs = {
    /**
     * Select specific fields to fetch from the Budget
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: BudgetInclude | null
    /**
     * The filter to search for the Budget to update in case it exists.
    **/
    where: BudgetWhereUniqueInput
    /**
     * In case the Budget found by the `where` argument doesn't exist, create a new Budget with this data.
    **/
    create: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
    /**
     * In case the Budget was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
  }


  /**
   * Budget delete
   */
  export type BudgetDeleteArgs = {
    /**
     * Select specific fields to fetch from the Budget
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: BudgetInclude | null
    /**
     * Filter which Budget to delete.
    **/
    where: BudgetWhereUniqueInput
  }


  /**
   * Budget deleteMany
   */
  export type BudgetDeleteManyArgs = {
    where?: BudgetWhereInput
  }


  /**
   * Budget without action
   */
  export type BudgetArgs = {
    /**
     * Select specific fields to fetch from the Budget
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: BudgetInclude | null
  }



  /**
   * Model IncomeCategory
   */


  export type AggregateIncomeCategory = {
    count: IncomeCategoryCountAggregateOutputType | null
    avg: IncomeCategoryAvgAggregateOutputType | null
    sum: IncomeCategorySumAggregateOutputType | null
    min: IncomeCategoryMinAggregateOutputType | null
    max: IncomeCategoryMaxAggregateOutputType | null
  }

  export type IncomeCategoryAvgAggregateOutputType = {
    id: number
    userId: number
  }

  export type IncomeCategorySumAggregateOutputType = {
    id: number
    userId: number
  }

  export type IncomeCategoryMinAggregateOutputType = {
    id: number
    name: string | null
    icon: string | null
    isDeleted: boolean | null
    userId: number
  }

  export type IncomeCategoryMaxAggregateOutputType = {
    id: number
    name: string | null
    icon: string | null
    isDeleted: boolean | null
    userId: number
  }

  export type IncomeCategoryCountAggregateOutputType = {
    id: number
    name: number | null
    icon: number | null
    isDeleted: number | null
    userId: number
    _all: number
  }


  export type IncomeCategoryAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type IncomeCategorySumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type IncomeCategoryMinAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    userId?: true
  }

  export type IncomeCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    userId?: true
  }

  export type IncomeCategoryCountAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    userId?: true
    _all?: true
  }

  export type IncomeCategoryAggregateArgs = {
    /**
     * Filter which IncomeCategory to aggregate.
    **/
    where?: IncomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeCategories to fetch.
    **/
    orderBy?: Enumerable<IncomeCategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: IncomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeCategories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeCategories.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IncomeCategories
    **/
    count?: true | IncomeCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: IncomeCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: IncomeCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: IncomeCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: IncomeCategoryMaxAggregateInputType
  }

  export type GetIncomeCategoryAggregateType<T extends IncomeCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateIncomeCategory]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIncomeCategory[P]>
      : GetScalarType<T[P], AggregateIncomeCategory[P]>
  }


    
    
  export type IncomeCategoryGroupByArgs = {
    where?: IncomeCategoryWhereInput
    orderBy?: Enumerable<IncomeCategoryOrderByInput>
    by: Array<IncomeCategoryScalarFieldEnum>
    having?: IncomeCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: IncomeCategoryCountAggregateInputType | true
    avg?: IncomeCategoryAvgAggregateInputType
    sum?: IncomeCategorySumAggregateInputType
    min?: IncomeCategoryMinAggregateInputType
    max?: IncomeCategoryMaxAggregateInputType
  }


  export type IncomeCategoryGroupByOutputType = {
    id: number
    name: string
    icon: string
    isDeleted: boolean
    userId: number
    count: IncomeCategoryCountAggregateOutputType | null
    avg: IncomeCategoryAvgAggregateOutputType | null
    sum: IncomeCategorySumAggregateOutputType | null
    min: IncomeCategoryMinAggregateOutputType | null
    max: IncomeCategoryMaxAggregateOutputType | null
  }

  type GetIncomeCategoryGroupByPayload<T extends IncomeCategoryGroupByArgs> = Promise<Array<
    PickArray<IncomeCategoryGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof IncomeCategoryGroupByOutputType))]: GetScalarType<T[P], IncomeCategoryGroupByOutputType[P]>
    }
  >>
    

  export type IncomeCategorySelect = {
    id?: boolean
    name?: boolean
    icon?: boolean
    isDeleted?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    transactions?: boolean | TransactionFindManyArgs
    recurringTransaction?: boolean | RecurringTransactionFindManyArgs
  }

  export type IncomeCategoryInclude = {
    user?: boolean | UserArgs
    transactions?: boolean | TransactionFindManyArgs
    recurringTransaction?: boolean | RecurringTransactionFindManyArgs
  }

  export type IncomeCategoryGetPayload<
    S extends boolean | null | undefined | IncomeCategoryArgs,
    U = keyof S
      > = S extends true
        ? IncomeCategory
    : S extends undefined
    ? never
    : S extends IncomeCategoryArgs | IncomeCategoryFindManyArgs
    ?'include' extends U
    ? IncomeCategory  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['include'][P]>>  :
        P extends 'recurringTransaction'
        ? Array < RecurringTransactionGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof IncomeCategory ?IncomeCategory [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['select'][P]>>  :
        P extends 'recurringTransaction'
        ? Array < RecurringTransactionGetPayload<S['select'][P]>>  : never
  } 
    : IncomeCategory
  : IncomeCategory


  type IncomeCategoryCountArgs = Merge<
    Omit<IncomeCategoryFindManyArgs, 'select' | 'include'> & {
      select?: IncomeCategoryCountAggregateInputType | true
    }
  >

  export interface IncomeCategoryDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one IncomeCategory that matches the filter.
     * @param {IncomeCategoryFindUniqueArgs} args - Arguments to find a IncomeCategory
     * @example
     * // Get one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends IncomeCategoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, IncomeCategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'IncomeCategory'> extends True ? CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>> : CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory | null >, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T> | null >>

    /**
     * Find the first IncomeCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryFindFirstArgs} args - Arguments to find a IncomeCategory
     * @example
     * // Get one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends IncomeCategoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, IncomeCategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'IncomeCategory'> extends True ? CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>> : CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory | null >, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T> | null >>

    /**
     * Find zero or more IncomeCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IncomeCategories
     * const incomeCategories = await prisma.incomeCategory.findMany()
     * 
     * // Get first 10 IncomeCategories
     * const incomeCategories = await prisma.incomeCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const incomeCategoryWithIdOnly = await prisma.incomeCategory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends IncomeCategoryFindManyArgs>(
      args?: SelectSubset<T, IncomeCategoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<IncomeCategory>>, PrismaPromise<Array<IncomeCategoryGetPayload<T>>>>

    /**
     * Create a IncomeCategory.
     * @param {IncomeCategoryCreateArgs} args - Arguments to create a IncomeCategory.
     * @example
     * // Create one IncomeCategory
     * const IncomeCategory = await prisma.incomeCategory.create({
     *   data: {
     *     // ... data to create a IncomeCategory
     *   }
     * })
     * 
    **/
    create<T extends IncomeCategoryCreateArgs>(
      args: SelectSubset<T, IncomeCategoryCreateArgs>
    ): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>>

    /**
     * Create many IncomeCategories.
     *     @param {IncomeCategoryCreateManyArgs} args - Arguments to create many IncomeCategories.
     *     @example
     *     // Create many IncomeCategories
     *     const incomeCategory = await prisma.incomeCategory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends IncomeCategoryCreateManyArgs>(
      args?: SelectSubset<T, IncomeCategoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a IncomeCategory.
     * @param {IncomeCategoryDeleteArgs} args - Arguments to delete one IncomeCategory.
     * @example
     * // Delete one IncomeCategory
     * const IncomeCategory = await prisma.incomeCategory.delete({
     *   where: {
     *     // ... filter to delete one IncomeCategory
     *   }
     * })
     * 
    **/
    delete<T extends IncomeCategoryDeleteArgs>(
      args: SelectSubset<T, IncomeCategoryDeleteArgs>
    ): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>>

    /**
     * Update one IncomeCategory.
     * @param {IncomeCategoryUpdateArgs} args - Arguments to update one IncomeCategory.
     * @example
     * // Update one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends IncomeCategoryUpdateArgs>(
      args: SelectSubset<T, IncomeCategoryUpdateArgs>
    ): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>>

    /**
     * Delete zero or more IncomeCategories.
     * @param {IncomeCategoryDeleteManyArgs} args - Arguments to filter IncomeCategories to delete.
     * @example
     * // Delete a few IncomeCategories
     * const { count } = await prisma.incomeCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends IncomeCategoryDeleteManyArgs>(
      args?: SelectSubset<T, IncomeCategoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more IncomeCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IncomeCategories
     * const incomeCategory = await prisma.incomeCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends IncomeCategoryUpdateManyArgs>(
      args: SelectSubset<T, IncomeCategoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one IncomeCategory.
     * @param {IncomeCategoryUpsertArgs} args - Arguments to update or create a IncomeCategory.
     * @example
     * // Update or create a IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.upsert({
     *   create: {
     *     // ... data to create a IncomeCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IncomeCategory we want to update
     *   }
     * })
    **/
    upsert<T extends IncomeCategoryUpsertArgs>(
      args: SelectSubset<T, IncomeCategoryUpsertArgs>
    ): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>>

    /**
     * Count the number of IncomeCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryCountArgs} args - Arguments to filter IncomeCategories to count.
     * @example
     * // Count the number of IncomeCategories
     * const count = await prisma.incomeCategory.count({
     *   where: {
     *     // ... the filter for the IncomeCategories we want to count
     *   }
     * })
    **/
    count<T extends IncomeCategoryCountArgs>(
      args?: Subset<T, IncomeCategoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IncomeCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IncomeCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IncomeCategoryAggregateArgs>(args: Subset<T, IncomeCategoryAggregateArgs>): PrismaPromise<GetIncomeCategoryAggregateType<T>>

    /**
     * Group by IncomeCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IncomeCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IncomeCategoryGroupByArgs['orderBy'] }
        : { orderBy?: IncomeCategoryGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IncomeCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncomeCategoryGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for IncomeCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__IncomeCategoryClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    transactions<T extends TransactionFindManyArgs = {}>(args?: Subset<T, TransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Transaction>>, PrismaPromise<Array<TransactionGetPayload<T>>>>;

    recurringTransaction<T extends RecurringTransactionFindManyArgs = {}>(args?: Subset<T, RecurringTransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<RecurringTransaction>>, PrismaPromise<Array<RecurringTransactionGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * IncomeCategory findUnique
   */
  export type IncomeCategoryFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: IncomeCategoryInclude | null
    /**
     * Throw an Error if a IncomeCategory can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which IncomeCategory to fetch.
    **/
    where: IncomeCategoryWhereUniqueInput
  }


  /**
   * IncomeCategory findFirst
   */
  export type IncomeCategoryFindFirstArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: IncomeCategoryInclude | null
    /**
     * Throw an Error if a IncomeCategory can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which IncomeCategory to fetch.
    **/
    where?: IncomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeCategories to fetch.
    **/
    orderBy?: Enumerable<IncomeCategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IncomeCategories.
    **/
    cursor?: IncomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeCategories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeCategories.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IncomeCategories.
    **/
    distinct?: Enumerable<IncomeCategoryScalarFieldEnum>
  }


  /**
   * IncomeCategory findMany
   */
  export type IncomeCategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: IncomeCategoryInclude | null
    /**
     * Filter, which IncomeCategories to fetch.
    **/
    where?: IncomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeCategories to fetch.
    **/
    orderBy?: Enumerable<IncomeCategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IncomeCategories.
    **/
    cursor?: IncomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeCategories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeCategories.
    **/
    skip?: number
    distinct?: Enumerable<IncomeCategoryScalarFieldEnum>
  }


  /**
   * IncomeCategory create
   */
  export type IncomeCategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: IncomeCategoryInclude | null
    /**
     * The data needed to create a IncomeCategory.
    **/
    data: XOR<IncomeCategoryCreateInput, IncomeCategoryUncheckedCreateInput>
  }


  /**
   * IncomeCategory createMany
   */
  export type IncomeCategoryCreateManyArgs = {
    data: Enumerable<IncomeCategoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * IncomeCategory update
   */
  export type IncomeCategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: IncomeCategoryInclude | null
    /**
     * The data needed to update a IncomeCategory.
    **/
    data: XOR<IncomeCategoryUpdateInput, IncomeCategoryUncheckedUpdateInput>
    /**
     * Choose, which IncomeCategory to update.
    **/
    where: IncomeCategoryWhereUniqueInput
  }


  /**
   * IncomeCategory updateMany
   */
  export type IncomeCategoryUpdateManyArgs = {
    data: XOR<IncomeCategoryUpdateManyMutationInput, IncomeCategoryUncheckedUpdateManyInput>
    where?: IncomeCategoryWhereInput
  }


  /**
   * IncomeCategory upsert
   */
  export type IncomeCategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: IncomeCategoryInclude | null
    /**
     * The filter to search for the IncomeCategory to update in case it exists.
    **/
    where: IncomeCategoryWhereUniqueInput
    /**
     * In case the IncomeCategory found by the `where` argument doesn't exist, create a new IncomeCategory with this data.
    **/
    create: XOR<IncomeCategoryCreateInput, IncomeCategoryUncheckedCreateInput>
    /**
     * In case the IncomeCategory was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<IncomeCategoryUpdateInput, IncomeCategoryUncheckedUpdateInput>
  }


  /**
   * IncomeCategory delete
   */
  export type IncomeCategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: IncomeCategoryInclude | null
    /**
     * Filter which IncomeCategory to delete.
    **/
    where: IncomeCategoryWhereUniqueInput
  }


  /**
   * IncomeCategory deleteMany
   */
  export type IncomeCategoryDeleteManyArgs = {
    where?: IncomeCategoryWhereInput
  }


  /**
   * IncomeCategory without action
   */
  export type IncomeCategoryArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: IncomeCategoryInclude | null
  }



  /**
   * Model OutcomeCategory
   */


  export type AggregateOutcomeCategory = {
    count: OutcomeCategoryCountAggregateOutputType | null
    avg: OutcomeCategoryAvgAggregateOutputType | null
    sum: OutcomeCategorySumAggregateOutputType | null
    min: OutcomeCategoryMinAggregateOutputType | null
    max: OutcomeCategoryMaxAggregateOutputType | null
  }

  export type OutcomeCategoryAvgAggregateOutputType = {
    id: number
    userId: number
  }

  export type OutcomeCategorySumAggregateOutputType = {
    id: number
    userId: number
  }

  export type OutcomeCategoryMinAggregateOutputType = {
    id: number
    name: string | null
    icon: string | null
    isDeleted: boolean | null
    userId: number
  }

  export type OutcomeCategoryMaxAggregateOutputType = {
    id: number
    name: string | null
    icon: string | null
    isDeleted: boolean | null
    userId: number
  }

  export type OutcomeCategoryCountAggregateOutputType = {
    id: number
    name: number | null
    icon: number | null
    isDeleted: number | null
    userId: number
    _all: number
  }


  export type OutcomeCategoryAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type OutcomeCategorySumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type OutcomeCategoryMinAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    userId?: true
  }

  export type OutcomeCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    userId?: true
  }

  export type OutcomeCategoryCountAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    userId?: true
    _all?: true
  }

  export type OutcomeCategoryAggregateArgs = {
    /**
     * Filter which OutcomeCategory to aggregate.
    **/
    where?: OutcomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutcomeCategories to fetch.
    **/
    orderBy?: Enumerable<OutcomeCategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: OutcomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutcomeCategories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutcomeCategories.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OutcomeCategories
    **/
    count?: true | OutcomeCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: OutcomeCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: OutcomeCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: OutcomeCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: OutcomeCategoryMaxAggregateInputType
  }

  export type GetOutcomeCategoryAggregateType<T extends OutcomeCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateOutcomeCategory]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutcomeCategory[P]>
      : GetScalarType<T[P], AggregateOutcomeCategory[P]>
  }


    
    
  export type OutcomeCategoryGroupByArgs = {
    where?: OutcomeCategoryWhereInput
    orderBy?: Enumerable<OutcomeCategoryOrderByInput>
    by: Array<OutcomeCategoryScalarFieldEnum>
    having?: OutcomeCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: OutcomeCategoryCountAggregateInputType | true
    avg?: OutcomeCategoryAvgAggregateInputType
    sum?: OutcomeCategorySumAggregateInputType
    min?: OutcomeCategoryMinAggregateInputType
    max?: OutcomeCategoryMaxAggregateInputType
  }


  export type OutcomeCategoryGroupByOutputType = {
    id: number
    name: string
    icon: string
    isDeleted: boolean
    userId: number
    count: OutcomeCategoryCountAggregateOutputType | null
    avg: OutcomeCategoryAvgAggregateOutputType | null
    sum: OutcomeCategorySumAggregateOutputType | null
    min: OutcomeCategoryMinAggregateOutputType | null
    max: OutcomeCategoryMaxAggregateOutputType | null
  }

  type GetOutcomeCategoryGroupByPayload<T extends OutcomeCategoryGroupByArgs> = Promise<Array<
    PickArray<OutcomeCategoryGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof OutcomeCategoryGroupByOutputType))]: GetScalarType<T[P], OutcomeCategoryGroupByOutputType[P]>
    }
  >>
    

  export type OutcomeCategorySelect = {
    id?: boolean
    name?: boolean
    icon?: boolean
    isDeleted?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    transactions?: boolean | TransactionFindManyArgs
    recurringTransaction?: boolean | RecurringTransactionFindManyArgs
  }

  export type OutcomeCategoryInclude = {
    user?: boolean | UserArgs
    transactions?: boolean | TransactionFindManyArgs
    recurringTransaction?: boolean | RecurringTransactionFindManyArgs
  }

  export type OutcomeCategoryGetPayload<
    S extends boolean | null | undefined | OutcomeCategoryArgs,
    U = keyof S
      > = S extends true
        ? OutcomeCategory
    : S extends undefined
    ? never
    : S extends OutcomeCategoryArgs | OutcomeCategoryFindManyArgs
    ?'include' extends U
    ? OutcomeCategory  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['include'][P]>>  :
        P extends 'recurringTransaction'
        ? Array < RecurringTransactionGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof OutcomeCategory ?OutcomeCategory [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['select'][P]>>  :
        P extends 'recurringTransaction'
        ? Array < RecurringTransactionGetPayload<S['select'][P]>>  : never
  } 
    : OutcomeCategory
  : OutcomeCategory


  type OutcomeCategoryCountArgs = Merge<
    Omit<OutcomeCategoryFindManyArgs, 'select' | 'include'> & {
      select?: OutcomeCategoryCountAggregateInputType | true
    }
  >

  export interface OutcomeCategoryDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one OutcomeCategory that matches the filter.
     * @param {OutcomeCategoryFindUniqueArgs} args - Arguments to find a OutcomeCategory
     * @example
     * // Get one OutcomeCategory
     * const outcomeCategory = await prisma.outcomeCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OutcomeCategoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, OutcomeCategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'OutcomeCategory'> extends True ? CheckSelect<T, Prisma__OutcomeCategoryClient<OutcomeCategory>, Prisma__OutcomeCategoryClient<OutcomeCategoryGetPayload<T>>> : CheckSelect<T, Prisma__OutcomeCategoryClient<OutcomeCategory | null >, Prisma__OutcomeCategoryClient<OutcomeCategoryGetPayload<T> | null >>

    /**
     * Find the first OutcomeCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeCategoryFindFirstArgs} args - Arguments to find a OutcomeCategory
     * @example
     * // Get one OutcomeCategory
     * const outcomeCategory = await prisma.outcomeCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OutcomeCategoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, OutcomeCategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'OutcomeCategory'> extends True ? CheckSelect<T, Prisma__OutcomeCategoryClient<OutcomeCategory>, Prisma__OutcomeCategoryClient<OutcomeCategoryGetPayload<T>>> : CheckSelect<T, Prisma__OutcomeCategoryClient<OutcomeCategory | null >, Prisma__OutcomeCategoryClient<OutcomeCategoryGetPayload<T> | null >>

    /**
     * Find zero or more OutcomeCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeCategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutcomeCategories
     * const outcomeCategories = await prisma.outcomeCategory.findMany()
     * 
     * // Get first 10 OutcomeCategories
     * const outcomeCategories = await prisma.outcomeCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outcomeCategoryWithIdOnly = await prisma.outcomeCategory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends OutcomeCategoryFindManyArgs>(
      args?: SelectSubset<T, OutcomeCategoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<OutcomeCategory>>, PrismaPromise<Array<OutcomeCategoryGetPayload<T>>>>

    /**
     * Create a OutcomeCategory.
     * @param {OutcomeCategoryCreateArgs} args - Arguments to create a OutcomeCategory.
     * @example
     * // Create one OutcomeCategory
     * const OutcomeCategory = await prisma.outcomeCategory.create({
     *   data: {
     *     // ... data to create a OutcomeCategory
     *   }
     * })
     * 
    **/
    create<T extends OutcomeCategoryCreateArgs>(
      args: SelectSubset<T, OutcomeCategoryCreateArgs>
    ): CheckSelect<T, Prisma__OutcomeCategoryClient<OutcomeCategory>, Prisma__OutcomeCategoryClient<OutcomeCategoryGetPayload<T>>>

    /**
     * Create many OutcomeCategories.
     *     @param {OutcomeCategoryCreateManyArgs} args - Arguments to create many OutcomeCategories.
     *     @example
     *     // Create many OutcomeCategories
     *     const outcomeCategory = await prisma.outcomeCategory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends OutcomeCategoryCreateManyArgs>(
      args?: SelectSubset<T, OutcomeCategoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a OutcomeCategory.
     * @param {OutcomeCategoryDeleteArgs} args - Arguments to delete one OutcomeCategory.
     * @example
     * // Delete one OutcomeCategory
     * const OutcomeCategory = await prisma.outcomeCategory.delete({
     *   where: {
     *     // ... filter to delete one OutcomeCategory
     *   }
     * })
     * 
    **/
    delete<T extends OutcomeCategoryDeleteArgs>(
      args: SelectSubset<T, OutcomeCategoryDeleteArgs>
    ): CheckSelect<T, Prisma__OutcomeCategoryClient<OutcomeCategory>, Prisma__OutcomeCategoryClient<OutcomeCategoryGetPayload<T>>>

    /**
     * Update one OutcomeCategory.
     * @param {OutcomeCategoryUpdateArgs} args - Arguments to update one OutcomeCategory.
     * @example
     * // Update one OutcomeCategory
     * const outcomeCategory = await prisma.outcomeCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OutcomeCategoryUpdateArgs>(
      args: SelectSubset<T, OutcomeCategoryUpdateArgs>
    ): CheckSelect<T, Prisma__OutcomeCategoryClient<OutcomeCategory>, Prisma__OutcomeCategoryClient<OutcomeCategoryGetPayload<T>>>

    /**
     * Delete zero or more OutcomeCategories.
     * @param {OutcomeCategoryDeleteManyArgs} args - Arguments to filter OutcomeCategories to delete.
     * @example
     * // Delete a few OutcomeCategories
     * const { count } = await prisma.outcomeCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OutcomeCategoryDeleteManyArgs>(
      args?: SelectSubset<T, OutcomeCategoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutcomeCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutcomeCategories
     * const outcomeCategory = await prisma.outcomeCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OutcomeCategoryUpdateManyArgs>(
      args: SelectSubset<T, OutcomeCategoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one OutcomeCategory.
     * @param {OutcomeCategoryUpsertArgs} args - Arguments to update or create a OutcomeCategory.
     * @example
     * // Update or create a OutcomeCategory
     * const outcomeCategory = await prisma.outcomeCategory.upsert({
     *   create: {
     *     // ... data to create a OutcomeCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutcomeCategory we want to update
     *   }
     * })
    **/
    upsert<T extends OutcomeCategoryUpsertArgs>(
      args: SelectSubset<T, OutcomeCategoryUpsertArgs>
    ): CheckSelect<T, Prisma__OutcomeCategoryClient<OutcomeCategory>, Prisma__OutcomeCategoryClient<OutcomeCategoryGetPayload<T>>>

    /**
     * Count the number of OutcomeCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeCategoryCountArgs} args - Arguments to filter OutcomeCategories to count.
     * @example
     * // Count the number of OutcomeCategories
     * const count = await prisma.outcomeCategory.count({
     *   where: {
     *     // ... the filter for the OutcomeCategories we want to count
     *   }
     * })
    **/
    count<T extends OutcomeCategoryCountArgs>(
      args?: Subset<T, OutcomeCategoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutcomeCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OutcomeCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutcomeCategoryAggregateArgs>(args: Subset<T, OutcomeCategoryAggregateArgs>): PrismaPromise<GetOutcomeCategoryAggregateType<T>>

    /**
     * Group by OutcomeCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutcomeCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutcomeCategoryGroupByArgs['orderBy'] }
        : { orderBy?: OutcomeCategoryGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutcomeCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutcomeCategoryGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutcomeCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__OutcomeCategoryClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    transactions<T extends TransactionFindManyArgs = {}>(args?: Subset<T, TransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Transaction>>, PrismaPromise<Array<TransactionGetPayload<T>>>>;

    recurringTransaction<T extends RecurringTransactionFindManyArgs = {}>(args?: Subset<T, RecurringTransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<RecurringTransaction>>, PrismaPromise<Array<RecurringTransactionGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * OutcomeCategory findUnique
   */
  export type OutcomeCategoryFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the OutcomeCategory
    **/
    select?: OutcomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: OutcomeCategoryInclude | null
    /**
     * Throw an Error if a OutcomeCategory can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which OutcomeCategory to fetch.
    **/
    where: OutcomeCategoryWhereUniqueInput
  }


  /**
   * OutcomeCategory findFirst
   */
  export type OutcomeCategoryFindFirstArgs = {
    /**
     * Select specific fields to fetch from the OutcomeCategory
    **/
    select?: OutcomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: OutcomeCategoryInclude | null
    /**
     * Throw an Error if a OutcomeCategory can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which OutcomeCategory to fetch.
    **/
    where?: OutcomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutcomeCategories to fetch.
    **/
    orderBy?: Enumerable<OutcomeCategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutcomeCategories.
    **/
    cursor?: OutcomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutcomeCategories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutcomeCategories.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutcomeCategories.
    **/
    distinct?: Enumerable<OutcomeCategoryScalarFieldEnum>
  }


  /**
   * OutcomeCategory findMany
   */
  export type OutcomeCategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the OutcomeCategory
    **/
    select?: OutcomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: OutcomeCategoryInclude | null
    /**
     * Filter, which OutcomeCategories to fetch.
    **/
    where?: OutcomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutcomeCategories to fetch.
    **/
    orderBy?: Enumerable<OutcomeCategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OutcomeCategories.
    **/
    cursor?: OutcomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutcomeCategories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutcomeCategories.
    **/
    skip?: number
    distinct?: Enumerable<OutcomeCategoryScalarFieldEnum>
  }


  /**
   * OutcomeCategory create
   */
  export type OutcomeCategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the OutcomeCategory
    **/
    select?: OutcomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: OutcomeCategoryInclude | null
    /**
     * The data needed to create a OutcomeCategory.
    **/
    data: XOR<OutcomeCategoryCreateInput, OutcomeCategoryUncheckedCreateInput>
  }


  /**
   * OutcomeCategory createMany
   */
  export type OutcomeCategoryCreateManyArgs = {
    data: Enumerable<OutcomeCategoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * OutcomeCategory update
   */
  export type OutcomeCategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the OutcomeCategory
    **/
    select?: OutcomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: OutcomeCategoryInclude | null
    /**
     * The data needed to update a OutcomeCategory.
    **/
    data: XOR<OutcomeCategoryUpdateInput, OutcomeCategoryUncheckedUpdateInput>
    /**
     * Choose, which OutcomeCategory to update.
    **/
    where: OutcomeCategoryWhereUniqueInput
  }


  /**
   * OutcomeCategory updateMany
   */
  export type OutcomeCategoryUpdateManyArgs = {
    data: XOR<OutcomeCategoryUpdateManyMutationInput, OutcomeCategoryUncheckedUpdateManyInput>
    where?: OutcomeCategoryWhereInput
  }


  /**
   * OutcomeCategory upsert
   */
  export type OutcomeCategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the OutcomeCategory
    **/
    select?: OutcomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: OutcomeCategoryInclude | null
    /**
     * The filter to search for the OutcomeCategory to update in case it exists.
    **/
    where: OutcomeCategoryWhereUniqueInput
    /**
     * In case the OutcomeCategory found by the `where` argument doesn't exist, create a new OutcomeCategory with this data.
    **/
    create: XOR<OutcomeCategoryCreateInput, OutcomeCategoryUncheckedCreateInput>
    /**
     * In case the OutcomeCategory was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<OutcomeCategoryUpdateInput, OutcomeCategoryUncheckedUpdateInput>
  }


  /**
   * OutcomeCategory delete
   */
  export type OutcomeCategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the OutcomeCategory
    **/
    select?: OutcomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: OutcomeCategoryInclude | null
    /**
     * Filter which OutcomeCategory to delete.
    **/
    where: OutcomeCategoryWhereUniqueInput
  }


  /**
   * OutcomeCategory deleteMany
   */
  export type OutcomeCategoryDeleteManyArgs = {
    where?: OutcomeCategoryWhereInput
  }


  /**
   * OutcomeCategory without action
   */
  export type OutcomeCategoryArgs = {
    /**
     * Select specific fields to fetch from the OutcomeCategory
    **/
    select?: OutcomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: OutcomeCategoryInclude | null
  }



  /**
   * Model Category
   */


  export type AggregateCategory = {
    count: CategoryCountAggregateOutputType | null
    avg: CategoryAvgAggregateOutputType | null
    sum: CategorySumAggregateOutputType | null
    min: CategoryMinAggregateOutputType | null
    max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number
    userId: number
  }

  export type CategorySumAggregateOutputType = {
    id: number
    userId: number
  }

  export type CategoryMinAggregateOutputType = {
    id: number
    name: string | null
    icon: string | null
    isDeleted: boolean | null
    userId: number
  }

  export type CategoryMaxAggregateOutputType = {
    id: number
    name: string | null
    icon: string | null
    isDeleted: boolean | null
    userId: number
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number | null
    icon: number | null
    isDeleted: number | null
    userId: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    userId?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    userId?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    userId?: true
    _all?: true
  }

  export type CategoryAggregateArgs = {
    /**
     * Filter which Category to aggregate.
    **/
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
    **/
    orderBy?: Enumerable<CategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateCategory]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }


    
    
  export type CategoryGroupByArgs = {
    where?: CategoryWhereInput
    orderBy?: Enumerable<CategoryOrderByInput>
    by: Array<CategoryScalarFieldEnum>
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: CategoryCountAggregateInputType | true
    avg?: CategoryAvgAggregateInputType
    sum?: CategorySumAggregateInputType
    min?: CategoryMinAggregateInputType
    max?: CategoryMaxAggregateInputType
  }


  export type CategoryGroupByOutputType = {
    id: number
    name: string
    icon: string
    isDeleted: boolean
    userId: number
    count: CategoryCountAggregateOutputType | null
    avg: CategoryAvgAggregateOutputType | null
    sum: CategorySumAggregateOutputType | null
    min: CategoryMinAggregateOutputType | null
    max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Promise<Array<
    PickArray<CategoryGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: GetScalarType<T[P], CategoryGroupByOutputType[P]>
    }
  >>
    

  export type CategorySelect = {
    id?: boolean
    name?: boolean
    icon?: boolean
    isDeleted?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    transactions?: boolean | TransactionFindManyArgs
    recurringTransaction?: boolean | RecurringTransactionFindManyArgs
    subCategories?: boolean | SubcategoryFindManyArgs
  }

  export type CategoryInclude = {
    user?: boolean | UserArgs
    transactions?: boolean | TransactionFindManyArgs
    recurringTransaction?: boolean | RecurringTransactionFindManyArgs
    subCategories?: boolean | SubcategoryFindManyArgs
  }

  export type CategoryGetPayload<
    S extends boolean | null | undefined | CategoryArgs,
    U = keyof S
      > = S extends true
        ? Category
    : S extends undefined
    ? never
    : S extends CategoryArgs | CategoryFindManyArgs
    ?'include' extends U
    ? Category  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['include'][P]>>  :
        P extends 'recurringTransaction'
        ? Array < RecurringTransactionGetPayload<S['include'][P]>>  :
        P extends 'subCategories'
        ? Array < SubcategoryGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Category ?Category [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['select'][P]>>  :
        P extends 'recurringTransaction'
        ? Array < RecurringTransactionGetPayload<S['select'][P]>>  :
        P extends 'subCategories'
        ? Array < SubcategoryGetPayload<S['select'][P]>>  : never
  } 
    : Category
  : Category


  type CategoryCountArgs = Merge<
    Omit<CategoryFindManyArgs, 'select' | 'include'> & {
      select?: CategoryCountAggregateInputType | true
    }
  >

  export interface CategoryDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CategoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Category'> extends True ? CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>> : CheckSelect<T, Prisma__CategoryClient<Category | null >, Prisma__CategoryClient<CategoryGetPayload<T> | null >>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CategoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Category'> extends True ? CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>> : CheckSelect<T, Prisma__CategoryClient<Category | null >, Prisma__CategoryClient<CategoryGetPayload<T> | null >>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CategoryFindManyArgs>(
      args?: SelectSubset<T, CategoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Category>>, PrismaPromise<Array<CategoryGetPayload<T>>>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
    **/
    create<T extends CategoryCreateArgs>(
      args: SelectSubset<T, CategoryCreateArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Create many Categories.
     *     @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     *     @example
     *     // Create many Categories
     *     const category = await prisma.category.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CategoryCreateManyArgs>(
      args?: SelectSubset<T, CategoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
    **/
    delete<T extends CategoryDeleteArgs>(
      args: SelectSubset<T, CategoryDeleteArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CategoryUpdateArgs>(
      args: SelectSubset<T, CategoryUpdateArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CategoryDeleteManyArgs>(
      args?: SelectSubset<T, CategoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CategoryUpdateManyArgs>(
      args: SelectSubset<T, CategoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
    **/
    upsert<T extends CategoryUpsertArgs>(
      args: SelectSubset<T, CategoryUpsertArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CategoryClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    transactions<T extends TransactionFindManyArgs = {}>(args?: Subset<T, TransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Transaction>>, PrismaPromise<Array<TransactionGetPayload<T>>>>;

    recurringTransaction<T extends RecurringTransactionFindManyArgs = {}>(args?: Subset<T, RecurringTransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<RecurringTransaction>>, PrismaPromise<Array<RecurringTransactionGetPayload<T>>>>;

    subCategories<T extends SubcategoryFindManyArgs = {}>(args?: Subset<T, SubcategoryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Subcategory>>, PrismaPromise<Array<SubcategoryGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Throw an Error if a Category can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Category to fetch.
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Throw an Error if a Category can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Category to fetch.
    **/
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
    **/
    orderBy?: Enumerable<CategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
    **/
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category findMany
   */
  export type CategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Filter, which Categories to fetch.
    **/
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
    **/
    orderBy?: Enumerable<CategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
    **/
    skip?: number
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category create
   */
  export type CategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * The data needed to create a Category.
    **/
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }


  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs = {
    data: Enumerable<CategoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Category update
   */
  export type CategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * The data needed to update a Category.
    **/
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs = {
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    where?: CategoryWhereInput
  }


  /**
   * Category upsert
   */
  export type CategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * The filter to search for the Category to update in case it exists.
    **/
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
    **/
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }


  /**
   * Category delete
   */
  export type CategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Filter which Category to delete.
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs = {
    where?: CategoryWhereInput
  }


  /**
   * Category without action
   */
  export type CategoryArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
  }



  /**
   * Model Subcategory
   */


  export type AggregateSubcategory = {
    count: SubcategoryCountAggregateOutputType | null
    avg: SubcategoryAvgAggregateOutputType | null
    sum: SubcategorySumAggregateOutputType | null
    min: SubcategoryMinAggregateOutputType | null
    max: SubcategoryMaxAggregateOutputType | null
  }

  export type SubcategoryAvgAggregateOutputType = {
    id: number
    categoryId: number
  }

  export type SubcategorySumAggregateOutputType = {
    id: number
    categoryId: number
  }

  export type SubcategoryMinAggregateOutputType = {
    id: number
    name: string | null
    icon: string | null
    isDeleted: boolean | null
    categoryId: number
  }

  export type SubcategoryMaxAggregateOutputType = {
    id: number
    name: string | null
    icon: string | null
    isDeleted: boolean | null
    categoryId: number
  }

  export type SubcategoryCountAggregateOutputType = {
    id: number
    name: number | null
    icon: number | null
    isDeleted: number | null
    categoryId: number
    _all: number
  }


  export type SubcategoryAvgAggregateInputType = {
    id?: true
    categoryId?: true
  }

  export type SubcategorySumAggregateInputType = {
    id?: true
    categoryId?: true
  }

  export type SubcategoryMinAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    categoryId?: true
  }

  export type SubcategoryMaxAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    categoryId?: true
  }

  export type SubcategoryCountAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    isDeleted?: true
    categoryId?: true
    _all?: true
  }

  export type SubcategoryAggregateArgs = {
    /**
     * Filter which Subcategory to aggregate.
    **/
    where?: SubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subcategories to fetch.
    **/
    orderBy?: Enumerable<SubcategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: SubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subcategories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subcategories.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subcategories
    **/
    count?: true | SubcategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: SubcategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: SubcategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: SubcategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: SubcategoryMaxAggregateInputType
  }

  export type GetSubcategoryAggregateType<T extends SubcategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateSubcategory]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubcategory[P]>
      : GetScalarType<T[P], AggregateSubcategory[P]>
  }


    
    
  export type SubcategoryGroupByArgs = {
    where?: SubcategoryWhereInput
    orderBy?: Enumerable<SubcategoryOrderByInput>
    by: Array<SubcategoryScalarFieldEnum>
    having?: SubcategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: SubcategoryCountAggregateInputType | true
    avg?: SubcategoryAvgAggregateInputType
    sum?: SubcategorySumAggregateInputType
    min?: SubcategoryMinAggregateInputType
    max?: SubcategoryMaxAggregateInputType
  }


  export type SubcategoryGroupByOutputType = {
    id: number
    name: string
    icon: string
    isDeleted: boolean
    categoryId: number
    count: SubcategoryCountAggregateOutputType | null
    avg: SubcategoryAvgAggregateOutputType | null
    sum: SubcategorySumAggregateOutputType | null
    min: SubcategoryMinAggregateOutputType | null
    max: SubcategoryMaxAggregateOutputType | null
  }

  type GetSubcategoryGroupByPayload<T extends SubcategoryGroupByArgs> = Promise<Array<
    PickArray<SubcategoryGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof SubcategoryGroupByOutputType))]: GetScalarType<T[P], SubcategoryGroupByOutputType[P]>
    }
  >>
    

  export type SubcategorySelect = {
    id?: boolean
    name?: boolean
    icon?: boolean
    isDeleted?: boolean
    category?: boolean | CategoryArgs
    categoryId?: boolean
    transactions?: boolean | TransactionFindManyArgs
    recurringTransaction?: boolean | RecurringTransactionFindManyArgs
  }

  export type SubcategoryInclude = {
    category?: boolean | CategoryArgs
    transactions?: boolean | TransactionFindManyArgs
    recurringTransaction?: boolean | RecurringTransactionFindManyArgs
  }

  export type SubcategoryGetPayload<
    S extends boolean | null | undefined | SubcategoryArgs,
    U = keyof S
      > = S extends true
        ? Subcategory
    : S extends undefined
    ? never
    : S extends SubcategoryArgs | SubcategoryFindManyArgs
    ?'include' extends U
    ? Subcategory  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'category'
        ? CategoryGetPayload<S['include'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['include'][P]>>  :
        P extends 'recurringTransaction'
        ? Array < RecurringTransactionGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Subcategory ?Subcategory [P]
  : 
          P extends 'category'
        ? CategoryGetPayload<S['select'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['select'][P]>>  :
        P extends 'recurringTransaction'
        ? Array < RecurringTransactionGetPayload<S['select'][P]>>  : never
  } 
    : Subcategory
  : Subcategory


  type SubcategoryCountArgs = Merge<
    Omit<SubcategoryFindManyArgs, 'select' | 'include'> & {
      select?: SubcategoryCountAggregateInputType | true
    }
  >

  export interface SubcategoryDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Subcategory that matches the filter.
     * @param {SubcategoryFindUniqueArgs} args - Arguments to find a Subcategory
     * @example
     * // Get one Subcategory
     * const subcategory = await prisma.subcategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SubcategoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SubcategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Subcategory'> extends True ? CheckSelect<T, Prisma__SubcategoryClient<Subcategory>, Prisma__SubcategoryClient<SubcategoryGetPayload<T>>> : CheckSelect<T, Prisma__SubcategoryClient<Subcategory | null >, Prisma__SubcategoryClient<SubcategoryGetPayload<T> | null >>

    /**
     * Find the first Subcategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryFindFirstArgs} args - Arguments to find a Subcategory
     * @example
     * // Get one Subcategory
     * const subcategory = await prisma.subcategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SubcategoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SubcategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Subcategory'> extends True ? CheckSelect<T, Prisma__SubcategoryClient<Subcategory>, Prisma__SubcategoryClient<SubcategoryGetPayload<T>>> : CheckSelect<T, Prisma__SubcategoryClient<Subcategory | null >, Prisma__SubcategoryClient<SubcategoryGetPayload<T> | null >>

    /**
     * Find zero or more Subcategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subcategories
     * const subcategories = await prisma.subcategory.findMany()
     * 
     * // Get first 10 Subcategories
     * const subcategories = await prisma.subcategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subcategoryWithIdOnly = await prisma.subcategory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SubcategoryFindManyArgs>(
      args?: SelectSubset<T, SubcategoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Subcategory>>, PrismaPromise<Array<SubcategoryGetPayload<T>>>>

    /**
     * Create a Subcategory.
     * @param {SubcategoryCreateArgs} args - Arguments to create a Subcategory.
     * @example
     * // Create one Subcategory
     * const Subcategory = await prisma.subcategory.create({
     *   data: {
     *     // ... data to create a Subcategory
     *   }
     * })
     * 
    **/
    create<T extends SubcategoryCreateArgs>(
      args: SelectSubset<T, SubcategoryCreateArgs>
    ): CheckSelect<T, Prisma__SubcategoryClient<Subcategory>, Prisma__SubcategoryClient<SubcategoryGetPayload<T>>>

    /**
     * Create many Subcategories.
     *     @param {SubcategoryCreateManyArgs} args - Arguments to create many Subcategories.
     *     @example
     *     // Create many Subcategories
     *     const subcategory = await prisma.subcategory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SubcategoryCreateManyArgs>(
      args?: SelectSubset<T, SubcategoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Subcategory.
     * @param {SubcategoryDeleteArgs} args - Arguments to delete one Subcategory.
     * @example
     * // Delete one Subcategory
     * const Subcategory = await prisma.subcategory.delete({
     *   where: {
     *     // ... filter to delete one Subcategory
     *   }
     * })
     * 
    **/
    delete<T extends SubcategoryDeleteArgs>(
      args: SelectSubset<T, SubcategoryDeleteArgs>
    ): CheckSelect<T, Prisma__SubcategoryClient<Subcategory>, Prisma__SubcategoryClient<SubcategoryGetPayload<T>>>

    /**
     * Update one Subcategory.
     * @param {SubcategoryUpdateArgs} args - Arguments to update one Subcategory.
     * @example
     * // Update one Subcategory
     * const subcategory = await prisma.subcategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SubcategoryUpdateArgs>(
      args: SelectSubset<T, SubcategoryUpdateArgs>
    ): CheckSelect<T, Prisma__SubcategoryClient<Subcategory>, Prisma__SubcategoryClient<SubcategoryGetPayload<T>>>

    /**
     * Delete zero or more Subcategories.
     * @param {SubcategoryDeleteManyArgs} args - Arguments to filter Subcategories to delete.
     * @example
     * // Delete a few Subcategories
     * const { count } = await prisma.subcategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SubcategoryDeleteManyArgs>(
      args?: SelectSubset<T, SubcategoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subcategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subcategories
     * const subcategory = await prisma.subcategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SubcategoryUpdateManyArgs>(
      args: SelectSubset<T, SubcategoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Subcategory.
     * @param {SubcategoryUpsertArgs} args - Arguments to update or create a Subcategory.
     * @example
     * // Update or create a Subcategory
     * const subcategory = await prisma.subcategory.upsert({
     *   create: {
     *     // ... data to create a Subcategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subcategory we want to update
     *   }
     * })
    **/
    upsert<T extends SubcategoryUpsertArgs>(
      args: SelectSubset<T, SubcategoryUpsertArgs>
    ): CheckSelect<T, Prisma__SubcategoryClient<Subcategory>, Prisma__SubcategoryClient<SubcategoryGetPayload<T>>>

    /**
     * Count the number of Subcategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryCountArgs} args - Arguments to filter Subcategories to count.
     * @example
     * // Count the number of Subcategories
     * const count = await prisma.subcategory.count({
     *   where: {
     *     // ... the filter for the Subcategories we want to count
     *   }
     * })
    **/
    count<T extends SubcategoryCountArgs>(
      args?: Subset<T, SubcategoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubcategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subcategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubcategoryAggregateArgs>(args: Subset<T, SubcategoryAggregateArgs>): PrismaPromise<GetSubcategoryAggregateType<T>>

    /**
     * Group by Subcategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubcategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubcategoryGroupByArgs['orderBy'] }
        : { orderBy?: SubcategoryGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubcategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubcategoryGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subcategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SubcategoryClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    category<T extends CategoryArgs = {}>(args?: Subset<T, CategoryArgs>): CheckSelect<T, Prisma__CategoryClient<Category | null >, Prisma__CategoryClient<CategoryGetPayload<T> | null >>;

    transactions<T extends TransactionFindManyArgs = {}>(args?: Subset<T, TransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Transaction>>, PrismaPromise<Array<TransactionGetPayload<T>>>>;

    recurringTransaction<T extends RecurringTransactionFindManyArgs = {}>(args?: Subset<T, RecurringTransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<RecurringTransaction>>, PrismaPromise<Array<RecurringTransactionGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Subcategory findUnique
   */
  export type SubcategoryFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Subcategory
    **/
    select?: SubcategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SubcategoryInclude | null
    /**
     * Throw an Error if a Subcategory can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Subcategory to fetch.
    **/
    where: SubcategoryWhereUniqueInput
  }


  /**
   * Subcategory findFirst
   */
  export type SubcategoryFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Subcategory
    **/
    select?: SubcategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SubcategoryInclude | null
    /**
     * Throw an Error if a Subcategory can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Subcategory to fetch.
    **/
    where?: SubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subcategories to fetch.
    **/
    orderBy?: Enumerable<SubcategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subcategories.
    **/
    cursor?: SubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subcategories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subcategories.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subcategories.
    **/
    distinct?: Enumerable<SubcategoryScalarFieldEnum>
  }


  /**
   * Subcategory findMany
   */
  export type SubcategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the Subcategory
    **/
    select?: SubcategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SubcategoryInclude | null
    /**
     * Filter, which Subcategories to fetch.
    **/
    where?: SubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subcategories to fetch.
    **/
    orderBy?: Enumerable<SubcategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subcategories.
    **/
    cursor?: SubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subcategories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subcategories.
    **/
    skip?: number
    distinct?: Enumerable<SubcategoryScalarFieldEnum>
  }


  /**
   * Subcategory create
   */
  export type SubcategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the Subcategory
    **/
    select?: SubcategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SubcategoryInclude | null
    /**
     * The data needed to create a Subcategory.
    **/
    data: XOR<SubcategoryCreateInput, SubcategoryUncheckedCreateInput>
  }


  /**
   * Subcategory createMany
   */
  export type SubcategoryCreateManyArgs = {
    data: Enumerable<SubcategoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Subcategory update
   */
  export type SubcategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the Subcategory
    **/
    select?: SubcategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SubcategoryInclude | null
    /**
     * The data needed to update a Subcategory.
    **/
    data: XOR<SubcategoryUpdateInput, SubcategoryUncheckedUpdateInput>
    /**
     * Choose, which Subcategory to update.
    **/
    where: SubcategoryWhereUniqueInput
  }


  /**
   * Subcategory updateMany
   */
  export type SubcategoryUpdateManyArgs = {
    data: XOR<SubcategoryUpdateManyMutationInput, SubcategoryUncheckedUpdateManyInput>
    where?: SubcategoryWhereInput
  }


  /**
   * Subcategory upsert
   */
  export type SubcategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the Subcategory
    **/
    select?: SubcategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SubcategoryInclude | null
    /**
     * The filter to search for the Subcategory to update in case it exists.
    **/
    where: SubcategoryWhereUniqueInput
    /**
     * In case the Subcategory found by the `where` argument doesn't exist, create a new Subcategory with this data.
    **/
    create: XOR<SubcategoryCreateInput, SubcategoryUncheckedCreateInput>
    /**
     * In case the Subcategory was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<SubcategoryUpdateInput, SubcategoryUncheckedUpdateInput>
  }


  /**
   * Subcategory delete
   */
  export type SubcategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the Subcategory
    **/
    select?: SubcategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SubcategoryInclude | null
    /**
     * Filter which Subcategory to delete.
    **/
    where: SubcategoryWhereUniqueInput
  }


  /**
   * Subcategory deleteMany
   */
  export type SubcategoryDeleteManyArgs = {
    where?: SubcategoryWhereInput
  }


  /**
   * Subcategory without action
   */
  export type SubcategoryArgs = {
    /**
     * Select specific fields to fetch from the Subcategory
    **/
    select?: SubcategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SubcategoryInclude | null
  }



  /**
   * Model Currency
   */


  export type AggregateCurrency = {
    count: CurrencyCountAggregateOutputType | null
    avg: CurrencyAvgAggregateOutputType | null
    sum: CurrencySumAggregateOutputType | null
    min: CurrencyMinAggregateOutputType | null
    max: CurrencyMaxAggregateOutputType | null
  }

  export type CurrencyAvgAggregateOutputType = {
    id: number
    exchangeRate: Decimal
    userId: number
  }

  export type CurrencySumAggregateOutputType = {
    id: number
    exchangeRate: Decimal
    userId: number
  }

  export type CurrencyMinAggregateOutputType = {
    id: number
    code: string | null
    exchangeRate: Decimal
    isDeleted: boolean | null
    userId: number
  }

  export type CurrencyMaxAggregateOutputType = {
    id: number
    code: string | null
    exchangeRate: Decimal
    isDeleted: boolean | null
    userId: number
  }

  export type CurrencyCountAggregateOutputType = {
    id: number
    code: number | null
    exchangeRate: number
    isDeleted: number | null
    userId: number
    _all: number
  }


  export type CurrencyAvgAggregateInputType = {
    id?: true
    exchangeRate?: true
    userId?: true
  }

  export type CurrencySumAggregateInputType = {
    id?: true
    exchangeRate?: true
    userId?: true
  }

  export type CurrencyMinAggregateInputType = {
    id?: true
    code?: true
    exchangeRate?: true
    isDeleted?: true
    userId?: true
  }

  export type CurrencyMaxAggregateInputType = {
    id?: true
    code?: true
    exchangeRate?: true
    isDeleted?: true
    userId?: true
  }

  export type CurrencyCountAggregateInputType = {
    id?: true
    code?: true
    exchangeRate?: true
    isDeleted?: true
    userId?: true
    _all?: true
  }

  export type CurrencyAggregateArgs = {
    /**
     * Filter which Currency to aggregate.
    **/
    where?: CurrencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Currencies to fetch.
    **/
    orderBy?: Enumerable<CurrencyOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: CurrencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Currencies from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Currencies.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Currencies
    **/
    count?: true | CurrencyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: CurrencyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: CurrencySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: CurrencyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: CurrencyMaxAggregateInputType
  }

  export type GetCurrencyAggregateType<T extends CurrencyAggregateArgs> = {
    [P in keyof T & keyof AggregateCurrency]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCurrency[P]>
      : GetScalarType<T[P], AggregateCurrency[P]>
  }


    
    
  export type CurrencyGroupByArgs = {
    where?: CurrencyWhereInput
    orderBy?: Enumerable<CurrencyOrderByInput>
    by: Array<CurrencyScalarFieldEnum>
    having?: CurrencyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: CurrencyCountAggregateInputType | true
    avg?: CurrencyAvgAggregateInputType
    sum?: CurrencySumAggregateInputType
    min?: CurrencyMinAggregateInputType
    max?: CurrencyMaxAggregateInputType
  }


  export type CurrencyGroupByOutputType = {
    id: number
    code: string
    exchangeRate: Decimal
    isDeleted: boolean
    userId: number
    count: CurrencyCountAggregateOutputType | null
    avg: CurrencyAvgAggregateOutputType | null
    sum: CurrencySumAggregateOutputType | null
    min: CurrencyMinAggregateOutputType | null
    max: CurrencyMaxAggregateOutputType | null
  }

  type GetCurrencyGroupByPayload<T extends CurrencyGroupByArgs> = Promise<Array<
    PickArray<CurrencyGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof CurrencyGroupByOutputType))]: GetScalarType<T[P], CurrencyGroupByOutputType[P]>
    }
  >>
    

  export type CurrencySelect = {
    id?: boolean
    code?: boolean
    exchangeRate?: boolean
    isDeleted?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    transactions?: boolean | TransactionFindManyArgs
    recurringTransaction?: boolean | RecurringTransactionFindManyArgs
  }

  export type CurrencyInclude = {
    user?: boolean | UserArgs
    transactions?: boolean | TransactionFindManyArgs
    recurringTransaction?: boolean | RecurringTransactionFindManyArgs
  }

  export type CurrencyGetPayload<
    S extends boolean | null | undefined | CurrencyArgs,
    U = keyof S
      > = S extends true
        ? Currency
    : S extends undefined
    ? never
    : S extends CurrencyArgs | CurrencyFindManyArgs
    ?'include' extends U
    ? Currency  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['include'][P]>>  :
        P extends 'recurringTransaction'
        ? Array < RecurringTransactionGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Currency ?Currency [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['select'][P]>>  :
        P extends 'recurringTransaction'
        ? Array < RecurringTransactionGetPayload<S['select'][P]>>  : never
  } 
    : Currency
  : Currency


  type CurrencyCountArgs = Merge<
    Omit<CurrencyFindManyArgs, 'select' | 'include'> & {
      select?: CurrencyCountAggregateInputType | true
    }
  >

  export interface CurrencyDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Currency that matches the filter.
     * @param {CurrencyFindUniqueArgs} args - Arguments to find a Currency
     * @example
     * // Get one Currency
     * const currency = await prisma.currency.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CurrencyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CurrencyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Currency'> extends True ? CheckSelect<T, Prisma__CurrencyClient<Currency>, Prisma__CurrencyClient<CurrencyGetPayload<T>>> : CheckSelect<T, Prisma__CurrencyClient<Currency | null >, Prisma__CurrencyClient<CurrencyGetPayload<T> | null >>

    /**
     * Find the first Currency that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyFindFirstArgs} args - Arguments to find a Currency
     * @example
     * // Get one Currency
     * const currency = await prisma.currency.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CurrencyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CurrencyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Currency'> extends True ? CheckSelect<T, Prisma__CurrencyClient<Currency>, Prisma__CurrencyClient<CurrencyGetPayload<T>>> : CheckSelect<T, Prisma__CurrencyClient<Currency | null >, Prisma__CurrencyClient<CurrencyGetPayload<T> | null >>

    /**
     * Find zero or more Currencies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Currencies
     * const currencies = await prisma.currency.findMany()
     * 
     * // Get first 10 Currencies
     * const currencies = await prisma.currency.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const currencyWithIdOnly = await prisma.currency.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CurrencyFindManyArgs>(
      args?: SelectSubset<T, CurrencyFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Currency>>, PrismaPromise<Array<CurrencyGetPayload<T>>>>

    /**
     * Create a Currency.
     * @param {CurrencyCreateArgs} args - Arguments to create a Currency.
     * @example
     * // Create one Currency
     * const Currency = await prisma.currency.create({
     *   data: {
     *     // ... data to create a Currency
     *   }
     * })
     * 
    **/
    create<T extends CurrencyCreateArgs>(
      args: SelectSubset<T, CurrencyCreateArgs>
    ): CheckSelect<T, Prisma__CurrencyClient<Currency>, Prisma__CurrencyClient<CurrencyGetPayload<T>>>

    /**
     * Create many Currencies.
     *     @param {CurrencyCreateManyArgs} args - Arguments to create many Currencies.
     *     @example
     *     // Create many Currencies
     *     const currency = await prisma.currency.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CurrencyCreateManyArgs>(
      args?: SelectSubset<T, CurrencyCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Currency.
     * @param {CurrencyDeleteArgs} args - Arguments to delete one Currency.
     * @example
     * // Delete one Currency
     * const Currency = await prisma.currency.delete({
     *   where: {
     *     // ... filter to delete one Currency
     *   }
     * })
     * 
    **/
    delete<T extends CurrencyDeleteArgs>(
      args: SelectSubset<T, CurrencyDeleteArgs>
    ): CheckSelect<T, Prisma__CurrencyClient<Currency>, Prisma__CurrencyClient<CurrencyGetPayload<T>>>

    /**
     * Update one Currency.
     * @param {CurrencyUpdateArgs} args - Arguments to update one Currency.
     * @example
     * // Update one Currency
     * const currency = await prisma.currency.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CurrencyUpdateArgs>(
      args: SelectSubset<T, CurrencyUpdateArgs>
    ): CheckSelect<T, Prisma__CurrencyClient<Currency>, Prisma__CurrencyClient<CurrencyGetPayload<T>>>

    /**
     * Delete zero or more Currencies.
     * @param {CurrencyDeleteManyArgs} args - Arguments to filter Currencies to delete.
     * @example
     * // Delete a few Currencies
     * const { count } = await prisma.currency.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CurrencyDeleteManyArgs>(
      args?: SelectSubset<T, CurrencyDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Currencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Currencies
     * const currency = await prisma.currency.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CurrencyUpdateManyArgs>(
      args: SelectSubset<T, CurrencyUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Currency.
     * @param {CurrencyUpsertArgs} args - Arguments to update or create a Currency.
     * @example
     * // Update or create a Currency
     * const currency = await prisma.currency.upsert({
     *   create: {
     *     // ... data to create a Currency
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Currency we want to update
     *   }
     * })
    **/
    upsert<T extends CurrencyUpsertArgs>(
      args: SelectSubset<T, CurrencyUpsertArgs>
    ): CheckSelect<T, Prisma__CurrencyClient<Currency>, Prisma__CurrencyClient<CurrencyGetPayload<T>>>

    /**
     * Count the number of Currencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyCountArgs} args - Arguments to filter Currencies to count.
     * @example
     * // Count the number of Currencies
     * const count = await prisma.currency.count({
     *   where: {
     *     // ... the filter for the Currencies we want to count
     *   }
     * })
    **/
    count<T extends CurrencyCountArgs>(
      args?: Subset<T, CurrencyCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CurrencyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Currency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CurrencyAggregateArgs>(args: Subset<T, CurrencyAggregateArgs>): PrismaPromise<GetCurrencyAggregateType<T>>

    /**
     * Group by Currency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrencyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CurrencyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CurrencyGroupByArgs['orderBy'] }
        : { orderBy?: CurrencyGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CurrencyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCurrencyGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Currency.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CurrencyClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    transactions<T extends TransactionFindManyArgs = {}>(args?: Subset<T, TransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Transaction>>, PrismaPromise<Array<TransactionGetPayload<T>>>>;

    recurringTransaction<T extends RecurringTransactionFindManyArgs = {}>(args?: Subset<T, RecurringTransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<RecurringTransaction>>, PrismaPromise<Array<RecurringTransactionGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Currency findUnique
   */
  export type CurrencyFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Currency
    **/
    select?: CurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CurrencyInclude | null
    /**
     * Throw an Error if a Currency can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Currency to fetch.
    **/
    where: CurrencyWhereUniqueInput
  }


  /**
   * Currency findFirst
   */
  export type CurrencyFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Currency
    **/
    select?: CurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CurrencyInclude | null
    /**
     * Throw an Error if a Currency can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Currency to fetch.
    **/
    where?: CurrencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Currencies to fetch.
    **/
    orderBy?: Enumerable<CurrencyOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Currencies.
    **/
    cursor?: CurrencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Currencies from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Currencies.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Currencies.
    **/
    distinct?: Enumerable<CurrencyScalarFieldEnum>
  }


  /**
   * Currency findMany
   */
  export type CurrencyFindManyArgs = {
    /**
     * Select specific fields to fetch from the Currency
    **/
    select?: CurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CurrencyInclude | null
    /**
     * Filter, which Currencies to fetch.
    **/
    where?: CurrencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Currencies to fetch.
    **/
    orderBy?: Enumerable<CurrencyOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Currencies.
    **/
    cursor?: CurrencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Currencies from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Currencies.
    **/
    skip?: number
    distinct?: Enumerable<CurrencyScalarFieldEnum>
  }


  /**
   * Currency create
   */
  export type CurrencyCreateArgs = {
    /**
     * Select specific fields to fetch from the Currency
    **/
    select?: CurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CurrencyInclude | null
    /**
     * The data needed to create a Currency.
    **/
    data: XOR<CurrencyCreateInput, CurrencyUncheckedCreateInput>
  }


  /**
   * Currency createMany
   */
  export type CurrencyCreateManyArgs = {
    data: Enumerable<CurrencyCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Currency update
   */
  export type CurrencyUpdateArgs = {
    /**
     * Select specific fields to fetch from the Currency
    **/
    select?: CurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CurrencyInclude | null
    /**
     * The data needed to update a Currency.
    **/
    data: XOR<CurrencyUpdateInput, CurrencyUncheckedUpdateInput>
    /**
     * Choose, which Currency to update.
    **/
    where: CurrencyWhereUniqueInput
  }


  /**
   * Currency updateMany
   */
  export type CurrencyUpdateManyArgs = {
    data: XOR<CurrencyUpdateManyMutationInput, CurrencyUncheckedUpdateManyInput>
    where?: CurrencyWhereInput
  }


  /**
   * Currency upsert
   */
  export type CurrencyUpsertArgs = {
    /**
     * Select specific fields to fetch from the Currency
    **/
    select?: CurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CurrencyInclude | null
    /**
     * The filter to search for the Currency to update in case it exists.
    **/
    where: CurrencyWhereUniqueInput
    /**
     * In case the Currency found by the `where` argument doesn't exist, create a new Currency with this data.
    **/
    create: XOR<CurrencyCreateInput, CurrencyUncheckedCreateInput>
    /**
     * In case the Currency was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<CurrencyUpdateInput, CurrencyUncheckedUpdateInput>
  }


  /**
   * Currency delete
   */
  export type CurrencyDeleteArgs = {
    /**
     * Select specific fields to fetch from the Currency
    **/
    select?: CurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CurrencyInclude | null
    /**
     * Filter which Currency to delete.
    **/
    where: CurrencyWhereUniqueInput
  }


  /**
   * Currency deleteMany
   */
  export type CurrencyDeleteManyArgs = {
    where?: CurrencyWhereInput
  }


  /**
   * Currency without action
   */
  export type CurrencyArgs = {
    /**
     * Select specific fields to fetch from the Currency
    **/
    select?: CurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CurrencyInclude | null
  }



  /**
   * Model Transaction
   */


  export type AggregateTransaction = {
    count: TransactionCountAggregateOutputType | null
    avg: TransactionAvgAggregateOutputType | null
    sum: TransactionSumAggregateOutputType | null
    min: TransactionMinAggregateOutputType | null
    max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    id: number
    amount: Decimal
    payerId: number
    exchangeRate: Decimal | null
    currencyId: number | null
    budgetId: number
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
  }

  export type TransactionSumAggregateOutputType = {
    id: number
    amount: Decimal
    payerId: number
    exchangeRate: Decimal | null
    currencyId: number | null
    budgetId: number
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: number
    date: Date | null
    note: string | null
    amount: Decimal
    isDeleted: boolean | null
    payerId: number
    currencyCode: string | null
    exchangeRate: Decimal | null
    currencyId: number | null
    budgetId: number
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: number
    date: Date | null
    note: string | null
    amount: Decimal
    isDeleted: boolean | null
    payerId: number
    currencyCode: string | null
    exchangeRate: Decimal | null
    currencyId: number | null
    budgetId: number
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    date: number | null
    note: number | null
    amount: number
    isDeleted: number | null
    payerId: number
    currencyCode: number | null
    exchangeRate: number | null
    currencyId: number | null
    budgetId: number
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    id?: true
    amount?: true
    payerId?: true
    exchangeRate?: true
    currencyId?: true
    budgetId?: true
    categoryId?: true
    subcategoryId?: true
    outcomeCategoryId?: true
    incomeCategoryId?: true
  }

  export type TransactionSumAggregateInputType = {
    id?: true
    amount?: true
    payerId?: true
    exchangeRate?: true
    currencyId?: true
    budgetId?: true
    categoryId?: true
    subcategoryId?: true
    outcomeCategoryId?: true
    incomeCategoryId?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    date?: true
    note?: true
    amount?: true
    isDeleted?: true
    payerId?: true
    currencyCode?: true
    exchangeRate?: true
    currencyId?: true
    budgetId?: true
    categoryId?: true
    subcategoryId?: true
    outcomeCategoryId?: true
    incomeCategoryId?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    date?: true
    note?: true
    amount?: true
    isDeleted?: true
    payerId?: true
    currencyCode?: true
    exchangeRate?: true
    currencyId?: true
    budgetId?: true
    categoryId?: true
    subcategoryId?: true
    outcomeCategoryId?: true
    incomeCategoryId?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    date?: true
    note?: true
    amount?: true
    isDeleted?: true
    payerId?: true
    currencyCode?: true
    exchangeRate?: true
    currencyId?: true
    budgetId?: true
    categoryId?: true
    subcategoryId?: true
    outcomeCategoryId?: true
    incomeCategoryId?: true
    _all?: true
  }

  export type TransactionAggregateArgs = {
    /**
     * Filter which Transaction to aggregate.
    **/
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
    **/
    orderBy?: Enumerable<TransactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateTransaction]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }


    
    
  export type TransactionGroupByArgs = {
    where?: TransactionWhereInput
    orderBy?: Enumerable<TransactionOrderByInput>
    by: Array<TransactionScalarFieldEnum>
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: TransactionCountAggregateInputType | true
    avg?: TransactionAvgAggregateInputType
    sum?: TransactionSumAggregateInputType
    min?: TransactionMinAggregateInputType
    max?: TransactionMaxAggregateInputType
  }


  export type TransactionGroupByOutputType = {
    id: number
    date: Date
    note: string
    amount: Decimal
    isDeleted: boolean
    payerId: number
    currencyCode: string | null
    exchangeRate: Decimal | null
    currencyId: number | null
    budgetId: number
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
    count: TransactionCountAggregateOutputType | null
    avg: TransactionAvgAggregateOutputType | null
    sum: TransactionSumAggregateOutputType | null
    min: TransactionMinAggregateOutputType | null
    max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Promise<Array<
    PickArray<TransactionGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: GetScalarType<T[P], TransactionGroupByOutputType[P]>
    }
  >>
    

  export type TransactionSelect = {
    id?: boolean
    date?: boolean
    note?: boolean
    amount?: boolean
    isDeleted?: boolean
    payer?: boolean | PayerArgs
    payerId?: boolean
    currencyCode?: boolean
    exchangeRate?: boolean
    currency?: boolean | CurrencyArgs
    currencyId?: boolean
    payFrom?: boolean | BudgetArgs
    budgetId?: boolean
    category?: boolean | CategoryArgs
    categoryId?: boolean
    subcategory?: boolean | SubcategoryArgs
    subcategoryId?: boolean
    outcomeCategory?: boolean | OutcomeCategoryArgs
    outcomeCategoryId?: boolean
    incomeCategory?: boolean | IncomeCategoryArgs
    incomeCategoryId?: boolean
  }

  export type TransactionInclude = {
    payer?: boolean | PayerArgs
    currency?: boolean | CurrencyArgs
    payFrom?: boolean | BudgetArgs
    category?: boolean | CategoryArgs
    subcategory?: boolean | SubcategoryArgs
    outcomeCategory?: boolean | OutcomeCategoryArgs
    incomeCategory?: boolean | IncomeCategoryArgs
  }

  export type TransactionGetPayload<
    S extends boolean | null | undefined | TransactionArgs,
    U = keyof S
      > = S extends true
        ? Transaction
    : S extends undefined
    ? never
    : S extends TransactionArgs | TransactionFindManyArgs
    ?'include' extends U
    ? Transaction  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'payer'
        ? PayerGetPayload<S['include'][P]> :
        P extends 'currency'
        ? CurrencyGetPayload<S['include'][P]> | null :
        P extends 'payFrom'
        ? BudgetGetPayload<S['include'][P]> :
        P extends 'category'
        ? CategoryGetPayload<S['include'][P]> :
        P extends 'subcategory'
        ? SubcategoryGetPayload<S['include'][P]> | null :
        P extends 'outcomeCategory'
        ? OutcomeCategoryGetPayload<S['include'][P]> | null :
        P extends 'incomeCategory'
        ? IncomeCategoryGetPayload<S['include'][P]> | null : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Transaction ?Transaction [P]
  : 
          P extends 'payer'
        ? PayerGetPayload<S['select'][P]> :
        P extends 'currency'
        ? CurrencyGetPayload<S['select'][P]> | null :
        P extends 'payFrom'
        ? BudgetGetPayload<S['select'][P]> :
        P extends 'category'
        ? CategoryGetPayload<S['select'][P]> :
        P extends 'subcategory'
        ? SubcategoryGetPayload<S['select'][P]> | null :
        P extends 'outcomeCategory'
        ? OutcomeCategoryGetPayload<S['select'][P]> | null :
        P extends 'incomeCategory'
        ? IncomeCategoryGetPayload<S['select'][P]> | null : never
  } 
    : Transaction
  : Transaction


  type TransactionCountArgs = Merge<
    Omit<TransactionFindManyArgs, 'select' | 'include'> & {
      select?: TransactionCountAggregateInputType | true
    }
  >

  export interface TransactionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TransactionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TransactionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Transaction'> extends True ? CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>> : CheckSelect<T, Prisma__TransactionClient<Transaction | null >, Prisma__TransactionClient<TransactionGetPayload<T> | null >>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TransactionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TransactionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Transaction'> extends True ? CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>> : CheckSelect<T, Prisma__TransactionClient<Transaction | null >, Prisma__TransactionClient<TransactionGetPayload<T> | null >>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TransactionFindManyArgs>(
      args?: SelectSubset<T, TransactionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Transaction>>, PrismaPromise<Array<TransactionGetPayload<T>>>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
    **/
    create<T extends TransactionCreateArgs>(
      args: SelectSubset<T, TransactionCreateArgs>
    ): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>

    /**
     * Create many Transactions.
     *     @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     *     @example
     *     // Create many Transactions
     *     const transaction = await prisma.transaction.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TransactionCreateManyArgs>(
      args?: SelectSubset<T, TransactionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
    **/
    delete<T extends TransactionDeleteArgs>(
      args: SelectSubset<T, TransactionDeleteArgs>
    ): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TransactionUpdateArgs>(
      args: SelectSubset<T, TransactionUpdateArgs>
    ): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TransactionDeleteManyArgs>(
      args?: SelectSubset<T, TransactionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TransactionUpdateManyArgs>(
      args: SelectSubset<T, TransactionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
    **/
    upsert<T extends TransactionUpsertArgs>(
      args: SelectSubset<T, TransactionUpsertArgs>
    ): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>

    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TransactionClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    payer<T extends PayerArgs = {}>(args?: Subset<T, PayerArgs>): CheckSelect<T, Prisma__PayerClient<Payer | null >, Prisma__PayerClient<PayerGetPayload<T> | null >>;

    currency<T extends CurrencyArgs = {}>(args?: Subset<T, CurrencyArgs>): CheckSelect<T, Prisma__CurrencyClient<Currency | null >, Prisma__CurrencyClient<CurrencyGetPayload<T> | null >>;

    payFrom<T extends BudgetArgs = {}>(args?: Subset<T, BudgetArgs>): CheckSelect<T, Prisma__BudgetClient<Budget | null >, Prisma__BudgetClient<BudgetGetPayload<T> | null >>;

    category<T extends CategoryArgs = {}>(args?: Subset<T, CategoryArgs>): CheckSelect<T, Prisma__CategoryClient<Category | null >, Prisma__CategoryClient<CategoryGetPayload<T> | null >>;

    subcategory<T extends SubcategoryArgs = {}>(args?: Subset<T, SubcategoryArgs>): CheckSelect<T, Prisma__SubcategoryClient<Subcategory | null >, Prisma__SubcategoryClient<SubcategoryGetPayload<T> | null >>;

    outcomeCategory<T extends OutcomeCategoryArgs = {}>(args?: Subset<T, OutcomeCategoryArgs>): CheckSelect<T, Prisma__OutcomeCategoryClient<OutcomeCategory | null >, Prisma__OutcomeCategoryClient<OutcomeCategoryGetPayload<T> | null >>;

    incomeCategory<T extends IncomeCategoryArgs = {}>(args?: Subset<T, IncomeCategoryArgs>): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory | null >, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Transaction
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionInclude | null
    /**
     * Throw an Error if a Transaction can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Transaction to fetch.
    **/
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Transaction
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionInclude | null
    /**
     * Throw an Error if a Transaction can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Transaction to fetch.
    **/
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
    **/
    orderBy?: Enumerable<TransactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
    **/
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
    **/
    distinct?: Enumerable<TransactionScalarFieldEnum>
  }


  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs = {
    /**
     * Select specific fields to fetch from the Transaction
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionInclude | null
    /**
     * Filter, which Transactions to fetch.
    **/
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
    **/
    orderBy?: Enumerable<TransactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
    **/
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
    **/
    skip?: number
    distinct?: Enumerable<TransactionScalarFieldEnum>
  }


  /**
   * Transaction create
   */
  export type TransactionCreateArgs = {
    /**
     * Select specific fields to fetch from the Transaction
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionInclude | null
    /**
     * The data needed to create a Transaction.
    **/
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }


  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs = {
    data: Enumerable<TransactionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Transaction update
   */
  export type TransactionUpdateArgs = {
    /**
     * Select specific fields to fetch from the Transaction
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionInclude | null
    /**
     * The data needed to update a Transaction.
    **/
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
    **/
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs = {
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    where?: TransactionWhereInput
  }


  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs = {
    /**
     * Select specific fields to fetch from the Transaction
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionInclude | null
    /**
     * The filter to search for the Transaction to update in case it exists.
    **/
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
    **/
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }


  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs = {
    /**
     * Select specific fields to fetch from the Transaction
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionInclude | null
    /**
     * Filter which Transaction to delete.
    **/
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs = {
    where?: TransactionWhereInput
  }


  /**
   * Transaction without action
   */
  export type TransactionArgs = {
    /**
     * Select specific fields to fetch from the Transaction
    **/
    select?: TransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionInclude | null
  }



  /**
   * Model RecurringTransaction
   */


  export type AggregateRecurringTransaction = {
    count: RecurringTransactionCountAggregateOutputType | null
    avg: RecurringTransactionAvgAggregateOutputType | null
    sum: RecurringTransactionSumAggregateOutputType | null
    min: RecurringTransactionMinAggregateOutputType | null
    max: RecurringTransactionMaxAggregateOutputType | null
  }

  export type RecurringTransactionAvgAggregateOutputType = {
    id: number
    amount: Decimal
    payerId: number
    currencyId: number | null
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
  }

  export type RecurringTransactionSumAggregateOutputType = {
    id: number
    amount: Decimal
    payerId: number
    currencyId: number | null
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
  }

  export type RecurringTransactionMinAggregateOutputType = {
    id: number
    date: Date | null
    note: string | null
    amount: Decimal
    dayOfPayment: Date | null
    activationDate: Date | null
    isDeleted: boolean | null
    payerId: number
    currencyId: number | null
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
  }

  export type RecurringTransactionMaxAggregateOutputType = {
    id: number
    date: Date | null
    note: string | null
    amount: Decimal
    dayOfPayment: Date | null
    activationDate: Date | null
    isDeleted: boolean | null
    payerId: number
    currencyId: number | null
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
  }

  export type RecurringTransactionCountAggregateOutputType = {
    id: number
    date: number | null
    note: number | null
    amount: number
    dayOfPayment: number | null
    activationDate: number | null
    isDeleted: number | null
    payerId: number
    currencyId: number | null
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
    _all: number
  }


  export type RecurringTransactionAvgAggregateInputType = {
    id?: true
    amount?: true
    payerId?: true
    currencyId?: true
    categoryId?: true
    subcategoryId?: true
    outcomeCategoryId?: true
    incomeCategoryId?: true
  }

  export type RecurringTransactionSumAggregateInputType = {
    id?: true
    amount?: true
    payerId?: true
    currencyId?: true
    categoryId?: true
    subcategoryId?: true
    outcomeCategoryId?: true
    incomeCategoryId?: true
  }

  export type RecurringTransactionMinAggregateInputType = {
    id?: true
    date?: true
    note?: true
    amount?: true
    dayOfPayment?: true
    activationDate?: true
    isDeleted?: true
    payerId?: true
    currencyId?: true
    categoryId?: true
    subcategoryId?: true
    outcomeCategoryId?: true
    incomeCategoryId?: true
  }

  export type RecurringTransactionMaxAggregateInputType = {
    id?: true
    date?: true
    note?: true
    amount?: true
    dayOfPayment?: true
    activationDate?: true
    isDeleted?: true
    payerId?: true
    currencyId?: true
    categoryId?: true
    subcategoryId?: true
    outcomeCategoryId?: true
    incomeCategoryId?: true
  }

  export type RecurringTransactionCountAggregateInputType = {
    id?: true
    date?: true
    note?: true
    amount?: true
    dayOfPayment?: true
    activationDate?: true
    isDeleted?: true
    payerId?: true
    currencyId?: true
    categoryId?: true
    subcategoryId?: true
    outcomeCategoryId?: true
    incomeCategoryId?: true
    _all?: true
  }

  export type RecurringTransactionAggregateArgs = {
    /**
     * Filter which RecurringTransaction to aggregate.
    **/
    where?: RecurringTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecurringTransactions to fetch.
    **/
    orderBy?: Enumerable<RecurringTransactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: RecurringTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecurringTransactions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecurringTransactions.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecurringTransactions
    **/
    count?: true | RecurringTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: RecurringTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: RecurringTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: RecurringTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: RecurringTransactionMaxAggregateInputType
  }

  export type GetRecurringTransactionAggregateType<T extends RecurringTransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateRecurringTransaction]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecurringTransaction[P]>
      : GetScalarType<T[P], AggregateRecurringTransaction[P]>
  }


    
    
  export type RecurringTransactionGroupByArgs = {
    where?: RecurringTransactionWhereInput
    orderBy?: Enumerable<RecurringTransactionOrderByInput>
    by: Array<RecurringTransactionScalarFieldEnum>
    having?: RecurringTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: RecurringTransactionCountAggregateInputType | true
    avg?: RecurringTransactionAvgAggregateInputType
    sum?: RecurringTransactionSumAggregateInputType
    min?: RecurringTransactionMinAggregateInputType
    max?: RecurringTransactionMaxAggregateInputType
  }


  export type RecurringTransactionGroupByOutputType = {
    id: number
    date: Date
    note: string
    amount: Decimal
    dayOfPayment: Date
    activationDate: Date
    isDeleted: boolean
    payerId: number
    currencyId: number | null
    categoryId: number
    subcategoryId: number | null
    outcomeCategoryId: number | null
    incomeCategoryId: number | null
    count: RecurringTransactionCountAggregateOutputType | null
    avg: RecurringTransactionAvgAggregateOutputType | null
    sum: RecurringTransactionSumAggregateOutputType | null
    min: RecurringTransactionMinAggregateOutputType | null
    max: RecurringTransactionMaxAggregateOutputType | null
  }

  type GetRecurringTransactionGroupByPayload<T extends RecurringTransactionGroupByArgs> = Promise<Array<
    PickArray<RecurringTransactionGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof RecurringTransactionGroupByOutputType))]: GetScalarType<T[P], RecurringTransactionGroupByOutputType[P]>
    }
  >>
    

  export type RecurringTransactionSelect = {
    id?: boolean
    date?: boolean
    note?: boolean
    amount?: boolean
    dayOfPayment?: boolean
    activationDate?: boolean
    isDeleted?: boolean
    payer?: boolean | PayerArgs
    payerId?: boolean
    currency?: boolean | CurrencyArgs
    currencyId?: boolean
    budgets?: boolean | TransactionsOnBudgetsFindManyArgs
    category?: boolean | CategoryArgs
    categoryId?: boolean
    subcategory?: boolean | SubcategoryArgs
    subcategoryId?: boolean
    outcomeCategory?: boolean | OutcomeCategoryArgs
    outcomeCategoryId?: boolean
    incomeCategory?: boolean | IncomeCategoryArgs
    incomeCategoryId?: boolean
  }

  export type RecurringTransactionInclude = {
    payer?: boolean | PayerArgs
    currency?: boolean | CurrencyArgs
    budgets?: boolean | TransactionsOnBudgetsFindManyArgs
    category?: boolean | CategoryArgs
    subcategory?: boolean | SubcategoryArgs
    outcomeCategory?: boolean | OutcomeCategoryArgs
    incomeCategory?: boolean | IncomeCategoryArgs
  }

  export type RecurringTransactionGetPayload<
    S extends boolean | null | undefined | RecurringTransactionArgs,
    U = keyof S
      > = S extends true
        ? RecurringTransaction
    : S extends undefined
    ? never
    : S extends RecurringTransactionArgs | RecurringTransactionFindManyArgs
    ?'include' extends U
    ? RecurringTransaction  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'payer'
        ? PayerGetPayload<S['include'][P]> :
        P extends 'currency'
        ? CurrencyGetPayload<S['include'][P]> | null :
        P extends 'budgets'
        ? Array < TransactionsOnBudgetsGetPayload<S['include'][P]>>  :
        P extends 'category'
        ? CategoryGetPayload<S['include'][P]> :
        P extends 'subcategory'
        ? SubcategoryGetPayload<S['include'][P]> | null :
        P extends 'outcomeCategory'
        ? OutcomeCategoryGetPayload<S['include'][P]> | null :
        P extends 'incomeCategory'
        ? IncomeCategoryGetPayload<S['include'][P]> | null : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof RecurringTransaction ?RecurringTransaction [P]
  : 
          P extends 'payer'
        ? PayerGetPayload<S['select'][P]> :
        P extends 'currency'
        ? CurrencyGetPayload<S['select'][P]> | null :
        P extends 'budgets'
        ? Array < TransactionsOnBudgetsGetPayload<S['select'][P]>>  :
        P extends 'category'
        ? CategoryGetPayload<S['select'][P]> :
        P extends 'subcategory'
        ? SubcategoryGetPayload<S['select'][P]> | null :
        P extends 'outcomeCategory'
        ? OutcomeCategoryGetPayload<S['select'][P]> | null :
        P extends 'incomeCategory'
        ? IncomeCategoryGetPayload<S['select'][P]> | null : never
  } 
    : RecurringTransaction
  : RecurringTransaction


  type RecurringTransactionCountArgs = Merge<
    Omit<RecurringTransactionFindManyArgs, 'select' | 'include'> & {
      select?: RecurringTransactionCountAggregateInputType | true
    }
  >

  export interface RecurringTransactionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one RecurringTransaction that matches the filter.
     * @param {RecurringTransactionFindUniqueArgs} args - Arguments to find a RecurringTransaction
     * @example
     * // Get one RecurringTransaction
     * const recurringTransaction = await prisma.recurringTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RecurringTransactionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RecurringTransactionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'RecurringTransaction'> extends True ? CheckSelect<T, Prisma__RecurringTransactionClient<RecurringTransaction>, Prisma__RecurringTransactionClient<RecurringTransactionGetPayload<T>>> : CheckSelect<T, Prisma__RecurringTransactionClient<RecurringTransaction | null >, Prisma__RecurringTransactionClient<RecurringTransactionGetPayload<T> | null >>

    /**
     * Find the first RecurringTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionFindFirstArgs} args - Arguments to find a RecurringTransaction
     * @example
     * // Get one RecurringTransaction
     * const recurringTransaction = await prisma.recurringTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RecurringTransactionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RecurringTransactionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'RecurringTransaction'> extends True ? CheckSelect<T, Prisma__RecurringTransactionClient<RecurringTransaction>, Prisma__RecurringTransactionClient<RecurringTransactionGetPayload<T>>> : CheckSelect<T, Prisma__RecurringTransactionClient<RecurringTransaction | null >, Prisma__RecurringTransactionClient<RecurringTransactionGetPayload<T> | null >>

    /**
     * Find zero or more RecurringTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecurringTransactions
     * const recurringTransactions = await prisma.recurringTransaction.findMany()
     * 
     * // Get first 10 RecurringTransactions
     * const recurringTransactions = await prisma.recurringTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recurringTransactionWithIdOnly = await prisma.recurringTransaction.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RecurringTransactionFindManyArgs>(
      args?: SelectSubset<T, RecurringTransactionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<RecurringTransaction>>, PrismaPromise<Array<RecurringTransactionGetPayload<T>>>>

    /**
     * Create a RecurringTransaction.
     * @param {RecurringTransactionCreateArgs} args - Arguments to create a RecurringTransaction.
     * @example
     * // Create one RecurringTransaction
     * const RecurringTransaction = await prisma.recurringTransaction.create({
     *   data: {
     *     // ... data to create a RecurringTransaction
     *   }
     * })
     * 
    **/
    create<T extends RecurringTransactionCreateArgs>(
      args: SelectSubset<T, RecurringTransactionCreateArgs>
    ): CheckSelect<T, Prisma__RecurringTransactionClient<RecurringTransaction>, Prisma__RecurringTransactionClient<RecurringTransactionGetPayload<T>>>

    /**
     * Create many RecurringTransactions.
     *     @param {RecurringTransactionCreateManyArgs} args - Arguments to create many RecurringTransactions.
     *     @example
     *     // Create many RecurringTransactions
     *     const recurringTransaction = await prisma.recurringTransaction.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RecurringTransactionCreateManyArgs>(
      args?: SelectSubset<T, RecurringTransactionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a RecurringTransaction.
     * @param {RecurringTransactionDeleteArgs} args - Arguments to delete one RecurringTransaction.
     * @example
     * // Delete one RecurringTransaction
     * const RecurringTransaction = await prisma.recurringTransaction.delete({
     *   where: {
     *     // ... filter to delete one RecurringTransaction
     *   }
     * })
     * 
    **/
    delete<T extends RecurringTransactionDeleteArgs>(
      args: SelectSubset<T, RecurringTransactionDeleteArgs>
    ): CheckSelect<T, Prisma__RecurringTransactionClient<RecurringTransaction>, Prisma__RecurringTransactionClient<RecurringTransactionGetPayload<T>>>

    /**
     * Update one RecurringTransaction.
     * @param {RecurringTransactionUpdateArgs} args - Arguments to update one RecurringTransaction.
     * @example
     * // Update one RecurringTransaction
     * const recurringTransaction = await prisma.recurringTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RecurringTransactionUpdateArgs>(
      args: SelectSubset<T, RecurringTransactionUpdateArgs>
    ): CheckSelect<T, Prisma__RecurringTransactionClient<RecurringTransaction>, Prisma__RecurringTransactionClient<RecurringTransactionGetPayload<T>>>

    /**
     * Delete zero or more RecurringTransactions.
     * @param {RecurringTransactionDeleteManyArgs} args - Arguments to filter RecurringTransactions to delete.
     * @example
     * // Delete a few RecurringTransactions
     * const { count } = await prisma.recurringTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RecurringTransactionDeleteManyArgs>(
      args?: SelectSubset<T, RecurringTransactionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecurringTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecurringTransactions
     * const recurringTransaction = await prisma.recurringTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RecurringTransactionUpdateManyArgs>(
      args: SelectSubset<T, RecurringTransactionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one RecurringTransaction.
     * @param {RecurringTransactionUpsertArgs} args - Arguments to update or create a RecurringTransaction.
     * @example
     * // Update or create a RecurringTransaction
     * const recurringTransaction = await prisma.recurringTransaction.upsert({
     *   create: {
     *     // ... data to create a RecurringTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecurringTransaction we want to update
     *   }
     * })
    **/
    upsert<T extends RecurringTransactionUpsertArgs>(
      args: SelectSubset<T, RecurringTransactionUpsertArgs>
    ): CheckSelect<T, Prisma__RecurringTransactionClient<RecurringTransaction>, Prisma__RecurringTransactionClient<RecurringTransactionGetPayload<T>>>

    /**
     * Count the number of RecurringTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionCountArgs} args - Arguments to filter RecurringTransactions to count.
     * @example
     * // Count the number of RecurringTransactions
     * const count = await prisma.recurringTransaction.count({
     *   where: {
     *     // ... the filter for the RecurringTransactions we want to count
     *   }
     * })
    **/
    count<T extends RecurringTransactionCountArgs>(
      args?: Subset<T, RecurringTransactionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecurringTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecurringTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecurringTransactionAggregateArgs>(args: Subset<T, RecurringTransactionAggregateArgs>): PrismaPromise<GetRecurringTransactionAggregateType<T>>

    /**
     * Group by RecurringTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurringTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecurringTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecurringTransactionGroupByArgs['orderBy'] }
        : { orderBy?: RecurringTransactionGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecurringTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecurringTransactionGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecurringTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RecurringTransactionClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    payer<T extends PayerArgs = {}>(args?: Subset<T, PayerArgs>): CheckSelect<T, Prisma__PayerClient<Payer | null >, Prisma__PayerClient<PayerGetPayload<T> | null >>;

    currency<T extends CurrencyArgs = {}>(args?: Subset<T, CurrencyArgs>): CheckSelect<T, Prisma__CurrencyClient<Currency | null >, Prisma__CurrencyClient<CurrencyGetPayload<T> | null >>;

    budgets<T extends TransactionsOnBudgetsFindManyArgs = {}>(args?: Subset<T, TransactionsOnBudgetsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<TransactionsOnBudgets>>, PrismaPromise<Array<TransactionsOnBudgetsGetPayload<T>>>>;

    category<T extends CategoryArgs = {}>(args?: Subset<T, CategoryArgs>): CheckSelect<T, Prisma__CategoryClient<Category | null >, Prisma__CategoryClient<CategoryGetPayload<T> | null >>;

    subcategory<T extends SubcategoryArgs = {}>(args?: Subset<T, SubcategoryArgs>): CheckSelect<T, Prisma__SubcategoryClient<Subcategory | null >, Prisma__SubcategoryClient<SubcategoryGetPayload<T> | null >>;

    outcomeCategory<T extends OutcomeCategoryArgs = {}>(args?: Subset<T, OutcomeCategoryArgs>): CheckSelect<T, Prisma__OutcomeCategoryClient<OutcomeCategory | null >, Prisma__OutcomeCategoryClient<OutcomeCategoryGetPayload<T> | null >>;

    incomeCategory<T extends IncomeCategoryArgs = {}>(args?: Subset<T, IncomeCategoryArgs>): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory | null >, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * RecurringTransaction findUnique
   */
  export type RecurringTransactionFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
    **/
    select?: RecurringTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RecurringTransactionInclude | null
    /**
     * Throw an Error if a RecurringTransaction can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which RecurringTransaction to fetch.
    **/
    where: RecurringTransactionWhereUniqueInput
  }


  /**
   * RecurringTransaction findFirst
   */
  export type RecurringTransactionFindFirstArgs = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
    **/
    select?: RecurringTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RecurringTransactionInclude | null
    /**
     * Throw an Error if a RecurringTransaction can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which RecurringTransaction to fetch.
    **/
    where?: RecurringTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecurringTransactions to fetch.
    **/
    orderBy?: Enumerable<RecurringTransactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecurringTransactions.
    **/
    cursor?: RecurringTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecurringTransactions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecurringTransactions.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecurringTransactions.
    **/
    distinct?: Enumerable<RecurringTransactionScalarFieldEnum>
  }


  /**
   * RecurringTransaction findMany
   */
  export type RecurringTransactionFindManyArgs = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
    **/
    select?: RecurringTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RecurringTransactionInclude | null
    /**
     * Filter, which RecurringTransactions to fetch.
    **/
    where?: RecurringTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecurringTransactions to fetch.
    **/
    orderBy?: Enumerable<RecurringTransactionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecurringTransactions.
    **/
    cursor?: RecurringTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecurringTransactions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecurringTransactions.
    **/
    skip?: number
    distinct?: Enumerable<RecurringTransactionScalarFieldEnum>
  }


  /**
   * RecurringTransaction create
   */
  export type RecurringTransactionCreateArgs = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
    **/
    select?: RecurringTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RecurringTransactionInclude | null
    /**
     * The data needed to create a RecurringTransaction.
    **/
    data: XOR<RecurringTransactionCreateInput, RecurringTransactionUncheckedCreateInput>
  }


  /**
   * RecurringTransaction createMany
   */
  export type RecurringTransactionCreateManyArgs = {
    data: Enumerable<RecurringTransactionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * RecurringTransaction update
   */
  export type RecurringTransactionUpdateArgs = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
    **/
    select?: RecurringTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RecurringTransactionInclude | null
    /**
     * The data needed to update a RecurringTransaction.
    **/
    data: XOR<RecurringTransactionUpdateInput, RecurringTransactionUncheckedUpdateInput>
    /**
     * Choose, which RecurringTransaction to update.
    **/
    where: RecurringTransactionWhereUniqueInput
  }


  /**
   * RecurringTransaction updateMany
   */
  export type RecurringTransactionUpdateManyArgs = {
    data: XOR<RecurringTransactionUpdateManyMutationInput, RecurringTransactionUncheckedUpdateManyInput>
    where?: RecurringTransactionWhereInput
  }


  /**
   * RecurringTransaction upsert
   */
  export type RecurringTransactionUpsertArgs = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
    **/
    select?: RecurringTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RecurringTransactionInclude | null
    /**
     * The filter to search for the RecurringTransaction to update in case it exists.
    **/
    where: RecurringTransactionWhereUniqueInput
    /**
     * In case the RecurringTransaction found by the `where` argument doesn't exist, create a new RecurringTransaction with this data.
    **/
    create: XOR<RecurringTransactionCreateInput, RecurringTransactionUncheckedCreateInput>
    /**
     * In case the RecurringTransaction was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<RecurringTransactionUpdateInput, RecurringTransactionUncheckedUpdateInput>
  }


  /**
   * RecurringTransaction delete
   */
  export type RecurringTransactionDeleteArgs = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
    **/
    select?: RecurringTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RecurringTransactionInclude | null
    /**
     * Filter which RecurringTransaction to delete.
    **/
    where: RecurringTransactionWhereUniqueInput
  }


  /**
   * RecurringTransaction deleteMany
   */
  export type RecurringTransactionDeleteManyArgs = {
    where?: RecurringTransactionWhereInput
  }


  /**
   * RecurringTransaction without action
   */
  export type RecurringTransactionArgs = {
    /**
     * Select specific fields to fetch from the RecurringTransaction
    **/
    select?: RecurringTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RecurringTransactionInclude | null
  }



  /**
   * Model TransactionsOnBudgets
   */


  export type AggregateTransactionsOnBudgets = {
    count: TransactionsOnBudgetsCountAggregateOutputType | null
    avg: TransactionsOnBudgetsAvgAggregateOutputType | null
    sum: TransactionsOnBudgetsSumAggregateOutputType | null
    min: TransactionsOnBudgetsMinAggregateOutputType | null
    max: TransactionsOnBudgetsMaxAggregateOutputType | null
  }

  export type TransactionsOnBudgetsAvgAggregateOutputType = {
    budgetId: number
    transactionId: number
  }

  export type TransactionsOnBudgetsSumAggregateOutputType = {
    budgetId: number
    transactionId: number
  }

  export type TransactionsOnBudgetsMinAggregateOutputType = {
    budgetId: number
    transactionId: number
    createdAt: Date | null
  }

  export type TransactionsOnBudgetsMaxAggregateOutputType = {
    budgetId: number
    transactionId: number
    createdAt: Date | null
  }

  export type TransactionsOnBudgetsCountAggregateOutputType = {
    budgetId: number
    transactionId: number
    createdAt: number | null
    _all: number
  }


  export type TransactionsOnBudgetsAvgAggregateInputType = {
    budgetId?: true
    transactionId?: true
  }

  export type TransactionsOnBudgetsSumAggregateInputType = {
    budgetId?: true
    transactionId?: true
  }

  export type TransactionsOnBudgetsMinAggregateInputType = {
    budgetId?: true
    transactionId?: true
    createdAt?: true
  }

  export type TransactionsOnBudgetsMaxAggregateInputType = {
    budgetId?: true
    transactionId?: true
    createdAt?: true
  }

  export type TransactionsOnBudgetsCountAggregateInputType = {
    budgetId?: true
    transactionId?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionsOnBudgetsAggregateArgs = {
    /**
     * Filter which TransactionsOnBudgets to aggregate.
    **/
    where?: TransactionsOnBudgetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionsOnBudgets to fetch.
    **/
    orderBy?: Enumerable<TransactionsOnBudgetsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: TransactionsOnBudgetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionsOnBudgets from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionsOnBudgets.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TransactionsOnBudgets
    **/
    count?: true | TransactionsOnBudgetsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: TransactionsOnBudgetsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: TransactionsOnBudgetsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: TransactionsOnBudgetsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: TransactionsOnBudgetsMaxAggregateInputType
  }

  export type GetTransactionsOnBudgetsAggregateType<T extends TransactionsOnBudgetsAggregateArgs> = {
    [P in keyof T & keyof AggregateTransactionsOnBudgets]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransactionsOnBudgets[P]>
      : GetScalarType<T[P], AggregateTransactionsOnBudgets[P]>
  }


    
    
  export type TransactionsOnBudgetsGroupByArgs = {
    where?: TransactionsOnBudgetsWhereInput
    orderBy?: Enumerable<TransactionsOnBudgetsOrderByInput>
    by: Array<TransactionsOnBudgetsScalarFieldEnum>
    having?: TransactionsOnBudgetsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: TransactionsOnBudgetsCountAggregateInputType | true
    avg?: TransactionsOnBudgetsAvgAggregateInputType
    sum?: TransactionsOnBudgetsSumAggregateInputType
    min?: TransactionsOnBudgetsMinAggregateInputType
    max?: TransactionsOnBudgetsMaxAggregateInputType
  }


  export type TransactionsOnBudgetsGroupByOutputType = {
    budgetId: number
    transactionId: number
    createdAt: Date
    count: TransactionsOnBudgetsCountAggregateOutputType | null
    avg: TransactionsOnBudgetsAvgAggregateOutputType | null
    sum: TransactionsOnBudgetsSumAggregateOutputType | null
    min: TransactionsOnBudgetsMinAggregateOutputType | null
    max: TransactionsOnBudgetsMaxAggregateOutputType | null
  }

  type GetTransactionsOnBudgetsGroupByPayload<T extends TransactionsOnBudgetsGroupByArgs> = Promise<Array<
    PickArray<TransactionsOnBudgetsGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof TransactionsOnBudgetsGroupByOutputType))]: GetScalarType<T[P], TransactionsOnBudgetsGroupByOutputType[P]>
    }
  >>
    

  export type TransactionsOnBudgetsSelect = {
    budget?: boolean | BudgetArgs
    budgetId?: boolean
    transaction?: boolean | RecurringTransactionArgs
    transactionId?: boolean
    createdAt?: boolean
  }

  export type TransactionsOnBudgetsInclude = {
    budget?: boolean | BudgetArgs
    transaction?: boolean | RecurringTransactionArgs
  }

  export type TransactionsOnBudgetsGetPayload<
    S extends boolean | null | undefined | TransactionsOnBudgetsArgs,
    U = keyof S
      > = S extends true
        ? TransactionsOnBudgets
    : S extends undefined
    ? never
    : S extends TransactionsOnBudgetsArgs | TransactionsOnBudgetsFindManyArgs
    ?'include' extends U
    ? TransactionsOnBudgets  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'budget'
        ? BudgetGetPayload<S['include'][P]> :
        P extends 'transaction'
        ? RecurringTransactionGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof TransactionsOnBudgets ?TransactionsOnBudgets [P]
  : 
          P extends 'budget'
        ? BudgetGetPayload<S['select'][P]> :
        P extends 'transaction'
        ? RecurringTransactionGetPayload<S['select'][P]> : never
  } 
    : TransactionsOnBudgets
  : TransactionsOnBudgets


  type TransactionsOnBudgetsCountArgs = Merge<
    Omit<TransactionsOnBudgetsFindManyArgs, 'select' | 'include'> & {
      select?: TransactionsOnBudgetsCountAggregateInputType | true
    }
  >

  export interface TransactionsOnBudgetsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one TransactionsOnBudgets that matches the filter.
     * @param {TransactionsOnBudgetsFindUniqueArgs} args - Arguments to find a TransactionsOnBudgets
     * @example
     * // Get one TransactionsOnBudgets
     * const transactionsOnBudgets = await prisma.transactionsOnBudgets.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TransactionsOnBudgetsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TransactionsOnBudgetsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TransactionsOnBudgets'> extends True ? CheckSelect<T, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgets>, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgetsGetPayload<T>>> : CheckSelect<T, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgets | null >, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgetsGetPayload<T> | null >>

    /**
     * Find the first TransactionsOnBudgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionsOnBudgetsFindFirstArgs} args - Arguments to find a TransactionsOnBudgets
     * @example
     * // Get one TransactionsOnBudgets
     * const transactionsOnBudgets = await prisma.transactionsOnBudgets.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TransactionsOnBudgetsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TransactionsOnBudgetsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TransactionsOnBudgets'> extends True ? CheckSelect<T, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgets>, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgetsGetPayload<T>>> : CheckSelect<T, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgets | null >, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgetsGetPayload<T> | null >>

    /**
     * Find zero or more TransactionsOnBudgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionsOnBudgetsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TransactionsOnBudgets
     * const transactionsOnBudgets = await prisma.transactionsOnBudgets.findMany()
     * 
     * // Get first 10 TransactionsOnBudgets
     * const transactionsOnBudgets = await prisma.transactionsOnBudgets.findMany({ take: 10 })
     * 
     * // Only select the `budgetId`
     * const transactionsOnBudgetsWithBudgetIdOnly = await prisma.transactionsOnBudgets.findMany({ select: { budgetId: true } })
     * 
    **/
    findMany<T extends TransactionsOnBudgetsFindManyArgs>(
      args?: SelectSubset<T, TransactionsOnBudgetsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<TransactionsOnBudgets>>, PrismaPromise<Array<TransactionsOnBudgetsGetPayload<T>>>>

    /**
     * Create a TransactionsOnBudgets.
     * @param {TransactionsOnBudgetsCreateArgs} args - Arguments to create a TransactionsOnBudgets.
     * @example
     * // Create one TransactionsOnBudgets
     * const TransactionsOnBudgets = await prisma.transactionsOnBudgets.create({
     *   data: {
     *     // ... data to create a TransactionsOnBudgets
     *   }
     * })
     * 
    **/
    create<T extends TransactionsOnBudgetsCreateArgs>(
      args: SelectSubset<T, TransactionsOnBudgetsCreateArgs>
    ): CheckSelect<T, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgets>, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgetsGetPayload<T>>>

    /**
     * Create many TransactionsOnBudgets.
     *     @param {TransactionsOnBudgetsCreateManyArgs} args - Arguments to create many TransactionsOnBudgets.
     *     @example
     *     // Create many TransactionsOnBudgets
     *     const transactionsOnBudgets = await prisma.transactionsOnBudgets.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TransactionsOnBudgetsCreateManyArgs>(
      args?: SelectSubset<T, TransactionsOnBudgetsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a TransactionsOnBudgets.
     * @param {TransactionsOnBudgetsDeleteArgs} args - Arguments to delete one TransactionsOnBudgets.
     * @example
     * // Delete one TransactionsOnBudgets
     * const TransactionsOnBudgets = await prisma.transactionsOnBudgets.delete({
     *   where: {
     *     // ... filter to delete one TransactionsOnBudgets
     *   }
     * })
     * 
    **/
    delete<T extends TransactionsOnBudgetsDeleteArgs>(
      args: SelectSubset<T, TransactionsOnBudgetsDeleteArgs>
    ): CheckSelect<T, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgets>, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgetsGetPayload<T>>>

    /**
     * Update one TransactionsOnBudgets.
     * @param {TransactionsOnBudgetsUpdateArgs} args - Arguments to update one TransactionsOnBudgets.
     * @example
     * // Update one TransactionsOnBudgets
     * const transactionsOnBudgets = await prisma.transactionsOnBudgets.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TransactionsOnBudgetsUpdateArgs>(
      args: SelectSubset<T, TransactionsOnBudgetsUpdateArgs>
    ): CheckSelect<T, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgets>, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgetsGetPayload<T>>>

    /**
     * Delete zero or more TransactionsOnBudgets.
     * @param {TransactionsOnBudgetsDeleteManyArgs} args - Arguments to filter TransactionsOnBudgets to delete.
     * @example
     * // Delete a few TransactionsOnBudgets
     * const { count } = await prisma.transactionsOnBudgets.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TransactionsOnBudgetsDeleteManyArgs>(
      args?: SelectSubset<T, TransactionsOnBudgetsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransactionsOnBudgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionsOnBudgetsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TransactionsOnBudgets
     * const transactionsOnBudgets = await prisma.transactionsOnBudgets.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TransactionsOnBudgetsUpdateManyArgs>(
      args: SelectSubset<T, TransactionsOnBudgetsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one TransactionsOnBudgets.
     * @param {TransactionsOnBudgetsUpsertArgs} args - Arguments to update or create a TransactionsOnBudgets.
     * @example
     * // Update or create a TransactionsOnBudgets
     * const transactionsOnBudgets = await prisma.transactionsOnBudgets.upsert({
     *   create: {
     *     // ... data to create a TransactionsOnBudgets
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TransactionsOnBudgets we want to update
     *   }
     * })
    **/
    upsert<T extends TransactionsOnBudgetsUpsertArgs>(
      args: SelectSubset<T, TransactionsOnBudgetsUpsertArgs>
    ): CheckSelect<T, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgets>, Prisma__TransactionsOnBudgetsClient<TransactionsOnBudgetsGetPayload<T>>>

    /**
     * Count the number of TransactionsOnBudgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionsOnBudgetsCountArgs} args - Arguments to filter TransactionsOnBudgets to count.
     * @example
     * // Count the number of TransactionsOnBudgets
     * const count = await prisma.transactionsOnBudgets.count({
     *   where: {
     *     // ... the filter for the TransactionsOnBudgets we want to count
     *   }
     * })
    **/
    count<T extends TransactionsOnBudgetsCountArgs>(
      args?: Subset<T, TransactionsOnBudgetsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionsOnBudgetsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TransactionsOnBudgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionsOnBudgetsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionsOnBudgetsAggregateArgs>(args: Subset<T, TransactionsOnBudgetsAggregateArgs>): PrismaPromise<GetTransactionsOnBudgetsAggregateType<T>>

    /**
     * Group by TransactionsOnBudgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionsOnBudgetsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionsOnBudgetsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionsOnBudgetsGroupByArgs['orderBy'] }
        : { orderBy?: TransactionsOnBudgetsGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionsOnBudgetsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionsOnBudgetsGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for TransactionsOnBudgets.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TransactionsOnBudgetsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    budget<T extends BudgetArgs = {}>(args?: Subset<T, BudgetArgs>): CheckSelect<T, Prisma__BudgetClient<Budget | null >, Prisma__BudgetClient<BudgetGetPayload<T> | null >>;

    transaction<T extends RecurringTransactionArgs = {}>(args?: Subset<T, RecurringTransactionArgs>): CheckSelect<T, Prisma__RecurringTransactionClient<RecurringTransaction | null >, Prisma__RecurringTransactionClient<RecurringTransactionGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * TransactionsOnBudgets findUnique
   */
  export type TransactionsOnBudgetsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the TransactionsOnBudgets
    **/
    select?: TransactionsOnBudgetsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionsOnBudgetsInclude | null
    /**
     * Throw an Error if a TransactionsOnBudgets can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which TransactionsOnBudgets to fetch.
    **/
    where: TransactionsOnBudgetsWhereUniqueInput
  }


  /**
   * TransactionsOnBudgets findFirst
   */
  export type TransactionsOnBudgetsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the TransactionsOnBudgets
    **/
    select?: TransactionsOnBudgetsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionsOnBudgetsInclude | null
    /**
     * Throw an Error if a TransactionsOnBudgets can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which TransactionsOnBudgets to fetch.
    **/
    where?: TransactionsOnBudgetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionsOnBudgets to fetch.
    **/
    orderBy?: Enumerable<TransactionsOnBudgetsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransactionsOnBudgets.
    **/
    cursor?: TransactionsOnBudgetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionsOnBudgets from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionsOnBudgets.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionsOnBudgets.
    **/
    distinct?: Enumerable<TransactionsOnBudgetsScalarFieldEnum>
  }


  /**
   * TransactionsOnBudgets findMany
   */
  export type TransactionsOnBudgetsFindManyArgs = {
    /**
     * Select specific fields to fetch from the TransactionsOnBudgets
    **/
    select?: TransactionsOnBudgetsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionsOnBudgetsInclude | null
    /**
     * Filter, which TransactionsOnBudgets to fetch.
    **/
    where?: TransactionsOnBudgetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionsOnBudgets to fetch.
    **/
    orderBy?: Enumerable<TransactionsOnBudgetsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TransactionsOnBudgets.
    **/
    cursor?: TransactionsOnBudgetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionsOnBudgets from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionsOnBudgets.
    **/
    skip?: number
    distinct?: Enumerable<TransactionsOnBudgetsScalarFieldEnum>
  }


  /**
   * TransactionsOnBudgets create
   */
  export type TransactionsOnBudgetsCreateArgs = {
    /**
     * Select specific fields to fetch from the TransactionsOnBudgets
    **/
    select?: TransactionsOnBudgetsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionsOnBudgetsInclude | null
    /**
     * The data needed to create a TransactionsOnBudgets.
    **/
    data: XOR<TransactionsOnBudgetsCreateInput, TransactionsOnBudgetsUncheckedCreateInput>
  }


  /**
   * TransactionsOnBudgets createMany
   */
  export type TransactionsOnBudgetsCreateManyArgs = {
    data: Enumerable<TransactionsOnBudgetsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TransactionsOnBudgets update
   */
  export type TransactionsOnBudgetsUpdateArgs = {
    /**
     * Select specific fields to fetch from the TransactionsOnBudgets
    **/
    select?: TransactionsOnBudgetsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionsOnBudgetsInclude | null
    /**
     * The data needed to update a TransactionsOnBudgets.
    **/
    data: XOR<TransactionsOnBudgetsUpdateInput, TransactionsOnBudgetsUncheckedUpdateInput>
    /**
     * Choose, which TransactionsOnBudgets to update.
    **/
    where: TransactionsOnBudgetsWhereUniqueInput
  }


  /**
   * TransactionsOnBudgets updateMany
   */
  export type TransactionsOnBudgetsUpdateManyArgs = {
    data: XOR<TransactionsOnBudgetsUpdateManyMutationInput, TransactionsOnBudgetsUncheckedUpdateManyInput>
    where?: TransactionsOnBudgetsWhereInput
  }


  /**
   * TransactionsOnBudgets upsert
   */
  export type TransactionsOnBudgetsUpsertArgs = {
    /**
     * Select specific fields to fetch from the TransactionsOnBudgets
    **/
    select?: TransactionsOnBudgetsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionsOnBudgetsInclude | null
    /**
     * The filter to search for the TransactionsOnBudgets to update in case it exists.
    **/
    where: TransactionsOnBudgetsWhereUniqueInput
    /**
     * In case the TransactionsOnBudgets found by the `where` argument doesn't exist, create a new TransactionsOnBudgets with this data.
    **/
    create: XOR<TransactionsOnBudgetsCreateInput, TransactionsOnBudgetsUncheckedCreateInput>
    /**
     * In case the TransactionsOnBudgets was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<TransactionsOnBudgetsUpdateInput, TransactionsOnBudgetsUncheckedUpdateInput>
  }


  /**
   * TransactionsOnBudgets delete
   */
  export type TransactionsOnBudgetsDeleteArgs = {
    /**
     * Select specific fields to fetch from the TransactionsOnBudgets
    **/
    select?: TransactionsOnBudgetsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionsOnBudgetsInclude | null
    /**
     * Filter which TransactionsOnBudgets to delete.
    **/
    where: TransactionsOnBudgetsWhereUniqueInput
  }


  /**
   * TransactionsOnBudgets deleteMany
   */
  export type TransactionsOnBudgetsDeleteManyArgs = {
    where?: TransactionsOnBudgetsWhereInput
  }


  /**
   * TransactionsOnBudgets without action
   */
  export type TransactionsOnBudgetsArgs = {
    /**
     * Select specific fields to fetch from the TransactionsOnBudgets
    **/
    select?: TransactionsOnBudgetsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TransactionsOnBudgetsInclude | null
  }



  /**
   * Model Payer
   */


  export type AggregatePayer = {
    count: PayerCountAggregateOutputType | null
    avg: PayerAvgAggregateOutputType | null
    sum: PayerSumAggregateOutputType | null
    min: PayerMinAggregateOutputType | null
    max: PayerMaxAggregateOutputType | null
  }

  export type PayerAvgAggregateOutputType = {
    id: number
    userId: number
  }

  export type PayerSumAggregateOutputType = {
    id: number
    userId: number
  }

  export type PayerMinAggregateOutputType = {
    id: number
    name: string | null
    isDeleted: boolean | null
    userId: number
  }

  export type PayerMaxAggregateOutputType = {
    id: number
    name: string | null
    isDeleted: boolean | null
    userId: number
  }

  export type PayerCountAggregateOutputType = {
    id: number
    name: number | null
    isDeleted: number | null
    userId: number
    _all: number
  }


  export type PayerAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type PayerSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type PayerMinAggregateInputType = {
    id?: true
    name?: true
    isDeleted?: true
    userId?: true
  }

  export type PayerMaxAggregateInputType = {
    id?: true
    name?: true
    isDeleted?: true
    userId?: true
  }

  export type PayerCountAggregateInputType = {
    id?: true
    name?: true
    isDeleted?: true
    userId?: true
    _all?: true
  }

  export type PayerAggregateArgs = {
    /**
     * Filter which Payer to aggregate.
    **/
    where?: PayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payers to fetch.
    **/
    orderBy?: Enumerable<PayerOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: PayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payers from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payers.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payers
    **/
    count?: true | PayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: PayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: PayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: PayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: PayerMaxAggregateInputType
  }

  export type GetPayerAggregateType<T extends PayerAggregateArgs> = {
    [P in keyof T & keyof AggregatePayer]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayer[P]>
      : GetScalarType<T[P], AggregatePayer[P]>
  }


    
    
  export type PayerGroupByArgs = {
    where?: PayerWhereInput
    orderBy?: Enumerable<PayerOrderByInput>
    by: Array<PayerScalarFieldEnum>
    having?: PayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: PayerCountAggregateInputType | true
    avg?: PayerAvgAggregateInputType
    sum?: PayerSumAggregateInputType
    min?: PayerMinAggregateInputType
    max?: PayerMaxAggregateInputType
  }


  export type PayerGroupByOutputType = {
    id: number
    name: string
    isDeleted: boolean
    userId: number
    count: PayerCountAggregateOutputType | null
    avg: PayerAvgAggregateOutputType | null
    sum: PayerSumAggregateOutputType | null
    min: PayerMinAggregateOutputType | null
    max: PayerMaxAggregateOutputType | null
  }

  type GetPayerGroupByPayload<T extends PayerGroupByArgs> = Promise<Array<
    PickArray<PayerGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof PayerGroupByOutputType))]: GetScalarType<T[P], PayerGroupByOutputType[P]>
    }
  >>
    

  export type PayerSelect = {
    id?: boolean
    name?: boolean
    isDeleted?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    transactions?: boolean | TransactionFindManyArgs
    recurringTransactions?: boolean | RecurringTransactionFindManyArgs
  }

  export type PayerInclude = {
    user?: boolean | UserArgs
    transactions?: boolean | TransactionFindManyArgs
    recurringTransactions?: boolean | RecurringTransactionFindManyArgs
  }

  export type PayerGetPayload<
    S extends boolean | null | undefined | PayerArgs,
    U = keyof S
      > = S extends true
        ? Payer
    : S extends undefined
    ? never
    : S extends PayerArgs | PayerFindManyArgs
    ?'include' extends U
    ? Payer  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['include'][P]>>  :
        P extends 'recurringTransactions'
        ? Array < RecurringTransactionGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Payer ?Payer [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> :
        P extends 'transactions'
        ? Array < TransactionGetPayload<S['select'][P]>>  :
        P extends 'recurringTransactions'
        ? Array < RecurringTransactionGetPayload<S['select'][P]>>  : never
  } 
    : Payer
  : Payer


  type PayerCountArgs = Merge<
    Omit<PayerFindManyArgs, 'select' | 'include'> & {
      select?: PayerCountAggregateInputType | true
    }
  >

  export interface PayerDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Payer that matches the filter.
     * @param {PayerFindUniqueArgs} args - Arguments to find a Payer
     * @example
     * // Get one Payer
     * const payer = await prisma.payer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PayerFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PayerFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Payer'> extends True ? CheckSelect<T, Prisma__PayerClient<Payer>, Prisma__PayerClient<PayerGetPayload<T>>> : CheckSelect<T, Prisma__PayerClient<Payer | null >, Prisma__PayerClient<PayerGetPayload<T> | null >>

    /**
     * Find the first Payer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerFindFirstArgs} args - Arguments to find a Payer
     * @example
     * // Get one Payer
     * const payer = await prisma.payer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PayerFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PayerFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Payer'> extends True ? CheckSelect<T, Prisma__PayerClient<Payer>, Prisma__PayerClient<PayerGetPayload<T>>> : CheckSelect<T, Prisma__PayerClient<Payer | null >, Prisma__PayerClient<PayerGetPayload<T> | null >>

    /**
     * Find zero or more Payers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payers
     * const payers = await prisma.payer.findMany()
     * 
     * // Get first 10 Payers
     * const payers = await prisma.payer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payerWithIdOnly = await prisma.payer.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PayerFindManyArgs>(
      args?: SelectSubset<T, PayerFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Payer>>, PrismaPromise<Array<PayerGetPayload<T>>>>

    /**
     * Create a Payer.
     * @param {PayerCreateArgs} args - Arguments to create a Payer.
     * @example
     * // Create one Payer
     * const Payer = await prisma.payer.create({
     *   data: {
     *     // ... data to create a Payer
     *   }
     * })
     * 
    **/
    create<T extends PayerCreateArgs>(
      args: SelectSubset<T, PayerCreateArgs>
    ): CheckSelect<T, Prisma__PayerClient<Payer>, Prisma__PayerClient<PayerGetPayload<T>>>

    /**
     * Create many Payers.
     *     @param {PayerCreateManyArgs} args - Arguments to create many Payers.
     *     @example
     *     // Create many Payers
     *     const payer = await prisma.payer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PayerCreateManyArgs>(
      args?: SelectSubset<T, PayerCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Payer.
     * @param {PayerDeleteArgs} args - Arguments to delete one Payer.
     * @example
     * // Delete one Payer
     * const Payer = await prisma.payer.delete({
     *   where: {
     *     // ... filter to delete one Payer
     *   }
     * })
     * 
    **/
    delete<T extends PayerDeleteArgs>(
      args: SelectSubset<T, PayerDeleteArgs>
    ): CheckSelect<T, Prisma__PayerClient<Payer>, Prisma__PayerClient<PayerGetPayload<T>>>

    /**
     * Update one Payer.
     * @param {PayerUpdateArgs} args - Arguments to update one Payer.
     * @example
     * // Update one Payer
     * const payer = await prisma.payer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PayerUpdateArgs>(
      args: SelectSubset<T, PayerUpdateArgs>
    ): CheckSelect<T, Prisma__PayerClient<Payer>, Prisma__PayerClient<PayerGetPayload<T>>>

    /**
     * Delete zero or more Payers.
     * @param {PayerDeleteManyArgs} args - Arguments to filter Payers to delete.
     * @example
     * // Delete a few Payers
     * const { count } = await prisma.payer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PayerDeleteManyArgs>(
      args?: SelectSubset<T, PayerDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payers
     * const payer = await prisma.payer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PayerUpdateManyArgs>(
      args: SelectSubset<T, PayerUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Payer.
     * @param {PayerUpsertArgs} args - Arguments to update or create a Payer.
     * @example
     * // Update or create a Payer
     * const payer = await prisma.payer.upsert({
     *   create: {
     *     // ... data to create a Payer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payer we want to update
     *   }
     * })
    **/
    upsert<T extends PayerUpsertArgs>(
      args: SelectSubset<T, PayerUpsertArgs>
    ): CheckSelect<T, Prisma__PayerClient<Payer>, Prisma__PayerClient<PayerGetPayload<T>>>

    /**
     * Count the number of Payers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerCountArgs} args - Arguments to filter Payers to count.
     * @example
     * // Count the number of Payers
     * const count = await prisma.payer.count({
     *   where: {
     *     // ... the filter for the Payers we want to count
     *   }
     * })
    **/
    count<T extends PayerCountArgs>(
      args?: Subset<T, PayerCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PayerAggregateArgs>(args: Subset<T, PayerAggregateArgs>): PrismaPromise<GetPayerAggregateType<T>>

    /**
     * Group by Payer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayerGroupByArgs['orderBy'] }
        : { orderBy?: PayerGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayerGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PayerClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    transactions<T extends TransactionFindManyArgs = {}>(args?: Subset<T, TransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Transaction>>, PrismaPromise<Array<TransactionGetPayload<T>>>>;

    recurringTransactions<T extends RecurringTransactionFindManyArgs = {}>(args?: Subset<T, RecurringTransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<RecurringTransaction>>, PrismaPromise<Array<RecurringTransactionGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Payer findUnique
   */
  export type PayerFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Payer
    **/
    select?: PayerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PayerInclude | null
    /**
     * Throw an Error if a Payer can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Payer to fetch.
    **/
    where: PayerWhereUniqueInput
  }


  /**
   * Payer findFirst
   */
  export type PayerFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Payer
    **/
    select?: PayerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PayerInclude | null
    /**
     * Throw an Error if a Payer can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Payer to fetch.
    **/
    where?: PayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payers to fetch.
    **/
    orderBy?: Enumerable<PayerOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payers.
    **/
    cursor?: PayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payers from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payers.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payers.
    **/
    distinct?: Enumerable<PayerScalarFieldEnum>
  }


  /**
   * Payer findMany
   */
  export type PayerFindManyArgs = {
    /**
     * Select specific fields to fetch from the Payer
    **/
    select?: PayerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PayerInclude | null
    /**
     * Filter, which Payers to fetch.
    **/
    where?: PayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payers to fetch.
    **/
    orderBy?: Enumerable<PayerOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payers.
    **/
    cursor?: PayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payers from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payers.
    **/
    skip?: number
    distinct?: Enumerable<PayerScalarFieldEnum>
  }


  /**
   * Payer create
   */
  export type PayerCreateArgs = {
    /**
     * Select specific fields to fetch from the Payer
    **/
    select?: PayerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PayerInclude | null
    /**
     * The data needed to create a Payer.
    **/
    data: XOR<PayerCreateInput, PayerUncheckedCreateInput>
  }


  /**
   * Payer createMany
   */
  export type PayerCreateManyArgs = {
    data: Enumerable<PayerCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Payer update
   */
  export type PayerUpdateArgs = {
    /**
     * Select specific fields to fetch from the Payer
    **/
    select?: PayerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PayerInclude | null
    /**
     * The data needed to update a Payer.
    **/
    data: XOR<PayerUpdateInput, PayerUncheckedUpdateInput>
    /**
     * Choose, which Payer to update.
    **/
    where: PayerWhereUniqueInput
  }


  /**
   * Payer updateMany
   */
  export type PayerUpdateManyArgs = {
    data: XOR<PayerUpdateManyMutationInput, PayerUncheckedUpdateManyInput>
    where?: PayerWhereInput
  }


  /**
   * Payer upsert
   */
  export type PayerUpsertArgs = {
    /**
     * Select specific fields to fetch from the Payer
    **/
    select?: PayerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PayerInclude | null
    /**
     * The filter to search for the Payer to update in case it exists.
    **/
    where: PayerWhereUniqueInput
    /**
     * In case the Payer found by the `where` argument doesn't exist, create a new Payer with this data.
    **/
    create: XOR<PayerCreateInput, PayerUncheckedCreateInput>
    /**
     * In case the Payer was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<PayerUpdateInput, PayerUncheckedUpdateInput>
  }


  /**
   * Payer delete
   */
  export type PayerDeleteArgs = {
    /**
     * Select specific fields to fetch from the Payer
    **/
    select?: PayerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PayerInclude | null
    /**
     * Filter which Payer to delete.
    **/
    where: PayerWhereUniqueInput
  }


  /**
   * Payer deleteMany
   */
  export type PayerDeleteManyArgs = {
    where?: PayerWhereInput
  }


  /**
   * Payer without action
   */
  export type PayerArgs = {
    /**
     * Select specific fields to fetch from the Payer
    **/
    select?: PayerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PayerInclude | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    count: UserCountAggregateOutputType | null
    avg: UserAvgAggregateOutputType | null
    sum: UserSumAggregateOutputType | null
    min: UserMinAggregateOutputType | null
    max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number
  }

  export type UserSumAggregateOutputType = {
    id: number
  }

  export type UserMinAggregateOutputType = {
    id: number
    email: string | null
    passwordHash: string | null
    passwordSalt: string | null
    firstName: string | null
    lastName: string | null
    verificationToken: string | null
    activationStatus: ActivationStatus | null
  }

  export type UserMaxAggregateOutputType = {
    id: number
    email: string | null
    passwordHash: string | null
    passwordSalt: string | null
    firstName: string | null
    lastName: string | null
    verificationToken: string | null
    activationStatus: ActivationStatus | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number | null
    passwordHash: number | null
    passwordSalt: number | null
    firstName: number | null
    lastName: number | null
    verificationToken: number | null
    activationStatus: number | null
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    passwordSalt?: true
    firstName?: true
    lastName?: true
    verificationToken?: true
    activationStatus?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    passwordSalt?: true
    firstName?: true
    lastName?: true
    verificationToken?: true
    activationStatus?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    passwordSalt?: true
    firstName?: true
    lastName?: true
    verificationToken?: true
    activationStatus?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }


    
    
  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: UserCountAggregateInputType | true
    avg?: UserAvgAggregateInputType
    sum?: UserSumAggregateInputType
    min?: UserMinAggregateInputType
    max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken: string | null
    activationStatus: ActivationStatus
    count: UserCountAggregateOutputType | null
    avg: UserAvgAggregateOutputType | null
    sum: UserSumAggregateOutputType | null
    min: UserMinAggregateOutputType | null
    max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Promise<Array<
    PickArray<UserGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof UserGroupByOutputType))]: GetScalarType<T[P], UserGroupByOutputType[P]>
    }
  >>
    

  export type UserSelect = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    passwordSalt?: boolean
    firstName?: boolean
    lastName?: boolean
    verificationToken?: boolean
    activationStatus?: boolean
    budgets?: boolean | BudgetFindManyArgs
    payers?: boolean | PayerFindManyArgs
    outcomeCategories?: boolean | OutcomeCategoryFindManyArgs
    incomeCategories?: boolean | IncomeCategoryFindManyArgs
    categories?: boolean | CategoryFindManyArgs
    currencies?: boolean | CurrencyFindManyArgs
  }

  export type UserInclude = {
    budgets?: boolean | BudgetFindManyArgs
    payers?: boolean | PayerFindManyArgs
    outcomeCategories?: boolean | OutcomeCategoryFindManyArgs
    incomeCategories?: boolean | IncomeCategoryFindManyArgs
    categories?: boolean | CategoryFindManyArgs
    currencies?: boolean | CurrencyFindManyArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'budgets'
        ? Array < BudgetGetPayload<S['include'][P]>>  :
        P extends 'payers'
        ? Array < PayerGetPayload<S['include'][P]>>  :
        P extends 'outcomeCategories'
        ? Array < OutcomeCategoryGetPayload<S['include'][P]>>  :
        P extends 'incomeCategories'
        ? Array < IncomeCategoryGetPayload<S['include'][P]>>  :
        P extends 'categories'
        ? Array < CategoryGetPayload<S['include'][P]>>  :
        P extends 'currencies'
        ? Array < CurrencyGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof User ?User [P]
  : 
          P extends 'budgets'
        ? Array < BudgetGetPayload<S['select'][P]>>  :
        P extends 'payers'
        ? Array < PayerGetPayload<S['select'][P]>>  :
        P extends 'outcomeCategories'
        ? Array < OutcomeCategoryGetPayload<S['select'][P]>>  :
        P extends 'incomeCategories'
        ? Array < IncomeCategoryGetPayload<S['select'][P]>>  :
        P extends 'categories'
        ? Array < CategoryGetPayload<S['select'][P]>>  :
        P extends 'currencies'
        ? Array < CurrencyGetPayload<S['select'][P]>>  : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    budgets<T extends BudgetFindManyArgs = {}>(args?: Subset<T, BudgetFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Budget>>, PrismaPromise<Array<BudgetGetPayload<T>>>>;

    payers<T extends PayerFindManyArgs = {}>(args?: Subset<T, PayerFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Payer>>, PrismaPromise<Array<PayerGetPayload<T>>>>;

    outcomeCategories<T extends OutcomeCategoryFindManyArgs = {}>(args?: Subset<T, OutcomeCategoryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<OutcomeCategory>>, PrismaPromise<Array<OutcomeCategoryGetPayload<T>>>>;

    incomeCategories<T extends IncomeCategoryFindManyArgs = {}>(args?: Subset<T, IncomeCategoryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<IncomeCategory>>, PrismaPromise<Array<IncomeCategoryGetPayload<T>>>>;

    categories<T extends CategoryFindManyArgs = {}>(args?: Subset<T, CategoryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Category>>, PrismaPromise<Array<CategoryGetPayload<T>>>>;

    currencies<T extends CurrencyFindManyArgs = {}>(args?: Subset<T, CurrencyFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Currency>>, PrismaPromise<Array<CurrencyGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    where?: UserWhereInput
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const BudgetScalarFieldEnum: {
    id: 'id',
    value: 'value',
    currentValue: 'currentValue',
    name: 'name',
    isDeleted: 'isDeleted',
    type: 'type',
    validMonth: 'validMonth',
    userId: 'userId'
  };

  export type BudgetScalarFieldEnum = (typeof BudgetScalarFieldEnum)[keyof typeof BudgetScalarFieldEnum]


  export const IncomeCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    icon: 'icon',
    isDeleted: 'isDeleted',
    userId: 'userId'
  };

  export type IncomeCategoryScalarFieldEnum = (typeof IncomeCategoryScalarFieldEnum)[keyof typeof IncomeCategoryScalarFieldEnum]


  export const OutcomeCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    icon: 'icon',
    isDeleted: 'isDeleted',
    userId: 'userId'
  };

  export type OutcomeCategoryScalarFieldEnum = (typeof OutcomeCategoryScalarFieldEnum)[keyof typeof OutcomeCategoryScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    icon: 'icon',
    isDeleted: 'isDeleted',
    userId: 'userId'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const SubcategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    icon: 'icon',
    isDeleted: 'isDeleted',
    categoryId: 'categoryId'
  };

  export type SubcategoryScalarFieldEnum = (typeof SubcategoryScalarFieldEnum)[keyof typeof SubcategoryScalarFieldEnum]


  export const CurrencyScalarFieldEnum: {
    id: 'id',
    code: 'code',
    exchangeRate: 'exchangeRate',
    isDeleted: 'isDeleted',
    userId: 'userId'
  };

  export type CurrencyScalarFieldEnum = (typeof CurrencyScalarFieldEnum)[keyof typeof CurrencyScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    date: 'date',
    note: 'note',
    amount: 'amount',
    isDeleted: 'isDeleted',
    payerId: 'payerId',
    currencyCode: 'currencyCode',
    exchangeRate: 'exchangeRate',
    currencyId: 'currencyId',
    budgetId: 'budgetId',
    categoryId: 'categoryId',
    subcategoryId: 'subcategoryId',
    outcomeCategoryId: 'outcomeCategoryId',
    incomeCategoryId: 'incomeCategoryId'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const RecurringTransactionScalarFieldEnum: {
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
  };

  export type RecurringTransactionScalarFieldEnum = (typeof RecurringTransactionScalarFieldEnum)[keyof typeof RecurringTransactionScalarFieldEnum]


  export const TransactionsOnBudgetsScalarFieldEnum: {
    budgetId: 'budgetId',
    transactionId: 'transactionId',
    createdAt: 'createdAt'
  };

  export type TransactionsOnBudgetsScalarFieldEnum = (typeof TransactionsOnBudgetsScalarFieldEnum)[keyof typeof TransactionsOnBudgetsScalarFieldEnum]


  export const PayerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    isDeleted: 'isDeleted',
    userId: 'userId'
  };

  export type PayerScalarFieldEnum = (typeof PayerScalarFieldEnum)[keyof typeof PayerScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    passwordSalt: 'passwordSalt',
    firstName: 'firstName',
    lastName: 'lastName',
    verificationToken: 'verificationToken',
    activationStatus: 'activationStatus'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type BudgetWhereInput = {
    AND?: Enumerable<BudgetWhereInput>
    OR?: Enumerable<BudgetWhereInput>
    NOT?: Enumerable<BudgetWhereInput>
    id?: IntFilter | number
    value?: DecimalFilter | Decimal | number | string
    currentValue?: DecimalFilter | Decimal | number | string
    name?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    type?: EnumBudgetTypeFilter | BudgetType
    validMonth?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    transactions?: TransactionListRelationFilter
    recurringTransactions?: TransactionsOnBudgetsListRelationFilter
  }

  export type BudgetOrderByInput = {
    id?: SortOrder
    value?: SortOrder
    currentValue?: SortOrder
    name?: SortOrder
    isDeleted?: SortOrder
    type?: SortOrder
    validMonth?: SortOrder
    userId?: SortOrder
  }

  export type BudgetWhereUniqueInput = {
    id?: number
  }

  export type BudgetScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BudgetScalarWhereWithAggregatesInput>
    OR?: Enumerable<BudgetScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BudgetScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    value?: DecimalWithAggregatesFilter | Decimal | number | string
    currentValue?: DecimalWithAggregatesFilter | Decimal | number | string
    name?: StringWithAggregatesFilter | string
    isDeleted?: BoolWithAggregatesFilter | boolean
    type?: EnumBudgetTypeWithAggregatesFilter | BudgetType
    validMonth?: DateTimeWithAggregatesFilter | Date | string
    userId?: IntWithAggregatesFilter | number
  }

  export type IncomeCategoryWhereInput = {
    AND?: Enumerable<IncomeCategoryWhereInput>
    OR?: Enumerable<IncomeCategoryWhereInput>
    NOT?: Enumerable<IncomeCategoryWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    icon?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    transactions?: TransactionListRelationFilter
    recurringTransaction?: RecurringTransactionListRelationFilter
  }

  export type IncomeCategoryOrderByInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    isDeleted?: SortOrder
    userId?: SortOrder
  }

  export type IncomeCategoryWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type IncomeCategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<IncomeCategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<IncomeCategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<IncomeCategoryScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    icon?: StringWithAggregatesFilter | string
    isDeleted?: BoolWithAggregatesFilter | boolean
    userId?: IntWithAggregatesFilter | number
  }

  export type OutcomeCategoryWhereInput = {
    AND?: Enumerable<OutcomeCategoryWhereInput>
    OR?: Enumerable<OutcomeCategoryWhereInput>
    NOT?: Enumerable<OutcomeCategoryWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    icon?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    transactions?: TransactionListRelationFilter
    recurringTransaction?: RecurringTransactionListRelationFilter
  }

  export type OutcomeCategoryOrderByInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    isDeleted?: SortOrder
    userId?: SortOrder
  }

  export type OutcomeCategoryWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type OutcomeCategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<OutcomeCategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<OutcomeCategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<OutcomeCategoryScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    icon?: StringWithAggregatesFilter | string
    isDeleted?: BoolWithAggregatesFilter | boolean
    userId?: IntWithAggregatesFilter | number
  }

  export type CategoryWhereInput = {
    AND?: Enumerable<CategoryWhereInput>
    OR?: Enumerable<CategoryWhereInput>
    NOT?: Enumerable<CategoryWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    icon?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    transactions?: TransactionListRelationFilter
    recurringTransaction?: RecurringTransactionListRelationFilter
    subCategories?: SubcategoryListRelationFilter
  }

  export type CategoryOrderByInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    isDeleted?: SortOrder
    userId?: SortOrder
  }

  export type CategoryWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    icon?: StringWithAggregatesFilter | string
    isDeleted?: BoolWithAggregatesFilter | boolean
    userId?: IntWithAggregatesFilter | number
  }

  export type SubcategoryWhereInput = {
    AND?: Enumerable<SubcategoryWhereInput>
    OR?: Enumerable<SubcategoryWhereInput>
    NOT?: Enumerable<SubcategoryWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    icon?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    categoryId?: IntFilter | number
    transactions?: TransactionListRelationFilter
    recurringTransaction?: RecurringTransactionListRelationFilter
  }

  export type SubcategoryOrderByInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    isDeleted?: SortOrder
    categoryId?: SortOrder
  }

  export type SubcategoryWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type SubcategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SubcategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<SubcategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SubcategoryScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    icon?: StringWithAggregatesFilter | string
    isDeleted?: BoolWithAggregatesFilter | boolean
    categoryId?: IntWithAggregatesFilter | number
  }

  export type CurrencyWhereInput = {
    AND?: Enumerable<CurrencyWhereInput>
    OR?: Enumerable<CurrencyWhereInput>
    NOT?: Enumerable<CurrencyWhereInput>
    id?: IntFilter | number
    code?: StringFilter | string
    exchangeRate?: DecimalFilter | Decimal | number | string
    isDeleted?: BoolFilter | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    transactions?: TransactionListRelationFilter
    recurringTransaction?: RecurringTransactionListRelationFilter
  }

  export type CurrencyOrderByInput = {
    id?: SortOrder
    code?: SortOrder
    exchangeRate?: SortOrder
    isDeleted?: SortOrder
    userId?: SortOrder
  }

  export type CurrencyWhereUniqueInput = {
    id?: number
    code?: string
  }

  export type CurrencyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CurrencyScalarWhereWithAggregatesInput>
    OR?: Enumerable<CurrencyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CurrencyScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    code?: StringWithAggregatesFilter | string
    exchangeRate?: DecimalWithAggregatesFilter | Decimal | number | string
    isDeleted?: BoolWithAggregatesFilter | boolean
    userId?: IntWithAggregatesFilter | number
  }

  export type TransactionWhereInput = {
    AND?: Enumerable<TransactionWhereInput>
    OR?: Enumerable<TransactionWhereInput>
    NOT?: Enumerable<TransactionWhereInput>
    id?: IntFilter | number
    date?: DateTimeFilter | Date | string
    note?: StringFilter | string
    amount?: DecimalFilter | Decimal | number | string
    isDeleted?: BoolFilter | boolean
    payer?: XOR<PayerRelationFilter, PayerWhereInput>
    payerId?: IntFilter | number
    currencyCode?: StringNullableFilter | string | null
    exchangeRate?: DecimalNullableFilter | Decimal | number | string | null
    currency?: XOR<CurrencyRelationFilter, CurrencyWhereInput> | null
    currencyId?: IntNullableFilter | number | null
    payFrom?: XOR<BudgetRelationFilter, BudgetWhereInput>
    budgetId?: IntFilter | number
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    categoryId?: IntFilter | number
    subcategory?: XOR<SubcategoryRelationFilter, SubcategoryWhereInput> | null
    subcategoryId?: IntNullableFilter | number | null
    outcomeCategory?: XOR<OutcomeCategoryRelationFilter, OutcomeCategoryWhereInput> | null
    outcomeCategoryId?: IntNullableFilter | number | null
    incomeCategory?: XOR<IncomeCategoryRelationFilter, IncomeCategoryWhereInput> | null
    incomeCategoryId?: IntNullableFilter | number | null
  }

  export type TransactionOrderByInput = {
    id?: SortOrder
    date?: SortOrder
    note?: SortOrder
    amount?: SortOrder
    isDeleted?: SortOrder
    payerId?: SortOrder
    currencyCode?: SortOrder
    exchangeRate?: SortOrder
    currencyId?: SortOrder
    budgetId?: SortOrder
    categoryId?: SortOrder
    subcategoryId?: SortOrder
    outcomeCategoryId?: SortOrder
    incomeCategoryId?: SortOrder
  }

  export type TransactionWhereUniqueInput = {
    id?: number
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TransactionScalarWhereWithAggregatesInput>
    OR?: Enumerable<TransactionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TransactionScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    date?: DateTimeWithAggregatesFilter | Date | string
    note?: StringWithAggregatesFilter | string
    amount?: DecimalWithAggregatesFilter | Decimal | number | string
    isDeleted?: BoolWithAggregatesFilter | boolean
    payerId?: IntWithAggregatesFilter | number
    currencyCode?: StringNullableWithAggregatesFilter | string | null
    exchangeRate?: DecimalNullableWithAggregatesFilter | Decimal | number | string | null
    currencyId?: IntNullableWithAggregatesFilter | number | null
    budgetId?: IntWithAggregatesFilter | number
    categoryId?: IntWithAggregatesFilter | number
    subcategoryId?: IntNullableWithAggregatesFilter | number | null
    outcomeCategoryId?: IntNullableWithAggregatesFilter | number | null
    incomeCategoryId?: IntNullableWithAggregatesFilter | number | null
  }

  export type RecurringTransactionWhereInput = {
    AND?: Enumerable<RecurringTransactionWhereInput>
    OR?: Enumerable<RecurringTransactionWhereInput>
    NOT?: Enumerable<RecurringTransactionWhereInput>
    id?: IntFilter | number
    date?: DateTimeFilter | Date | string
    note?: StringFilter | string
    amount?: DecimalFilter | Decimal | number | string
    dayOfPayment?: DateTimeFilter | Date | string
    activationDate?: DateTimeFilter | Date | string
    isDeleted?: BoolFilter | boolean
    payer?: XOR<PayerRelationFilter, PayerWhereInput>
    payerId?: IntFilter | number
    currency?: XOR<CurrencyRelationFilter, CurrencyWhereInput> | null
    currencyId?: IntNullableFilter | number | null
    budgets?: TransactionsOnBudgetsListRelationFilter
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    categoryId?: IntFilter | number
    subcategory?: XOR<SubcategoryRelationFilter, SubcategoryWhereInput> | null
    subcategoryId?: IntNullableFilter | number | null
    outcomeCategory?: XOR<OutcomeCategoryRelationFilter, OutcomeCategoryWhereInput> | null
    outcomeCategoryId?: IntNullableFilter | number | null
    incomeCategory?: XOR<IncomeCategoryRelationFilter, IncomeCategoryWhereInput> | null
    incomeCategoryId?: IntNullableFilter | number | null
  }

  export type RecurringTransactionOrderByInput = {
    id?: SortOrder
    date?: SortOrder
    note?: SortOrder
    amount?: SortOrder
    dayOfPayment?: SortOrder
    activationDate?: SortOrder
    isDeleted?: SortOrder
    payerId?: SortOrder
    currencyId?: SortOrder
    categoryId?: SortOrder
    subcategoryId?: SortOrder
    outcomeCategoryId?: SortOrder
    incomeCategoryId?: SortOrder
  }

  export type RecurringTransactionWhereUniqueInput = {
    id?: number
  }

  export type RecurringTransactionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<RecurringTransactionScalarWhereWithAggregatesInput>
    OR?: Enumerable<RecurringTransactionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<RecurringTransactionScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    date?: DateTimeWithAggregatesFilter | Date | string
    note?: StringWithAggregatesFilter | string
    amount?: DecimalWithAggregatesFilter | Decimal | number | string
    dayOfPayment?: DateTimeWithAggregatesFilter | Date | string
    activationDate?: DateTimeWithAggregatesFilter | Date | string
    isDeleted?: BoolWithAggregatesFilter | boolean
    payerId?: IntWithAggregatesFilter | number
    currencyId?: IntNullableWithAggregatesFilter | number | null
    categoryId?: IntWithAggregatesFilter | number
    subcategoryId?: IntNullableWithAggregatesFilter | number | null
    outcomeCategoryId?: IntNullableWithAggregatesFilter | number | null
    incomeCategoryId?: IntNullableWithAggregatesFilter | number | null
  }

  export type TransactionsOnBudgetsWhereInput = {
    AND?: Enumerable<TransactionsOnBudgetsWhereInput>
    OR?: Enumerable<TransactionsOnBudgetsWhereInput>
    NOT?: Enumerable<TransactionsOnBudgetsWhereInput>
    budget?: XOR<BudgetRelationFilter, BudgetWhereInput>
    budgetId?: IntFilter | number
    transaction?: XOR<RecurringTransactionRelationFilter, RecurringTransactionWhereInput>
    transactionId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
  }

  export type TransactionsOnBudgetsOrderByInput = {
    budgetId?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionsOnBudgetsWhereUniqueInput = {
    budgetId_transactionId?: TransactionsOnBudgetsBudgetIdTransactionIdCompoundUniqueInput
  }

  export type TransactionsOnBudgetsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TransactionsOnBudgetsScalarWhereWithAggregatesInput>
    OR?: Enumerable<TransactionsOnBudgetsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TransactionsOnBudgetsScalarWhereWithAggregatesInput>
    budgetId?: IntWithAggregatesFilter | number
    transactionId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type PayerWhereInput = {
    AND?: Enumerable<PayerWhereInput>
    OR?: Enumerable<PayerWhereInput>
    NOT?: Enumerable<PayerWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    transactions?: TransactionListRelationFilter
    recurringTransactions?: RecurringTransactionListRelationFilter
  }

  export type PayerOrderByInput = {
    id?: SortOrder
    name?: SortOrder
    isDeleted?: SortOrder
    userId?: SortOrder
  }

  export type PayerWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type PayerScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PayerScalarWhereWithAggregatesInput>
    OR?: Enumerable<PayerScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PayerScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    isDeleted?: BoolWithAggregatesFilter | boolean
    userId?: IntWithAggregatesFilter | number
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    email?: StringFilter | string
    passwordHash?: StringFilter | string
    passwordSalt?: StringFilter | string
    firstName?: StringFilter | string
    lastName?: StringFilter | string
    verificationToken?: StringNullableFilter | string | null
    activationStatus?: EnumActivationStatusFilter | ActivationStatus
    budgets?: BudgetListRelationFilter
    payers?: PayerListRelationFilter
    outcomeCategories?: OutcomeCategoryListRelationFilter
    incomeCategories?: IncomeCategoryListRelationFilter
    categories?: CategoryListRelationFilter
    currencies?: CurrencyListRelationFilter
  }

  export type UserOrderByInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    passwordSalt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    verificationToken?: SortOrder
    activationStatus?: SortOrder
  }

  export type UserWhereUniqueInput = {
    id?: number
    email?: string
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    email?: StringWithAggregatesFilter | string
    passwordHash?: StringWithAggregatesFilter | string
    passwordSalt?: StringWithAggregatesFilter | string
    firstName?: StringWithAggregatesFilter | string
    lastName?: StringWithAggregatesFilter | string
    verificationToken?: StringNullableWithAggregatesFilter | string | null
    activationStatus?: EnumActivationStatusWithAggregatesFilter | ActivationStatus
  }

  export type BudgetCreateInput = {
    value: Decimal | number | string
    currentValue: Decimal | number | string
    name: string
    isDeleted?: boolean
    type: BudgetType
    validMonth: Date | string
    user: UserCreateNestedOneWithoutBudgetsInput
    transactions?: TransactionCreateNestedManyWithoutPayFromInput
    recurringTransactions?: TransactionsOnBudgetsCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUncheckedCreateInput = {
    id?: number
    value: Decimal | number | string
    currentValue: Decimal | number | string
    name: string
    isDeleted?: boolean
    type: BudgetType
    validMonth: Date | string
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutPayFromInput
    recurringTransactions?: TransactionsOnBudgetsUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUpdateInput = {
    value?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    currentValue?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumBudgetTypeFieldUpdateOperationsInput | BudgetType
    validMonth?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBudgetsInput
    transactions?: TransactionUpdateManyWithoutPayFromInput
    recurringTransactions?: TransactionsOnBudgetsUpdateManyWithoutBudgetInput
  }

  export type BudgetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    currentValue?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumBudgetTypeFieldUpdateOperationsInput | BudgetType
    validMonth?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutPayFromInput
    recurringTransactions?: TransactionsOnBudgetsUncheckedUpdateManyWithoutBudgetInput
  }

  export type BudgetCreateManyInput = {
    id?: number
    value: Decimal | number | string
    currentValue: Decimal | number | string
    name: string
    isDeleted?: boolean
    type: BudgetType
    validMonth: Date | string
    userId: number
  }

  export type BudgetUpdateManyMutationInput = {
    value?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    currentValue?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumBudgetTypeFieldUpdateOperationsInput | BudgetType
    validMonth?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    currentValue?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumBudgetTypeFieldUpdateOperationsInput | BudgetType
    validMonth?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type IncomeCategoryCreateInput = {
    name: string
    icon: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutIncomeCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutIncomeCategoryInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryUncheckedCreateInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutIncomeCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutIncomeCategoriesInput
    transactions?: TransactionUpdateManyWithoutIncomeCategoryInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutIncomeCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryCreateManyInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
  }

  export type IncomeCategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IncomeCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type OutcomeCategoryCreateInput = {
    name: string
    icon: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutOutcomeCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutOutcomeCategoryInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryUncheckedCreateInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutOutcomeCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutOutcomeCategoriesInput
    transactions?: TransactionUpdateManyWithoutOutcomeCategoryInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutOutcomeCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryCreateManyInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
  }

  export type OutcomeCategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OutcomeCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryCreateInput = {
    name: string
    icon: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutCategoryInput
    subCategories?: SubcategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutCategoryInput
    subCategories?: SubcategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutCategoriesInput
    transactions?: TransactionUpdateManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutCategoryInput
    subCategories?: SubcategoryUpdateManyWithoutCategoryInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutCategoryInput
    subCategories?: SubcategoryUncheckedUpdateManyWithoutCategoryInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type SubcategoryCreateInput = {
    name: string
    icon: string
    isDeleted?: boolean
    category: CategoryCreateNestedOneWithoutSubCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutSubcategoryInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedCreateInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    categoryId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutSubcategoryInput
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    category?: CategoryUpdateOneRequiredWithoutSubCategoriesInput
    transactions?: TransactionUpdateManyWithoutSubcategoryInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutSubcategoryInput
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutSubcategoryInput
  }

  export type SubcategoryCreateManyInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    categoryId: number
  }

  export type SubcategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubcategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: IntFieldUpdateOperationsInput | number
  }

  export type CurrencyCreateInput = {
    code: string
    exchangeRate: Decimal | number | string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutCurrenciesInput
    transactions?: TransactionCreateNestedManyWithoutCurrencyInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutCurrencyInput
  }

  export type CurrencyUncheckedCreateInput = {
    id?: number
    code: string
    exchangeRate: Decimal | number | string
    isDeleted?: boolean
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutCurrencyInput
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutCurrencyInput
  }

  export type CurrencyUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    exchangeRate?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutCurrenciesInput
    transactions?: TransactionUpdateManyWithoutCurrencyInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutCurrencyInput
  }

  export type CurrencyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    exchangeRate?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutCurrencyInput
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutCurrencyInput
  }

  export type CurrencyCreateManyInput = {
    id?: number
    code: string
    exchangeRate: Decimal | number | string
    isDeleted?: boolean
    userId: number
  }

  export type CurrencyUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    exchangeRate?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CurrencyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    exchangeRate?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TransactionCreateInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    payer: PayerCreateNestedOneWithoutTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutTransactionsInput
    payFrom: BudgetCreateNestedOneWithoutTransactionsInput
    category: CategoryCreateNestedOneWithoutTransactionsInput
    subcategory?: SubcategoryCreateNestedOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    payer?: PayerUpdateOneRequiredWithoutTransactionsInput
    currency?: CurrencyUpdateOneWithoutTransactionsInput
    payFrom?: BudgetUpdateOneRequiredWithoutTransactionsInput
    category?: CategoryUpdateOneRequiredWithoutTransactionsInput
    subcategory?: SubcategoryUpdateOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutTransactionsInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    budgetId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TransactionCreateManyInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    budgetId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RecurringTransactionCreateInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payer: PayerCreateNestedOneWithoutRecurringTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsCreateNestedManyWithoutTransactionInput
    category: CategoryCreateNestedOneWithoutRecurringTransactionInput
    subcategory?: SubcategoryCreateNestedOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedCreateInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    currencyId?: number | null
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
    budgets?: TransactionsOnBudgetsUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type RecurringTransactionUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payer?: PayerUpdateOneRequiredWithoutRecurringTransactionsInput
    currency?: CurrencyUpdateOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsUpdateManyWithoutTransactionInput
    category?: CategoryUpdateOneRequiredWithoutRecurringTransactionInput
    subcategory?: SubcategoryUpdateOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: TransactionsOnBudgetsUncheckedUpdateManyWithoutTransactionInput
  }

  export type RecurringTransactionCreateManyInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    currencyId?: number | null
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type RecurringTransactionUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RecurringTransactionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TransactionsOnBudgetsCreateInput = {
    createdAt?: Date | string
    budget: BudgetCreateNestedOneWithoutRecurringTransactionsInput
    transaction: RecurringTransactionCreateNestedOneWithoutBudgetsInput
  }

  export type TransactionsOnBudgetsUncheckedCreateInput = {
    budgetId: number
    transactionId: number
    createdAt?: Date | string
  }

  export type TransactionsOnBudgetsUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: BudgetUpdateOneRequiredWithoutRecurringTransactionsInput
    transaction?: RecurringTransactionUpdateOneRequiredWithoutBudgetsInput
  }

  export type TransactionsOnBudgetsUncheckedUpdateInput = {
    budgetId?: IntFieldUpdateOperationsInput | number
    transactionId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionsOnBudgetsCreateManyInput = {
    budgetId: number
    transactionId: number
    createdAt?: Date | string
  }

  export type TransactionsOnBudgetsUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionsOnBudgetsUncheckedUpdateManyInput = {
    budgetId?: IntFieldUpdateOperationsInput | number
    transactionId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayerCreateInput = {
    name: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutPayersInput
    transactions?: TransactionCreateNestedManyWithoutPayerInput
    recurringTransactions?: RecurringTransactionCreateNestedManyWithoutPayerInput
  }

  export type PayerUncheckedCreateInput = {
    id?: number
    name: string
    isDeleted?: boolean
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutPayerInput
    recurringTransactions?: RecurringTransactionUncheckedCreateNestedManyWithoutPayerInput
  }

  export type PayerUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutPayersInput
    transactions?: TransactionUpdateManyWithoutPayerInput
    recurringTransactions?: RecurringTransactionUpdateManyWithoutPayerInput
  }

  export type PayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutPayerInput
    recurringTransactions?: RecurringTransactionUncheckedUpdateManyWithoutPayerInput
  }

  export type PayerCreateManyInput = {
    id?: number
    name: string
    isDeleted?: boolean
    userId: number
  }

  export type PayerUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetCreateNestedManyWithoutUserInput
    payers?: PayerCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryCreateNestedManyWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
    currencies?: CurrencyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    payers?: PayerUncheckedCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedCreateNestedManyWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    currencies?: CurrencyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUpdateManyWithoutUserInput
    payers?: PayerUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUpdateManyWithoutUserInput
    categories?: CategoryUpdateManyWithoutUserInput
    currencies?: CurrencyUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUncheckedUpdateManyWithoutUserInput
    payers?: PayerUncheckedUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedUpdateManyWithoutUserInput
    categories?: CategoryUncheckedUpdateManyWithoutUserInput
    currencies?: CurrencyUncheckedUpdateManyWithoutUserInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type DecimalFilter = {
    equals?: Decimal | number | string
    in?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | number | string
    lte?: Decimal | number | string
    gt?: Decimal | number | string
    gte?: Decimal | number | string
    not?: NestedDecimalFilter | Decimal | number | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type EnumBudgetTypeFilter = {
    equals?: BudgetType
    in?: Enumerable<BudgetType>
    notIn?: Enumerable<BudgetType>
    not?: NestedEnumBudgetTypeFilter | BudgetType
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type TransactionsOnBudgetsListRelationFilter = {
    every?: TransactionsOnBudgetsWhereInput
    some?: TransactionsOnBudgetsWhereInput
    none?: TransactionsOnBudgetsWhereInput
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    count?: NestedIntFilter
    avg?: NestedFloatFilter
    sum?: NestedIntFilter
    min?: NestedIntFilter
    max?: NestedIntFilter
  }

  export type DecimalWithAggregatesFilter = {
    equals?: Decimal | number | string
    in?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | number | string
    lte?: Decimal | number | string
    gt?: Decimal | number | string
    gte?: Decimal | number | string
    not?: NestedDecimalWithAggregatesFilter | Decimal | number | string
    count?: NestedIntFilter
    avg?: NestedDecimalFilter
    sum?: NestedDecimalFilter
    min?: NestedDecimalFilter
    max?: NestedDecimalFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    count?: NestedIntFilter
    min?: NestedStringFilter
    max?: NestedStringFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    count?: NestedIntFilter
    min?: NestedBoolFilter
    max?: NestedBoolFilter
  }

  export type EnumBudgetTypeWithAggregatesFilter = {
    equals?: BudgetType
    in?: Enumerable<BudgetType>
    notIn?: Enumerable<BudgetType>
    not?: NestedEnumBudgetTypeWithAggregatesFilter | BudgetType
    count?: NestedIntFilter
    min?: NestedEnumBudgetTypeFilter
    max?: NestedEnumBudgetTypeFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    count?: NestedIntFilter
    min?: NestedDateTimeFilter
    max?: NestedDateTimeFilter
  }

  export type RecurringTransactionListRelationFilter = {
    every?: RecurringTransactionWhereInput
    some?: RecurringTransactionWhereInput
    none?: RecurringTransactionWhereInput
  }

  export type SubcategoryListRelationFilter = {
    every?: SubcategoryWhereInput
    some?: SubcategoryWhereInput
    none?: SubcategoryWhereInput
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type PayerRelationFilter = {
    is?: PayerWhereInput
    isNot?: PayerWhereInput
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type DecimalNullableFilter = {
    equals?: Decimal | number | string | null
    in?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | number | string
    lte?: Decimal | number | string
    gt?: Decimal | number | string
    gte?: Decimal | number | string
    not?: NestedDecimalNullableFilter | Decimal | number | string | null
  }

  export type CurrencyRelationFilter = {
    is?: CurrencyWhereInput | null
    isNot?: CurrencyWhereInput | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type BudgetRelationFilter = {
    is?: BudgetWhereInput
    isNot?: BudgetWhereInput
  }

  export type SubcategoryRelationFilter = {
    is?: SubcategoryWhereInput | null
    isNot?: SubcategoryWhereInput | null
  }

  export type OutcomeCategoryRelationFilter = {
    is?: OutcomeCategoryWhereInput | null
    isNot?: OutcomeCategoryWhereInput | null
  }

  export type IncomeCategoryRelationFilter = {
    is?: IncomeCategoryWhereInput | null
    isNot?: IncomeCategoryWhereInput | null
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    count?: NestedIntNullableFilter
    min?: NestedStringNullableFilter
    max?: NestedStringNullableFilter
  }

  export type DecimalNullableWithAggregatesFilter = {
    equals?: Decimal | number | string | null
    in?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | number | string
    lte?: Decimal | number | string
    gt?: Decimal | number | string
    gte?: Decimal | number | string
    not?: NestedDecimalNullableWithAggregatesFilter | Decimal | number | string | null
    count?: NestedIntNullableFilter
    avg?: NestedDecimalNullableFilter
    sum?: NestedDecimalNullableFilter
    min?: NestedDecimalNullableFilter
    max?: NestedDecimalNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    count?: NestedIntNullableFilter
    avg?: NestedFloatNullableFilter
    sum?: NestedIntNullableFilter
    min?: NestedIntNullableFilter
    max?: NestedIntNullableFilter
  }

  export type RecurringTransactionRelationFilter = {
    is?: RecurringTransactionWhereInput
    isNot?: RecurringTransactionWhereInput
  }

  export type TransactionsOnBudgetsBudgetIdTransactionIdCompoundUniqueInput = {
    budgetId: number
    transactionId: number
  }

  export type EnumActivationStatusFilter = {
    equals?: ActivationStatus
    in?: Enumerable<ActivationStatus>
    notIn?: Enumerable<ActivationStatus>
    not?: NestedEnumActivationStatusFilter | ActivationStatus
  }

  export type BudgetListRelationFilter = {
    every?: BudgetWhereInput
    some?: BudgetWhereInput
    none?: BudgetWhereInput
  }

  export type PayerListRelationFilter = {
    every?: PayerWhereInput
    some?: PayerWhereInput
    none?: PayerWhereInput
  }

  export type OutcomeCategoryListRelationFilter = {
    every?: OutcomeCategoryWhereInput
    some?: OutcomeCategoryWhereInput
    none?: OutcomeCategoryWhereInput
  }

  export type IncomeCategoryListRelationFilter = {
    every?: IncomeCategoryWhereInput
    some?: IncomeCategoryWhereInput
    none?: IncomeCategoryWhereInput
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type CurrencyListRelationFilter = {
    every?: CurrencyWhereInput
    some?: CurrencyWhereInput
    none?: CurrencyWhereInput
  }

  export type EnumActivationStatusWithAggregatesFilter = {
    equals?: ActivationStatus
    in?: Enumerable<ActivationStatus>
    notIn?: Enumerable<ActivationStatus>
    not?: NestedEnumActivationStatusWithAggregatesFilter | ActivationStatus
    count?: NestedIntFilter
    min?: NestedEnumActivationStatusFilter
    max?: NestedEnumActivationStatusFilter
  }

  export type UserCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBudgetsInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutPayFromInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutPayFromInput>, Enumerable<TransactionUncheckedCreateWithoutPayFromInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutPayFromInput>
    createMany?: TransactionCreateManyPayFromInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type TransactionsOnBudgetsCreateNestedManyWithoutBudgetInput = {
    create?: XOR<Enumerable<TransactionsOnBudgetsCreateWithoutBudgetInput>, Enumerable<TransactionsOnBudgetsUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<TransactionsOnBudgetsCreateOrConnectWithoutBudgetInput>
    createMany?: TransactionsOnBudgetsCreateManyBudgetInputEnvelope
    connect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
  }

  export type TransactionUncheckedCreateNestedManyWithoutPayFromInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutPayFromInput>, Enumerable<TransactionUncheckedCreateWithoutPayFromInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutPayFromInput>
    createMany?: TransactionCreateManyPayFromInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type TransactionsOnBudgetsUncheckedCreateNestedManyWithoutBudgetInput = {
    create?: XOR<Enumerable<TransactionsOnBudgetsCreateWithoutBudgetInput>, Enumerable<TransactionsOnBudgetsUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<TransactionsOnBudgetsCreateOrConnectWithoutBudgetInput>
    createMany?: TransactionsOnBudgetsCreateManyBudgetInputEnvelope
    connect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | number | string
    increment?: Decimal | number | string
    decrement?: Decimal | number | string
    multiply?: Decimal | number | string
    divide?: Decimal | number | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumBudgetTypeFieldUpdateOperationsInput = {
    set?: BudgetType
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutBudgetsInput = {
    create?: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBudgetsInput
    upsert?: UserUpsertWithoutBudgetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutBudgetsInput, UserUncheckedUpdateWithoutBudgetsInput>
  }

  export type TransactionUpdateManyWithoutPayFromInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutPayFromInput>, Enumerable<TransactionUncheckedCreateWithoutPayFromInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutPayFromInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutPayFromInput>
    createMany?: TransactionCreateManyPayFromInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutPayFromInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutPayFromInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type TransactionsOnBudgetsUpdateManyWithoutBudgetInput = {
    create?: XOR<Enumerable<TransactionsOnBudgetsCreateWithoutBudgetInput>, Enumerable<TransactionsOnBudgetsUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<TransactionsOnBudgetsCreateOrConnectWithoutBudgetInput>
    upsert?: Enumerable<TransactionsOnBudgetsUpsertWithWhereUniqueWithoutBudgetInput>
    createMany?: TransactionsOnBudgetsCreateManyBudgetInputEnvelope
    connect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    set?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    disconnect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    delete?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    update?: Enumerable<TransactionsOnBudgetsUpdateWithWhereUniqueWithoutBudgetInput>
    updateMany?: Enumerable<TransactionsOnBudgetsUpdateManyWithWhereWithoutBudgetInput>
    deleteMany?: Enumerable<TransactionsOnBudgetsScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TransactionUncheckedUpdateManyWithoutPayFromInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutPayFromInput>, Enumerable<TransactionUncheckedCreateWithoutPayFromInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutPayFromInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutPayFromInput>
    createMany?: TransactionCreateManyPayFromInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutPayFromInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutPayFromInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type TransactionsOnBudgetsUncheckedUpdateManyWithoutBudgetInput = {
    create?: XOR<Enumerable<TransactionsOnBudgetsCreateWithoutBudgetInput>, Enumerable<TransactionsOnBudgetsUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<TransactionsOnBudgetsCreateOrConnectWithoutBudgetInput>
    upsert?: Enumerable<TransactionsOnBudgetsUpsertWithWhereUniqueWithoutBudgetInput>
    createMany?: TransactionsOnBudgetsCreateManyBudgetInputEnvelope
    connect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    set?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    disconnect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    delete?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    update?: Enumerable<TransactionsOnBudgetsUpdateWithWhereUniqueWithoutBudgetInput>
    updateMany?: Enumerable<TransactionsOnBudgetsUpdateManyWithWhereWithoutBudgetInput>
    deleteMany?: Enumerable<TransactionsOnBudgetsScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutIncomeCategoriesInput = {
    create?: XOR<UserCreateWithoutIncomeCategoriesInput, UserUncheckedCreateWithoutIncomeCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIncomeCategoriesInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutIncomeCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutIncomeCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutIncomeCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutIncomeCategoryInput>
    createMany?: TransactionCreateManyIncomeCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionCreateNestedManyWithoutIncomeCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutIncomeCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutIncomeCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutIncomeCategoryInput>
    createMany?: RecurringTransactionCreateManyIncomeCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type TransactionUncheckedCreateNestedManyWithoutIncomeCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutIncomeCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutIncomeCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutIncomeCategoryInput>
    createMany?: TransactionCreateManyIncomeCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionUncheckedCreateNestedManyWithoutIncomeCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutIncomeCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutIncomeCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutIncomeCategoryInput>
    createMany?: RecurringTransactionCreateManyIncomeCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutIncomeCategoriesInput = {
    create?: XOR<UserCreateWithoutIncomeCategoriesInput, UserUncheckedCreateWithoutIncomeCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIncomeCategoriesInput
    upsert?: UserUpsertWithoutIncomeCategoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutIncomeCategoriesInput, UserUncheckedUpdateWithoutIncomeCategoriesInput>
  }

  export type TransactionUpdateManyWithoutIncomeCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutIncomeCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutIncomeCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutIncomeCategoryInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutIncomeCategoryInput>
    createMany?: TransactionCreateManyIncomeCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutIncomeCategoryInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutIncomeCategoryInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUpdateManyWithoutIncomeCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutIncomeCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutIncomeCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutIncomeCategoryInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutIncomeCategoryInput>
    createMany?: RecurringTransactionCreateManyIncomeCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutIncomeCategoryInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutIncomeCategoryInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type TransactionUncheckedUpdateManyWithoutIncomeCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutIncomeCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutIncomeCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutIncomeCategoryInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutIncomeCategoryInput>
    createMany?: TransactionCreateManyIncomeCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutIncomeCategoryInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutIncomeCategoryInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUncheckedUpdateManyWithoutIncomeCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutIncomeCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutIncomeCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutIncomeCategoryInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutIncomeCategoryInput>
    createMany?: RecurringTransactionCreateManyIncomeCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutIncomeCategoryInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutIncomeCategoryInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutOutcomeCategoriesInput = {
    create?: XOR<UserCreateWithoutOutcomeCategoriesInput, UserUncheckedCreateWithoutOutcomeCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOutcomeCategoriesInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutOutcomeCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutOutcomeCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutOutcomeCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutOutcomeCategoryInput>
    createMany?: TransactionCreateManyOutcomeCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionCreateNestedManyWithoutOutcomeCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutOutcomeCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutOutcomeCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutOutcomeCategoryInput>
    createMany?: RecurringTransactionCreateManyOutcomeCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type TransactionUncheckedCreateNestedManyWithoutOutcomeCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutOutcomeCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutOutcomeCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutOutcomeCategoryInput>
    createMany?: TransactionCreateManyOutcomeCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionUncheckedCreateNestedManyWithoutOutcomeCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutOutcomeCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutOutcomeCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutOutcomeCategoryInput>
    createMany?: RecurringTransactionCreateManyOutcomeCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutOutcomeCategoriesInput = {
    create?: XOR<UserCreateWithoutOutcomeCategoriesInput, UserUncheckedCreateWithoutOutcomeCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOutcomeCategoriesInput
    upsert?: UserUpsertWithoutOutcomeCategoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutOutcomeCategoriesInput, UserUncheckedUpdateWithoutOutcomeCategoriesInput>
  }

  export type TransactionUpdateManyWithoutOutcomeCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutOutcomeCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutOutcomeCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutOutcomeCategoryInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutOutcomeCategoryInput>
    createMany?: TransactionCreateManyOutcomeCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutOutcomeCategoryInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutOutcomeCategoryInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUpdateManyWithoutOutcomeCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutOutcomeCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutOutcomeCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutOutcomeCategoryInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutOutcomeCategoryInput>
    createMany?: RecurringTransactionCreateManyOutcomeCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutOutcomeCategoryInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutOutcomeCategoryInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type TransactionUncheckedUpdateManyWithoutOutcomeCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutOutcomeCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutOutcomeCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutOutcomeCategoryInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutOutcomeCategoryInput>
    createMany?: TransactionCreateManyOutcomeCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutOutcomeCategoryInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutOutcomeCategoryInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUncheckedUpdateManyWithoutOutcomeCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutOutcomeCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutOutcomeCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutOutcomeCategoryInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutOutcomeCategoryInput>
    createMany?: RecurringTransactionCreateManyOutcomeCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutOutcomeCategoryInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutOutcomeCategoryInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutCategoryInput>
    createMany?: TransactionCreateManyCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutCategoryInput>
    createMany?: RecurringTransactionCreateManyCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type SubcategoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<SubcategoryCreateWithoutCategoryInput>, Enumerable<SubcategoryUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<SubcategoryCreateOrConnectWithoutCategoryInput>
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    connect?: Enumerable<SubcategoryWhereUniqueInput>
  }

  export type TransactionUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutCategoryInput>
    createMany?: TransactionCreateManyCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutCategoryInput>
    createMany?: RecurringTransactionCreateManyCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type SubcategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<SubcategoryCreateWithoutCategoryInput>, Enumerable<SubcategoryUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<SubcategoryCreateOrConnectWithoutCategoryInput>
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    connect?: Enumerable<SubcategoryWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutCategoriesInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    upsert?: UserUpsertWithoutCategoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
  }

  export type TransactionUpdateManyWithoutCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: TransactionCreateManyCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUpdateManyWithoutCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: RecurringTransactionCreateManyCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type SubcategoryUpdateManyWithoutCategoryInput = {
    create?: XOR<Enumerable<SubcategoryCreateWithoutCategoryInput>, Enumerable<SubcategoryUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<SubcategoryCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<SubcategoryUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    connect?: Enumerable<SubcategoryWhereUniqueInput>
    set?: Enumerable<SubcategoryWhereUniqueInput>
    disconnect?: Enumerable<SubcategoryWhereUniqueInput>
    delete?: Enumerable<SubcategoryWhereUniqueInput>
    update?: Enumerable<SubcategoryUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<SubcategoryUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<SubcategoryScalarWhereInput>
  }

  export type TransactionUncheckedUpdateManyWithoutCategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutCategoryInput>, Enumerable<TransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: TransactionCreateManyCategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUncheckedUpdateManyWithoutCategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutCategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: RecurringTransactionCreateManyCategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type SubcategoryUncheckedUpdateManyWithoutCategoryInput = {
    create?: XOR<Enumerable<SubcategoryCreateWithoutCategoryInput>, Enumerable<SubcategoryUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<SubcategoryCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<SubcategoryUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    connect?: Enumerable<SubcategoryWhereUniqueInput>
    set?: Enumerable<SubcategoryWhereUniqueInput>
    disconnect?: Enumerable<SubcategoryWhereUniqueInput>
    delete?: Enumerable<SubcategoryWhereUniqueInput>
    update?: Enumerable<SubcategoryUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<SubcategoryUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<SubcategoryScalarWhereInput>
  }

  export type CategoryCreateNestedOneWithoutSubCategoriesInput = {
    create?: XOR<CategoryCreateWithoutSubCategoriesInput, CategoryUncheckedCreateWithoutSubCategoriesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutSubCategoriesInput
    connect?: CategoryWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutSubcategoryInput>, Enumerable<TransactionUncheckedCreateWithoutSubcategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutSubcategoryInput>
    createMany?: TransactionCreateManySubcategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutSubcategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutSubcategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutSubcategoryInput>
    createMany?: RecurringTransactionCreateManySubcategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type TransactionUncheckedCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutSubcategoryInput>, Enumerable<TransactionUncheckedCreateWithoutSubcategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutSubcategoryInput>
    createMany?: TransactionCreateManySubcategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionUncheckedCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutSubcategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutSubcategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutSubcategoryInput>
    createMany?: RecurringTransactionCreateManySubcategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type CategoryUpdateOneRequiredWithoutSubCategoriesInput = {
    create?: XOR<CategoryCreateWithoutSubCategoriesInput, CategoryUncheckedCreateWithoutSubCategoriesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutSubCategoriesInput
    upsert?: CategoryUpsertWithoutSubCategoriesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<CategoryUpdateWithoutSubCategoriesInput, CategoryUncheckedUpdateWithoutSubCategoriesInput>
  }

  export type TransactionUpdateManyWithoutSubcategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutSubcategoryInput>, Enumerable<TransactionUncheckedCreateWithoutSubcategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutSubcategoryInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutSubcategoryInput>
    createMany?: TransactionCreateManySubcategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutSubcategoryInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutSubcategoryInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUpdateManyWithoutSubcategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutSubcategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutSubcategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutSubcategoryInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutSubcategoryInput>
    createMany?: RecurringTransactionCreateManySubcategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutSubcategoryInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutSubcategoryInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type TransactionUncheckedUpdateManyWithoutSubcategoryInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutSubcategoryInput>, Enumerable<TransactionUncheckedCreateWithoutSubcategoryInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutSubcategoryInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutSubcategoryInput>
    createMany?: TransactionCreateManySubcategoryInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutSubcategoryInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutSubcategoryInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUncheckedUpdateManyWithoutSubcategoryInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutSubcategoryInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutSubcategoryInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutSubcategoryInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutSubcategoryInput>
    createMany?: RecurringTransactionCreateManySubcategoryInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutSubcategoryInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutSubcategoryInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutCurrenciesInput = {
    create?: XOR<UserCreateWithoutCurrenciesInput, UserUncheckedCreateWithoutCurrenciesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCurrenciesInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutCurrencyInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutCurrencyInput>, Enumerable<TransactionUncheckedCreateWithoutCurrencyInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutCurrencyInput>
    createMany?: TransactionCreateManyCurrencyInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionCreateNestedManyWithoutCurrencyInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutCurrencyInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutCurrencyInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutCurrencyInput>
    createMany?: RecurringTransactionCreateManyCurrencyInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type TransactionUncheckedCreateNestedManyWithoutCurrencyInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutCurrencyInput>, Enumerable<TransactionUncheckedCreateWithoutCurrencyInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutCurrencyInput>
    createMany?: TransactionCreateManyCurrencyInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionUncheckedCreateNestedManyWithoutCurrencyInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutCurrencyInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutCurrencyInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutCurrencyInput>
    createMany?: RecurringTransactionCreateManyCurrencyInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutCurrenciesInput = {
    create?: XOR<UserCreateWithoutCurrenciesInput, UserUncheckedCreateWithoutCurrenciesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCurrenciesInput
    upsert?: UserUpsertWithoutCurrenciesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutCurrenciesInput, UserUncheckedUpdateWithoutCurrenciesInput>
  }

  export type TransactionUpdateManyWithoutCurrencyInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutCurrencyInput>, Enumerable<TransactionUncheckedCreateWithoutCurrencyInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutCurrencyInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutCurrencyInput>
    createMany?: TransactionCreateManyCurrencyInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutCurrencyInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutCurrencyInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUpdateManyWithoutCurrencyInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutCurrencyInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutCurrencyInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutCurrencyInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutCurrencyInput>
    createMany?: RecurringTransactionCreateManyCurrencyInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutCurrencyInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutCurrencyInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type TransactionUncheckedUpdateManyWithoutCurrencyInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutCurrencyInput>, Enumerable<TransactionUncheckedCreateWithoutCurrencyInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutCurrencyInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutCurrencyInput>
    createMany?: TransactionCreateManyCurrencyInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutCurrencyInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutCurrencyInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUncheckedUpdateManyWithoutCurrencyInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutCurrencyInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutCurrencyInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutCurrencyInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutCurrencyInput>
    createMany?: RecurringTransactionCreateManyCurrencyInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutCurrencyInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutCurrencyInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type PayerCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<PayerCreateWithoutTransactionsInput, PayerUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PayerCreateOrConnectWithoutTransactionsInput
    connect?: PayerWhereUniqueInput
  }

  export type CurrencyCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<CurrencyCreateWithoutTransactionsInput, CurrencyUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CurrencyCreateOrConnectWithoutTransactionsInput
    connect?: CurrencyWhereUniqueInput
  }

  export type BudgetCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<BudgetCreateWithoutTransactionsInput, BudgetUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutTransactionsInput
    connect?: BudgetWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTransactionsInput
    connect?: CategoryWhereUniqueInput
  }

  export type SubcategoryCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<SubcategoryCreateWithoutTransactionsInput, SubcategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutTransactionsInput
    connect?: SubcategoryWhereUniqueInput
  }

  export type OutcomeCategoryCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<OutcomeCategoryCreateWithoutTransactionsInput, OutcomeCategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: OutcomeCategoryCreateOrConnectWithoutTransactionsInput
    connect?: OutcomeCategoryWhereUniqueInput
  }

  export type IncomeCategoryCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<IncomeCategoryCreateWithoutTransactionsInput, IncomeCategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: IncomeCategoryCreateOrConnectWithoutTransactionsInput
    connect?: IncomeCategoryWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | number | string | null
    increment?: Decimal | number | string
    decrement?: Decimal | number | string
    multiply?: Decimal | number | string
    divide?: Decimal | number | string
  }

  export type PayerUpdateOneRequiredWithoutTransactionsInput = {
    create?: XOR<PayerCreateWithoutTransactionsInput, PayerUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PayerCreateOrConnectWithoutTransactionsInput
    upsert?: PayerUpsertWithoutTransactionsInput
    connect?: PayerWhereUniqueInput
    update?: XOR<PayerUpdateWithoutTransactionsInput, PayerUncheckedUpdateWithoutTransactionsInput>
  }

  export type CurrencyUpdateOneWithoutTransactionsInput = {
    create?: XOR<CurrencyCreateWithoutTransactionsInput, CurrencyUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CurrencyCreateOrConnectWithoutTransactionsInput
    upsert?: CurrencyUpsertWithoutTransactionsInput
    connect?: CurrencyWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<CurrencyUpdateWithoutTransactionsInput, CurrencyUncheckedUpdateWithoutTransactionsInput>
  }

  export type BudgetUpdateOneRequiredWithoutTransactionsInput = {
    create?: XOR<BudgetCreateWithoutTransactionsInput, BudgetUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutTransactionsInput
    upsert?: BudgetUpsertWithoutTransactionsInput
    connect?: BudgetWhereUniqueInput
    update?: XOR<BudgetUpdateWithoutTransactionsInput, BudgetUncheckedUpdateWithoutTransactionsInput>
  }

  export type CategoryUpdateOneRequiredWithoutTransactionsInput = {
    create?: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTransactionsInput
    upsert?: CategoryUpsertWithoutTransactionsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<CategoryUpdateWithoutTransactionsInput, CategoryUncheckedUpdateWithoutTransactionsInput>
  }

  export type SubcategoryUpdateOneWithoutTransactionsInput = {
    create?: XOR<SubcategoryCreateWithoutTransactionsInput, SubcategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutTransactionsInput
    upsert?: SubcategoryUpsertWithoutTransactionsInput
    connect?: SubcategoryWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<SubcategoryUpdateWithoutTransactionsInput, SubcategoryUncheckedUpdateWithoutTransactionsInput>
  }

  export type OutcomeCategoryUpdateOneWithoutTransactionsInput = {
    create?: XOR<OutcomeCategoryCreateWithoutTransactionsInput, OutcomeCategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: OutcomeCategoryCreateOrConnectWithoutTransactionsInput
    upsert?: OutcomeCategoryUpsertWithoutTransactionsInput
    connect?: OutcomeCategoryWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<OutcomeCategoryUpdateWithoutTransactionsInput, OutcomeCategoryUncheckedUpdateWithoutTransactionsInput>
  }

  export type IncomeCategoryUpdateOneWithoutTransactionsInput = {
    create?: XOR<IncomeCategoryCreateWithoutTransactionsInput, IncomeCategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: IncomeCategoryCreateOrConnectWithoutTransactionsInput
    upsert?: IncomeCategoryUpsertWithoutTransactionsInput
    connect?: IncomeCategoryWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<IncomeCategoryUpdateWithoutTransactionsInput, IncomeCategoryUncheckedUpdateWithoutTransactionsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PayerCreateNestedOneWithoutRecurringTransactionsInput = {
    create?: XOR<PayerCreateWithoutRecurringTransactionsInput, PayerUncheckedCreateWithoutRecurringTransactionsInput>
    connectOrCreate?: PayerCreateOrConnectWithoutRecurringTransactionsInput
    connect?: PayerWhereUniqueInput
  }

  export type CurrencyCreateNestedOneWithoutRecurringTransactionInput = {
    create?: XOR<CurrencyCreateWithoutRecurringTransactionInput, CurrencyUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: CurrencyCreateOrConnectWithoutRecurringTransactionInput
    connect?: CurrencyWhereUniqueInput
  }

  export type TransactionsOnBudgetsCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<TransactionsOnBudgetsCreateWithoutTransactionInput>, Enumerable<TransactionsOnBudgetsUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<TransactionsOnBudgetsCreateOrConnectWithoutTransactionInput>
    createMany?: TransactionsOnBudgetsCreateManyTransactionInputEnvelope
    connect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
  }

  export type CategoryCreateNestedOneWithoutRecurringTransactionInput = {
    create?: XOR<CategoryCreateWithoutRecurringTransactionInput, CategoryUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutRecurringTransactionInput
    connect?: CategoryWhereUniqueInput
  }

  export type SubcategoryCreateNestedOneWithoutRecurringTransactionInput = {
    create?: XOR<SubcategoryCreateWithoutRecurringTransactionInput, SubcategoryUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutRecurringTransactionInput
    connect?: SubcategoryWhereUniqueInput
  }

  export type OutcomeCategoryCreateNestedOneWithoutRecurringTransactionInput = {
    create?: XOR<OutcomeCategoryCreateWithoutRecurringTransactionInput, OutcomeCategoryUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: OutcomeCategoryCreateOrConnectWithoutRecurringTransactionInput
    connect?: OutcomeCategoryWhereUniqueInput
  }

  export type IncomeCategoryCreateNestedOneWithoutRecurringTransactionInput = {
    create?: XOR<IncomeCategoryCreateWithoutRecurringTransactionInput, IncomeCategoryUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: IncomeCategoryCreateOrConnectWithoutRecurringTransactionInput
    connect?: IncomeCategoryWhereUniqueInput
  }

  export type TransactionsOnBudgetsUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<Enumerable<TransactionsOnBudgetsCreateWithoutTransactionInput>, Enumerable<TransactionsOnBudgetsUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<TransactionsOnBudgetsCreateOrConnectWithoutTransactionInput>
    createMany?: TransactionsOnBudgetsCreateManyTransactionInputEnvelope
    connect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
  }

  export type PayerUpdateOneRequiredWithoutRecurringTransactionsInput = {
    create?: XOR<PayerCreateWithoutRecurringTransactionsInput, PayerUncheckedCreateWithoutRecurringTransactionsInput>
    connectOrCreate?: PayerCreateOrConnectWithoutRecurringTransactionsInput
    upsert?: PayerUpsertWithoutRecurringTransactionsInput
    connect?: PayerWhereUniqueInput
    update?: XOR<PayerUpdateWithoutRecurringTransactionsInput, PayerUncheckedUpdateWithoutRecurringTransactionsInput>
  }

  export type CurrencyUpdateOneWithoutRecurringTransactionInput = {
    create?: XOR<CurrencyCreateWithoutRecurringTransactionInput, CurrencyUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: CurrencyCreateOrConnectWithoutRecurringTransactionInput
    upsert?: CurrencyUpsertWithoutRecurringTransactionInput
    connect?: CurrencyWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<CurrencyUpdateWithoutRecurringTransactionInput, CurrencyUncheckedUpdateWithoutRecurringTransactionInput>
  }

  export type TransactionsOnBudgetsUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<TransactionsOnBudgetsCreateWithoutTransactionInput>, Enumerable<TransactionsOnBudgetsUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<TransactionsOnBudgetsCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<TransactionsOnBudgetsUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: TransactionsOnBudgetsCreateManyTransactionInputEnvelope
    connect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    set?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    disconnect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    delete?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    update?: Enumerable<TransactionsOnBudgetsUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<TransactionsOnBudgetsUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<TransactionsOnBudgetsScalarWhereInput>
  }

  export type CategoryUpdateOneRequiredWithoutRecurringTransactionInput = {
    create?: XOR<CategoryCreateWithoutRecurringTransactionInput, CategoryUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutRecurringTransactionInput
    upsert?: CategoryUpsertWithoutRecurringTransactionInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<CategoryUpdateWithoutRecurringTransactionInput, CategoryUncheckedUpdateWithoutRecurringTransactionInput>
  }

  export type SubcategoryUpdateOneWithoutRecurringTransactionInput = {
    create?: XOR<SubcategoryCreateWithoutRecurringTransactionInput, SubcategoryUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutRecurringTransactionInput
    upsert?: SubcategoryUpsertWithoutRecurringTransactionInput
    connect?: SubcategoryWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<SubcategoryUpdateWithoutRecurringTransactionInput, SubcategoryUncheckedUpdateWithoutRecurringTransactionInput>
  }

  export type OutcomeCategoryUpdateOneWithoutRecurringTransactionInput = {
    create?: XOR<OutcomeCategoryCreateWithoutRecurringTransactionInput, OutcomeCategoryUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: OutcomeCategoryCreateOrConnectWithoutRecurringTransactionInput
    upsert?: OutcomeCategoryUpsertWithoutRecurringTransactionInput
    connect?: OutcomeCategoryWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<OutcomeCategoryUpdateWithoutRecurringTransactionInput, OutcomeCategoryUncheckedUpdateWithoutRecurringTransactionInput>
  }

  export type IncomeCategoryUpdateOneWithoutRecurringTransactionInput = {
    create?: XOR<IncomeCategoryCreateWithoutRecurringTransactionInput, IncomeCategoryUncheckedCreateWithoutRecurringTransactionInput>
    connectOrCreate?: IncomeCategoryCreateOrConnectWithoutRecurringTransactionInput
    upsert?: IncomeCategoryUpsertWithoutRecurringTransactionInput
    connect?: IncomeCategoryWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<IncomeCategoryUpdateWithoutRecurringTransactionInput, IncomeCategoryUncheckedUpdateWithoutRecurringTransactionInput>
  }

  export type TransactionsOnBudgetsUncheckedUpdateManyWithoutTransactionInput = {
    create?: XOR<Enumerable<TransactionsOnBudgetsCreateWithoutTransactionInput>, Enumerable<TransactionsOnBudgetsUncheckedCreateWithoutTransactionInput>>
    connectOrCreate?: Enumerable<TransactionsOnBudgetsCreateOrConnectWithoutTransactionInput>
    upsert?: Enumerable<TransactionsOnBudgetsUpsertWithWhereUniqueWithoutTransactionInput>
    createMany?: TransactionsOnBudgetsCreateManyTransactionInputEnvelope
    connect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    set?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    disconnect?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    delete?: Enumerable<TransactionsOnBudgetsWhereUniqueInput>
    update?: Enumerable<TransactionsOnBudgetsUpdateWithWhereUniqueWithoutTransactionInput>
    updateMany?: Enumerable<TransactionsOnBudgetsUpdateManyWithWhereWithoutTransactionInput>
    deleteMany?: Enumerable<TransactionsOnBudgetsScalarWhereInput>
  }

  export type BudgetCreateNestedOneWithoutRecurringTransactionsInput = {
    create?: XOR<BudgetCreateWithoutRecurringTransactionsInput, BudgetUncheckedCreateWithoutRecurringTransactionsInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutRecurringTransactionsInput
    connect?: BudgetWhereUniqueInput
  }

  export type RecurringTransactionCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<RecurringTransactionCreateWithoutBudgetsInput, RecurringTransactionUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: RecurringTransactionCreateOrConnectWithoutBudgetsInput
    connect?: RecurringTransactionWhereUniqueInput
  }

  export type BudgetUpdateOneRequiredWithoutRecurringTransactionsInput = {
    create?: XOR<BudgetCreateWithoutRecurringTransactionsInput, BudgetUncheckedCreateWithoutRecurringTransactionsInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutRecurringTransactionsInput
    upsert?: BudgetUpsertWithoutRecurringTransactionsInput
    connect?: BudgetWhereUniqueInput
    update?: XOR<BudgetUpdateWithoutRecurringTransactionsInput, BudgetUncheckedUpdateWithoutRecurringTransactionsInput>
  }

  export type RecurringTransactionUpdateOneRequiredWithoutBudgetsInput = {
    create?: XOR<RecurringTransactionCreateWithoutBudgetsInput, RecurringTransactionUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: RecurringTransactionCreateOrConnectWithoutBudgetsInput
    upsert?: RecurringTransactionUpsertWithoutBudgetsInput
    connect?: RecurringTransactionWhereUniqueInput
    update?: XOR<RecurringTransactionUpdateWithoutBudgetsInput, RecurringTransactionUncheckedUpdateWithoutBudgetsInput>
  }

  export type UserCreateNestedOneWithoutPayersInput = {
    create?: XOR<UserCreateWithoutPayersInput, UserUncheckedCreateWithoutPayersInput>
    connectOrCreate?: UserCreateOrConnectWithoutPayersInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutPayerInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutPayerInput>, Enumerable<TransactionUncheckedCreateWithoutPayerInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutPayerInput>
    createMany?: TransactionCreateManyPayerInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionCreateNestedManyWithoutPayerInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutPayerInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutPayerInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutPayerInput>
    createMany?: RecurringTransactionCreateManyPayerInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type TransactionUncheckedCreateNestedManyWithoutPayerInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutPayerInput>, Enumerable<TransactionUncheckedCreateWithoutPayerInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutPayerInput>
    createMany?: TransactionCreateManyPayerInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
  }

  export type RecurringTransactionUncheckedCreateNestedManyWithoutPayerInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutPayerInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutPayerInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutPayerInput>
    createMany?: RecurringTransactionCreateManyPayerInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutPayersInput = {
    create?: XOR<UserCreateWithoutPayersInput, UserUncheckedCreateWithoutPayersInput>
    connectOrCreate?: UserCreateOrConnectWithoutPayersInput
    upsert?: UserUpsertWithoutPayersInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPayersInput, UserUncheckedUpdateWithoutPayersInput>
  }

  export type TransactionUpdateManyWithoutPayerInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutPayerInput>, Enumerable<TransactionUncheckedCreateWithoutPayerInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutPayerInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutPayerInput>
    createMany?: TransactionCreateManyPayerInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutPayerInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutPayerInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUpdateManyWithoutPayerInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutPayerInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutPayerInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutPayerInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutPayerInput>
    createMany?: RecurringTransactionCreateManyPayerInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutPayerInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutPayerInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type TransactionUncheckedUpdateManyWithoutPayerInput = {
    create?: XOR<Enumerable<TransactionCreateWithoutPayerInput>, Enumerable<TransactionUncheckedCreateWithoutPayerInput>>
    connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutPayerInput>
    upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutPayerInput>
    createMany?: TransactionCreateManyPayerInputEnvelope
    connect?: Enumerable<TransactionWhereUniqueInput>
    set?: Enumerable<TransactionWhereUniqueInput>
    disconnect?: Enumerable<TransactionWhereUniqueInput>
    delete?: Enumerable<TransactionWhereUniqueInput>
    update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutPayerInput>
    updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutPayerInput>
    deleteMany?: Enumerable<TransactionScalarWhereInput>
  }

  export type RecurringTransactionUncheckedUpdateManyWithoutPayerInput = {
    create?: XOR<Enumerable<RecurringTransactionCreateWithoutPayerInput>, Enumerable<RecurringTransactionUncheckedCreateWithoutPayerInput>>
    connectOrCreate?: Enumerable<RecurringTransactionCreateOrConnectWithoutPayerInput>
    upsert?: Enumerable<RecurringTransactionUpsertWithWhereUniqueWithoutPayerInput>
    createMany?: RecurringTransactionCreateManyPayerInputEnvelope
    connect?: Enumerable<RecurringTransactionWhereUniqueInput>
    set?: Enumerable<RecurringTransactionWhereUniqueInput>
    disconnect?: Enumerable<RecurringTransactionWhereUniqueInput>
    delete?: Enumerable<RecurringTransactionWhereUniqueInput>
    update?: Enumerable<RecurringTransactionUpdateWithWhereUniqueWithoutPayerInput>
    updateMany?: Enumerable<RecurringTransactionUpdateManyWithWhereWithoutPayerInput>
    deleteMany?: Enumerable<RecurringTransactionScalarWhereInput>
  }

  export type BudgetCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    connect?: Enumerable<BudgetWhereUniqueInput>
  }

  export type PayerCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PayerCreateWithoutUserInput>, Enumerable<PayerUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PayerCreateOrConnectWithoutUserInput>
    createMany?: PayerCreateManyUserInputEnvelope
    connect?: Enumerable<PayerWhereUniqueInput>
  }

  export type OutcomeCategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<OutcomeCategoryCreateWithoutUserInput>, Enumerable<OutcomeCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<OutcomeCategoryCreateOrConnectWithoutUserInput>
    createMany?: OutcomeCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<OutcomeCategoryWhereUniqueInput>
  }

  export type IncomeCategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<IncomeCategoryCreateWithoutUserInput>, Enumerable<IncomeCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<IncomeCategoryCreateOrConnectWithoutUserInput>
    createMany?: IncomeCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<IncomeCategoryWhereUniqueInput>
  }

  export type CategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CategoryCreateWithoutUserInput>, Enumerable<CategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CategoryCreateOrConnectWithoutUserInput>
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: Enumerable<CategoryWhereUniqueInput>
  }

  export type CurrencyCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CurrencyCreateWithoutUserInput>, Enumerable<CurrencyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CurrencyCreateOrConnectWithoutUserInput>
    createMany?: CurrencyCreateManyUserInputEnvelope
    connect?: Enumerable<CurrencyWhereUniqueInput>
  }

  export type BudgetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    connect?: Enumerable<BudgetWhereUniqueInput>
  }

  export type PayerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PayerCreateWithoutUserInput>, Enumerable<PayerUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PayerCreateOrConnectWithoutUserInput>
    createMany?: PayerCreateManyUserInputEnvelope
    connect?: Enumerable<PayerWhereUniqueInput>
  }

  export type OutcomeCategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<OutcomeCategoryCreateWithoutUserInput>, Enumerable<OutcomeCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<OutcomeCategoryCreateOrConnectWithoutUserInput>
    createMany?: OutcomeCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<OutcomeCategoryWhereUniqueInput>
  }

  export type IncomeCategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<IncomeCategoryCreateWithoutUserInput>, Enumerable<IncomeCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<IncomeCategoryCreateOrConnectWithoutUserInput>
    createMany?: IncomeCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<IncomeCategoryWhereUniqueInput>
  }

  export type CategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CategoryCreateWithoutUserInput>, Enumerable<CategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CategoryCreateOrConnectWithoutUserInput>
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: Enumerable<CategoryWhereUniqueInput>
  }

  export type CurrencyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CurrencyCreateWithoutUserInput>, Enumerable<CurrencyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CurrencyCreateOrConnectWithoutUserInput>
    createMany?: CurrencyCreateManyUserInputEnvelope
    connect?: Enumerable<CurrencyWhereUniqueInput>
  }

  export type EnumActivationStatusFieldUpdateOperationsInput = {
    set?: ActivationStatus
  }

  export type BudgetUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<BudgetUpsertWithWhereUniqueWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    connect?: Enumerable<BudgetWhereUniqueInput>
    set?: Enumerable<BudgetWhereUniqueInput>
    disconnect?: Enumerable<BudgetWhereUniqueInput>
    delete?: Enumerable<BudgetWhereUniqueInput>
    update?: Enumerable<BudgetUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<BudgetUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<BudgetScalarWhereInput>
  }

  export type PayerUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<PayerCreateWithoutUserInput>, Enumerable<PayerUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PayerCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PayerUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PayerCreateManyUserInputEnvelope
    connect?: Enumerable<PayerWhereUniqueInput>
    set?: Enumerable<PayerWhereUniqueInput>
    disconnect?: Enumerable<PayerWhereUniqueInput>
    delete?: Enumerable<PayerWhereUniqueInput>
    update?: Enumerable<PayerUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PayerUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PayerScalarWhereInput>
  }

  export type OutcomeCategoryUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<OutcomeCategoryCreateWithoutUserInput>, Enumerable<OutcomeCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<OutcomeCategoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<OutcomeCategoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: OutcomeCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<OutcomeCategoryWhereUniqueInput>
    set?: Enumerable<OutcomeCategoryWhereUniqueInput>
    disconnect?: Enumerable<OutcomeCategoryWhereUniqueInput>
    delete?: Enumerable<OutcomeCategoryWhereUniqueInput>
    update?: Enumerable<OutcomeCategoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<OutcomeCategoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<OutcomeCategoryScalarWhereInput>
  }

  export type IncomeCategoryUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<IncomeCategoryCreateWithoutUserInput>, Enumerable<IncomeCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<IncomeCategoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<IncomeCategoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: IncomeCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<IncomeCategoryWhereUniqueInput>
    set?: Enumerable<IncomeCategoryWhereUniqueInput>
    disconnect?: Enumerable<IncomeCategoryWhereUniqueInput>
    delete?: Enumerable<IncomeCategoryWhereUniqueInput>
    update?: Enumerable<IncomeCategoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<IncomeCategoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<IncomeCategoryScalarWhereInput>
  }

  export type CategoryUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<CategoryCreateWithoutUserInput>, Enumerable<CategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CategoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CategoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: Enumerable<CategoryWhereUniqueInput>
    set?: Enumerable<CategoryWhereUniqueInput>
    disconnect?: Enumerable<CategoryWhereUniqueInput>
    delete?: Enumerable<CategoryWhereUniqueInput>
    update?: Enumerable<CategoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CategoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CategoryScalarWhereInput>
  }

  export type CurrencyUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<CurrencyCreateWithoutUserInput>, Enumerable<CurrencyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CurrencyCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CurrencyUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CurrencyCreateManyUserInputEnvelope
    connect?: Enumerable<CurrencyWhereUniqueInput>
    set?: Enumerable<CurrencyWhereUniqueInput>
    disconnect?: Enumerable<CurrencyWhereUniqueInput>
    delete?: Enumerable<CurrencyWhereUniqueInput>
    update?: Enumerable<CurrencyUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CurrencyUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CurrencyScalarWhereInput>
  }

  export type BudgetUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<BudgetUpsertWithWhereUniqueWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    connect?: Enumerable<BudgetWhereUniqueInput>
    set?: Enumerable<BudgetWhereUniqueInput>
    disconnect?: Enumerable<BudgetWhereUniqueInput>
    delete?: Enumerable<BudgetWhereUniqueInput>
    update?: Enumerable<BudgetUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<BudgetUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<BudgetScalarWhereInput>
  }

  export type PayerUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<PayerCreateWithoutUserInput>, Enumerable<PayerUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PayerCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PayerUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PayerCreateManyUserInputEnvelope
    connect?: Enumerable<PayerWhereUniqueInput>
    set?: Enumerable<PayerWhereUniqueInput>
    disconnect?: Enumerable<PayerWhereUniqueInput>
    delete?: Enumerable<PayerWhereUniqueInput>
    update?: Enumerable<PayerUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PayerUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PayerScalarWhereInput>
  }

  export type OutcomeCategoryUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<OutcomeCategoryCreateWithoutUserInput>, Enumerable<OutcomeCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<OutcomeCategoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<OutcomeCategoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: OutcomeCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<OutcomeCategoryWhereUniqueInput>
    set?: Enumerable<OutcomeCategoryWhereUniqueInput>
    disconnect?: Enumerable<OutcomeCategoryWhereUniqueInput>
    delete?: Enumerable<OutcomeCategoryWhereUniqueInput>
    update?: Enumerable<OutcomeCategoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<OutcomeCategoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<OutcomeCategoryScalarWhereInput>
  }

  export type IncomeCategoryUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<IncomeCategoryCreateWithoutUserInput>, Enumerable<IncomeCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<IncomeCategoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<IncomeCategoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: IncomeCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<IncomeCategoryWhereUniqueInput>
    set?: Enumerable<IncomeCategoryWhereUniqueInput>
    disconnect?: Enumerable<IncomeCategoryWhereUniqueInput>
    delete?: Enumerable<IncomeCategoryWhereUniqueInput>
    update?: Enumerable<IncomeCategoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<IncomeCategoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<IncomeCategoryScalarWhereInput>
  }

  export type CategoryUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<CategoryCreateWithoutUserInput>, Enumerable<CategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CategoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CategoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: Enumerable<CategoryWhereUniqueInput>
    set?: Enumerable<CategoryWhereUniqueInput>
    disconnect?: Enumerable<CategoryWhereUniqueInput>
    delete?: Enumerable<CategoryWhereUniqueInput>
    update?: Enumerable<CategoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CategoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CategoryScalarWhereInput>
  }

  export type CurrencyUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<CurrencyCreateWithoutUserInput>, Enumerable<CurrencyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CurrencyCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CurrencyUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CurrencyCreateManyUserInputEnvelope
    connect?: Enumerable<CurrencyWhereUniqueInput>
    set?: Enumerable<CurrencyWhereUniqueInput>
    disconnect?: Enumerable<CurrencyWhereUniqueInput>
    delete?: Enumerable<CurrencyWhereUniqueInput>
    update?: Enumerable<CurrencyUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CurrencyUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CurrencyScalarWhereInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDecimalFilter = {
    equals?: Decimal | number | string
    in?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | number | string
    lte?: Decimal | number | string
    gt?: Decimal | number | string
    gte?: Decimal | number | string
    not?: NestedDecimalFilter | Decimal | number | string
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedEnumBudgetTypeFilter = {
    equals?: BudgetType
    in?: Enumerable<BudgetType>
    notIn?: Enumerable<BudgetType>
    not?: NestedEnumBudgetTypeFilter | BudgetType
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    count?: NestedIntFilter
    avg?: NestedFloatFilter
    sum?: NestedIntFilter
    min?: NestedIntFilter
    max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedDecimalWithAggregatesFilter = {
    equals?: Decimal | number | string
    in?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | number | string
    lte?: Decimal | number | string
    gt?: Decimal | number | string
    gte?: Decimal | number | string
    not?: NestedDecimalWithAggregatesFilter | Decimal | number | string
    count?: NestedIntFilter
    avg?: NestedDecimalFilter
    sum?: NestedDecimalFilter
    min?: NestedDecimalFilter
    max?: NestedDecimalFilter
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    count?: NestedIntFilter
    min?: NestedStringFilter
    max?: NestedStringFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    count?: NestedIntFilter
    min?: NestedBoolFilter
    max?: NestedBoolFilter
  }

  export type NestedEnumBudgetTypeWithAggregatesFilter = {
    equals?: BudgetType
    in?: Enumerable<BudgetType>
    notIn?: Enumerable<BudgetType>
    not?: NestedEnumBudgetTypeWithAggregatesFilter | BudgetType
    count?: NestedIntFilter
    min?: NestedEnumBudgetTypeFilter
    max?: NestedEnumBudgetTypeFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    count?: NestedIntFilter
    min?: NestedDateTimeFilter
    max?: NestedDateTimeFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedDecimalNullableFilter = {
    equals?: Decimal | number | string | null
    in?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | number | string
    lte?: Decimal | number | string
    gt?: Decimal | number | string
    gte?: Decimal | number | string
    not?: NestedDecimalNullableFilter | Decimal | number | string | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    count?: NestedIntNullableFilter
    min?: NestedStringNullableFilter
    max?: NestedStringNullableFilter
  }

  export type NestedDecimalNullableWithAggregatesFilter = {
    equals?: Decimal | number | string | null
    in?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | number | string
    lte?: Decimal | number | string
    gt?: Decimal | number | string
    gte?: Decimal | number | string
    not?: NestedDecimalNullableWithAggregatesFilter | Decimal | number | string | null
    count?: NestedIntNullableFilter
    avg?: NestedDecimalNullableFilter
    sum?: NestedDecimalNullableFilter
    min?: NestedDecimalNullableFilter
    max?: NestedDecimalNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    count?: NestedIntNullableFilter
    avg?: NestedFloatNullableFilter
    sum?: NestedIntNullableFilter
    min?: NestedIntNullableFilter
    max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedEnumActivationStatusFilter = {
    equals?: ActivationStatus
    in?: Enumerable<ActivationStatus>
    notIn?: Enumerable<ActivationStatus>
    not?: NestedEnumActivationStatusFilter | ActivationStatus
  }

  export type NestedEnumActivationStatusWithAggregatesFilter = {
    equals?: ActivationStatus
    in?: Enumerable<ActivationStatus>
    notIn?: Enumerable<ActivationStatus>
    not?: NestedEnumActivationStatusWithAggregatesFilter | ActivationStatus
    count?: NestedIntFilter
    min?: NestedEnumActivationStatusFilter
    max?: NestedEnumActivationStatusFilter
  }

  export type UserCreateWithoutBudgetsInput = {
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    payers?: PayerCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryCreateNestedManyWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
    currencies?: CurrencyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBudgetsInput = {
    id?: number
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    payers?: PayerUncheckedCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedCreateNestedManyWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    currencies?: CurrencyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBudgetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
  }

  export type TransactionCreateWithoutPayFromInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    payer: PayerCreateNestedOneWithoutTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutTransactionsInput
    category: CategoryCreateNestedOneWithoutTransactionsInput
    subcategory?: SubcategoryCreateNestedOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutPayFromInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionCreateOrConnectWithoutPayFromInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutPayFromInput, TransactionUncheckedCreateWithoutPayFromInput>
  }

  export type TransactionCreateManyPayFromInputEnvelope = {
    data: Enumerable<TransactionCreateManyPayFromInput>
    skipDuplicates?: boolean
  }

  export type TransactionsOnBudgetsCreateWithoutBudgetInput = {
    createdAt?: Date | string
    transaction: RecurringTransactionCreateNestedOneWithoutBudgetsInput
  }

  export type TransactionsOnBudgetsUncheckedCreateWithoutBudgetInput = {
    transactionId: number
    createdAt?: Date | string
  }

  export type TransactionsOnBudgetsCreateOrConnectWithoutBudgetInput = {
    where: TransactionsOnBudgetsWhereUniqueInput
    create: XOR<TransactionsOnBudgetsCreateWithoutBudgetInput, TransactionsOnBudgetsUncheckedCreateWithoutBudgetInput>
  }

  export type TransactionsOnBudgetsCreateManyBudgetInputEnvelope = {
    data: Enumerable<TransactionsOnBudgetsCreateManyBudgetInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBudgetsInput = {
    update: XOR<UserUpdateWithoutBudgetsInput, UserUncheckedUpdateWithoutBudgetsInput>
    create: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
  }

  export type UserUpdateWithoutBudgetsInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    payers?: PayerUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUpdateManyWithoutUserInput
    categories?: CategoryUpdateManyWithoutUserInput
    currencies?: CurrencyUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutBudgetsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    payers?: PayerUncheckedUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedUpdateManyWithoutUserInput
    categories?: CategoryUncheckedUpdateManyWithoutUserInput
    currencies?: CurrencyUncheckedUpdateManyWithoutUserInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutPayFromInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutPayFromInput, TransactionUncheckedUpdateWithoutPayFromInput>
    create: XOR<TransactionCreateWithoutPayFromInput, TransactionUncheckedCreateWithoutPayFromInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutPayFromInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutPayFromInput, TransactionUncheckedUpdateWithoutPayFromInput>
  }

  export type TransactionUpdateManyWithWhereWithoutPayFromInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutTransactionsInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: Enumerable<TransactionScalarWhereInput>
    OR?: Enumerable<TransactionScalarWhereInput>
    NOT?: Enumerable<TransactionScalarWhereInput>
    id?: IntFilter | number
    date?: DateTimeFilter | Date | string
    note?: StringFilter | string
    amount?: DecimalFilter | Decimal | number | string
    isDeleted?: BoolFilter | boolean
    payerId?: IntFilter | number
    currencyCode?: StringNullableFilter | string | null
    exchangeRate?: DecimalNullableFilter | Decimal | number | string | null
    currencyId?: IntNullableFilter | number | null
    budgetId?: IntFilter | number
    categoryId?: IntFilter | number
    subcategoryId?: IntNullableFilter | number | null
    outcomeCategoryId?: IntNullableFilter | number | null
    incomeCategoryId?: IntNullableFilter | number | null
  }

  export type TransactionsOnBudgetsUpsertWithWhereUniqueWithoutBudgetInput = {
    where: TransactionsOnBudgetsWhereUniqueInput
    update: XOR<TransactionsOnBudgetsUpdateWithoutBudgetInput, TransactionsOnBudgetsUncheckedUpdateWithoutBudgetInput>
    create: XOR<TransactionsOnBudgetsCreateWithoutBudgetInput, TransactionsOnBudgetsUncheckedCreateWithoutBudgetInput>
  }

  export type TransactionsOnBudgetsUpdateWithWhereUniqueWithoutBudgetInput = {
    where: TransactionsOnBudgetsWhereUniqueInput
    data: XOR<TransactionsOnBudgetsUpdateWithoutBudgetInput, TransactionsOnBudgetsUncheckedUpdateWithoutBudgetInput>
  }

  export type TransactionsOnBudgetsUpdateManyWithWhereWithoutBudgetInput = {
    where: TransactionsOnBudgetsScalarWhereInput
    data: XOR<TransactionsOnBudgetsUpdateManyMutationInput, TransactionsOnBudgetsUncheckedUpdateManyWithoutRecurringTransactionsInput>
  }

  export type TransactionsOnBudgetsScalarWhereInput = {
    AND?: Enumerable<TransactionsOnBudgetsScalarWhereInput>
    OR?: Enumerable<TransactionsOnBudgetsScalarWhereInput>
    NOT?: Enumerable<TransactionsOnBudgetsScalarWhereInput>
    budgetId?: IntFilter | number
    transactionId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
  }

  export type UserCreateWithoutIncomeCategoriesInput = {
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetCreateNestedManyWithoutUserInput
    payers?: PayerCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryCreateNestedManyWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
    currencies?: CurrencyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutIncomeCategoriesInput = {
    id?: number
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    payers?: PayerUncheckedCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedCreateNestedManyWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    currencies?: CurrencyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutIncomeCategoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutIncomeCategoriesInput, UserUncheckedCreateWithoutIncomeCategoriesInput>
  }

  export type TransactionCreateWithoutIncomeCategoryInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    payer: PayerCreateNestedOneWithoutTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutTransactionsInput
    payFrom: BudgetCreateNestedOneWithoutTransactionsInput
    category: CategoryCreateNestedOneWithoutTransactionsInput
    subcategory?: SubcategoryCreateNestedOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutIncomeCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
  }

  export type TransactionCreateOrConnectWithoutIncomeCategoryInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutIncomeCategoryInput, TransactionUncheckedCreateWithoutIncomeCategoryInput>
  }

  export type TransactionCreateManyIncomeCategoryInputEnvelope = {
    data: Enumerable<TransactionCreateManyIncomeCategoryInput>
    skipDuplicates?: boolean
  }

  export type RecurringTransactionCreateWithoutIncomeCategoryInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payer: PayerCreateNestedOneWithoutRecurringTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsCreateNestedManyWithoutTransactionInput
    category: CategoryCreateNestedOneWithoutRecurringTransactionInput
    subcategory?: SubcategoryCreateNestedOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedCreateWithoutIncomeCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    currencyId?: number | null
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    budgets?: TransactionsOnBudgetsUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type RecurringTransactionCreateOrConnectWithoutIncomeCategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    create: XOR<RecurringTransactionCreateWithoutIncomeCategoryInput, RecurringTransactionUncheckedCreateWithoutIncomeCategoryInput>
  }

  export type RecurringTransactionCreateManyIncomeCategoryInputEnvelope = {
    data: Enumerable<RecurringTransactionCreateManyIncomeCategoryInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutIncomeCategoriesInput = {
    update: XOR<UserUpdateWithoutIncomeCategoriesInput, UserUncheckedUpdateWithoutIncomeCategoriesInput>
    create: XOR<UserCreateWithoutIncomeCategoriesInput, UserUncheckedCreateWithoutIncomeCategoriesInput>
  }

  export type UserUpdateWithoutIncomeCategoriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUpdateManyWithoutUserInput
    payers?: PayerUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUpdateManyWithoutUserInput
    categories?: CategoryUpdateManyWithoutUserInput
    currencies?: CurrencyUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutIncomeCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUncheckedUpdateManyWithoutUserInput
    payers?: PayerUncheckedUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedUpdateManyWithoutUserInput
    categories?: CategoryUncheckedUpdateManyWithoutUserInput
    currencies?: CurrencyUncheckedUpdateManyWithoutUserInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutIncomeCategoryInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutIncomeCategoryInput, TransactionUncheckedUpdateWithoutIncomeCategoryInput>
    create: XOR<TransactionCreateWithoutIncomeCategoryInput, TransactionUncheckedCreateWithoutIncomeCategoryInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutIncomeCategoryInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutIncomeCategoryInput, TransactionUncheckedUpdateWithoutIncomeCategoryInput>
  }

  export type TransactionUpdateManyWithWhereWithoutIncomeCategoryInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutTransactionsInput>
  }

  export type RecurringTransactionUpsertWithWhereUniqueWithoutIncomeCategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    update: XOR<RecurringTransactionUpdateWithoutIncomeCategoryInput, RecurringTransactionUncheckedUpdateWithoutIncomeCategoryInput>
    create: XOR<RecurringTransactionCreateWithoutIncomeCategoryInput, RecurringTransactionUncheckedCreateWithoutIncomeCategoryInput>
  }

  export type RecurringTransactionUpdateWithWhereUniqueWithoutIncomeCategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    data: XOR<RecurringTransactionUpdateWithoutIncomeCategoryInput, RecurringTransactionUncheckedUpdateWithoutIncomeCategoryInput>
  }

  export type RecurringTransactionUpdateManyWithWhereWithoutIncomeCategoryInput = {
    where: RecurringTransactionScalarWhereInput
    data: XOR<RecurringTransactionUpdateManyMutationInput, RecurringTransactionUncheckedUpdateManyWithoutRecurringTransactionInput>
  }

  export type RecurringTransactionScalarWhereInput = {
    AND?: Enumerable<RecurringTransactionScalarWhereInput>
    OR?: Enumerable<RecurringTransactionScalarWhereInput>
    NOT?: Enumerable<RecurringTransactionScalarWhereInput>
    id?: IntFilter | number
    date?: DateTimeFilter | Date | string
    note?: StringFilter | string
    amount?: DecimalFilter | Decimal | number | string
    dayOfPayment?: DateTimeFilter | Date | string
    activationDate?: DateTimeFilter | Date | string
    isDeleted?: BoolFilter | boolean
    payerId?: IntFilter | number
    currencyId?: IntNullableFilter | number | null
    categoryId?: IntFilter | number
    subcategoryId?: IntNullableFilter | number | null
    outcomeCategoryId?: IntNullableFilter | number | null
    incomeCategoryId?: IntNullableFilter | number | null
  }

  export type UserCreateWithoutOutcomeCategoriesInput = {
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetCreateNestedManyWithoutUserInput
    payers?: PayerCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryCreateNestedManyWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
    currencies?: CurrencyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOutcomeCategoriesInput = {
    id?: number
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    payers?: PayerUncheckedCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedCreateNestedManyWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    currencies?: CurrencyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOutcomeCategoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOutcomeCategoriesInput, UserUncheckedCreateWithoutOutcomeCategoriesInput>
  }

  export type TransactionCreateWithoutOutcomeCategoryInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    payer: PayerCreateNestedOneWithoutTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutTransactionsInput
    payFrom: BudgetCreateNestedOneWithoutTransactionsInput
    category: CategoryCreateNestedOneWithoutTransactionsInput
    subcategory?: SubcategoryCreateNestedOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutOutcomeCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    categoryId: number
    subcategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionCreateOrConnectWithoutOutcomeCategoryInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutOutcomeCategoryInput, TransactionUncheckedCreateWithoutOutcomeCategoryInput>
  }

  export type TransactionCreateManyOutcomeCategoryInputEnvelope = {
    data: Enumerable<TransactionCreateManyOutcomeCategoryInput>
    skipDuplicates?: boolean
  }

  export type RecurringTransactionCreateWithoutOutcomeCategoryInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payer: PayerCreateNestedOneWithoutRecurringTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsCreateNestedManyWithoutTransactionInput
    category: CategoryCreateNestedOneWithoutRecurringTransactionInput
    subcategory?: SubcategoryCreateNestedOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedCreateWithoutOutcomeCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    currencyId?: number | null
    categoryId: number
    subcategoryId?: number | null
    incomeCategoryId?: number | null
    budgets?: TransactionsOnBudgetsUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type RecurringTransactionCreateOrConnectWithoutOutcomeCategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    create: XOR<RecurringTransactionCreateWithoutOutcomeCategoryInput, RecurringTransactionUncheckedCreateWithoutOutcomeCategoryInput>
  }

  export type RecurringTransactionCreateManyOutcomeCategoryInputEnvelope = {
    data: Enumerable<RecurringTransactionCreateManyOutcomeCategoryInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOutcomeCategoriesInput = {
    update: XOR<UserUpdateWithoutOutcomeCategoriesInput, UserUncheckedUpdateWithoutOutcomeCategoriesInput>
    create: XOR<UserCreateWithoutOutcomeCategoriesInput, UserUncheckedCreateWithoutOutcomeCategoriesInput>
  }

  export type UserUpdateWithoutOutcomeCategoriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUpdateManyWithoutUserInput
    payers?: PayerUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUpdateManyWithoutUserInput
    categories?: CategoryUpdateManyWithoutUserInput
    currencies?: CurrencyUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutOutcomeCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUncheckedUpdateManyWithoutUserInput
    payers?: PayerUncheckedUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedUpdateManyWithoutUserInput
    categories?: CategoryUncheckedUpdateManyWithoutUserInput
    currencies?: CurrencyUncheckedUpdateManyWithoutUserInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutOutcomeCategoryInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutOutcomeCategoryInput, TransactionUncheckedUpdateWithoutOutcomeCategoryInput>
    create: XOR<TransactionCreateWithoutOutcomeCategoryInput, TransactionUncheckedCreateWithoutOutcomeCategoryInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutOutcomeCategoryInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutOutcomeCategoryInput, TransactionUncheckedUpdateWithoutOutcomeCategoryInput>
  }

  export type TransactionUpdateManyWithWhereWithoutOutcomeCategoryInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutTransactionsInput>
  }

  export type RecurringTransactionUpsertWithWhereUniqueWithoutOutcomeCategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    update: XOR<RecurringTransactionUpdateWithoutOutcomeCategoryInput, RecurringTransactionUncheckedUpdateWithoutOutcomeCategoryInput>
    create: XOR<RecurringTransactionCreateWithoutOutcomeCategoryInput, RecurringTransactionUncheckedCreateWithoutOutcomeCategoryInput>
  }

  export type RecurringTransactionUpdateWithWhereUniqueWithoutOutcomeCategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    data: XOR<RecurringTransactionUpdateWithoutOutcomeCategoryInput, RecurringTransactionUncheckedUpdateWithoutOutcomeCategoryInput>
  }

  export type RecurringTransactionUpdateManyWithWhereWithoutOutcomeCategoryInput = {
    where: RecurringTransactionScalarWhereInput
    data: XOR<RecurringTransactionUpdateManyMutationInput, RecurringTransactionUncheckedUpdateManyWithoutRecurringTransactionInput>
  }

  export type UserCreateWithoutCategoriesInput = {
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetCreateNestedManyWithoutUserInput
    payers?: PayerCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryCreateNestedManyWithoutUserInput
    currencies?: CurrencyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCategoriesInput = {
    id?: number
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    payers?: PayerUncheckedCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedCreateNestedManyWithoutUserInput
    currencies?: CurrencyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCategoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
  }

  export type TransactionCreateWithoutCategoryInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    payer: PayerCreateNestedOneWithoutTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutTransactionsInput
    payFrom: BudgetCreateNestedOneWithoutTransactionsInput
    subcategory?: SubcategoryCreateNestedOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionCreateOrConnectWithoutCategoryInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput>
  }

  export type TransactionCreateManyCategoryInputEnvelope = {
    data: Enumerable<TransactionCreateManyCategoryInput>
    skipDuplicates?: boolean
  }

  export type RecurringTransactionCreateWithoutCategoryInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payer: PayerCreateNestedOneWithoutRecurringTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsCreateNestedManyWithoutTransactionInput
    subcategory?: SubcategoryCreateNestedOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedCreateWithoutCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    currencyId?: number | null
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
    budgets?: TransactionsOnBudgetsUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type RecurringTransactionCreateOrConnectWithoutCategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    create: XOR<RecurringTransactionCreateWithoutCategoryInput, RecurringTransactionUncheckedCreateWithoutCategoryInput>
  }

  export type RecurringTransactionCreateManyCategoryInputEnvelope = {
    data: Enumerable<RecurringTransactionCreateManyCategoryInput>
    skipDuplicates?: boolean
  }

  export type SubcategoryCreateWithoutCategoryInput = {
    name: string
    icon: string
    isDeleted?: boolean
    transactions?: TransactionCreateNestedManyWithoutSubcategoryInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedCreateWithoutCategoryInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    transactions?: TransactionUncheckedCreateNestedManyWithoutSubcategoryInput
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryCreateOrConnectWithoutCategoryInput = {
    where: SubcategoryWhereUniqueInput
    create: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput>
  }

  export type SubcategoryCreateManyCategoryInputEnvelope = {
    data: Enumerable<SubcategoryCreateManyCategoryInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCategoriesInput = {
    update: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
  }

  export type UserUpdateWithoutCategoriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUpdateManyWithoutUserInput
    payers?: PayerUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUpdateManyWithoutUserInput
    currencies?: CurrencyUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUncheckedUpdateManyWithoutUserInput
    payers?: PayerUncheckedUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedUpdateManyWithoutUserInput
    currencies?: CurrencyUncheckedUpdateManyWithoutUserInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutCategoryInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutCategoryInput, TransactionUncheckedUpdateWithoutCategoryInput>
    create: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutCategoryInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutCategoryInput, TransactionUncheckedUpdateWithoutCategoryInput>
  }

  export type TransactionUpdateManyWithWhereWithoutCategoryInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutTransactionsInput>
  }

  export type RecurringTransactionUpsertWithWhereUniqueWithoutCategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    update: XOR<RecurringTransactionUpdateWithoutCategoryInput, RecurringTransactionUncheckedUpdateWithoutCategoryInput>
    create: XOR<RecurringTransactionCreateWithoutCategoryInput, RecurringTransactionUncheckedCreateWithoutCategoryInput>
  }

  export type RecurringTransactionUpdateWithWhereUniqueWithoutCategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    data: XOR<RecurringTransactionUpdateWithoutCategoryInput, RecurringTransactionUncheckedUpdateWithoutCategoryInput>
  }

  export type RecurringTransactionUpdateManyWithWhereWithoutCategoryInput = {
    where: RecurringTransactionScalarWhereInput
    data: XOR<RecurringTransactionUpdateManyMutationInput, RecurringTransactionUncheckedUpdateManyWithoutRecurringTransactionInput>
  }

  export type SubcategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: SubcategoryWhereUniqueInput
    update: XOR<SubcategoryUpdateWithoutCategoryInput, SubcategoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput>
  }

  export type SubcategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: SubcategoryWhereUniqueInput
    data: XOR<SubcategoryUpdateWithoutCategoryInput, SubcategoryUncheckedUpdateWithoutCategoryInput>
  }

  export type SubcategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: SubcategoryScalarWhereInput
    data: XOR<SubcategoryUpdateManyMutationInput, SubcategoryUncheckedUpdateManyWithoutSubCategoriesInput>
  }

  export type SubcategoryScalarWhereInput = {
    AND?: Enumerable<SubcategoryScalarWhereInput>
    OR?: Enumerable<SubcategoryScalarWhereInput>
    NOT?: Enumerable<SubcategoryScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    icon?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    categoryId?: IntFilter | number
  }

  export type CategoryCreateWithoutSubCategoriesInput = {
    name: string
    icon: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutSubCategoriesInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutSubCategoriesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutSubCategoriesInput, CategoryUncheckedCreateWithoutSubCategoriesInput>
  }

  export type TransactionCreateWithoutSubcategoryInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    payer: PayerCreateNestedOneWithoutTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutTransactionsInput
    payFrom: BudgetCreateNestedOneWithoutTransactionsInput
    category: CategoryCreateNestedOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutSubcategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    categoryId: number
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionCreateOrConnectWithoutSubcategoryInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutSubcategoryInput, TransactionUncheckedCreateWithoutSubcategoryInput>
  }

  export type TransactionCreateManySubcategoryInputEnvelope = {
    data: Enumerable<TransactionCreateManySubcategoryInput>
    skipDuplicates?: boolean
  }

  export type RecurringTransactionCreateWithoutSubcategoryInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payer: PayerCreateNestedOneWithoutRecurringTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsCreateNestedManyWithoutTransactionInput
    category: CategoryCreateNestedOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedCreateWithoutSubcategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    currencyId?: number | null
    categoryId: number
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
    budgets?: TransactionsOnBudgetsUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type RecurringTransactionCreateOrConnectWithoutSubcategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    create: XOR<RecurringTransactionCreateWithoutSubcategoryInput, RecurringTransactionUncheckedCreateWithoutSubcategoryInput>
  }

  export type RecurringTransactionCreateManySubcategoryInputEnvelope = {
    data: Enumerable<RecurringTransactionCreateManySubcategoryInput>
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutSubCategoriesInput = {
    update: XOR<CategoryUpdateWithoutSubCategoriesInput, CategoryUncheckedUpdateWithoutSubCategoriesInput>
    create: XOR<CategoryCreateWithoutSubCategoriesInput, CategoryUncheckedCreateWithoutSubCategoriesInput>
  }

  export type CategoryUpdateWithoutSubCategoriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutCategoriesInput
    transactions?: TransactionUpdateManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutCategoryInput
  }

  export type CategoryUncheckedUpdateWithoutSubCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutCategoryInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutSubcategoryInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutSubcategoryInput, TransactionUncheckedUpdateWithoutSubcategoryInput>
    create: XOR<TransactionCreateWithoutSubcategoryInput, TransactionUncheckedCreateWithoutSubcategoryInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutSubcategoryInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutSubcategoryInput, TransactionUncheckedUpdateWithoutSubcategoryInput>
  }

  export type TransactionUpdateManyWithWhereWithoutSubcategoryInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutTransactionsInput>
  }

  export type RecurringTransactionUpsertWithWhereUniqueWithoutSubcategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    update: XOR<RecurringTransactionUpdateWithoutSubcategoryInput, RecurringTransactionUncheckedUpdateWithoutSubcategoryInput>
    create: XOR<RecurringTransactionCreateWithoutSubcategoryInput, RecurringTransactionUncheckedCreateWithoutSubcategoryInput>
  }

  export type RecurringTransactionUpdateWithWhereUniqueWithoutSubcategoryInput = {
    where: RecurringTransactionWhereUniqueInput
    data: XOR<RecurringTransactionUpdateWithoutSubcategoryInput, RecurringTransactionUncheckedUpdateWithoutSubcategoryInput>
  }

  export type RecurringTransactionUpdateManyWithWhereWithoutSubcategoryInput = {
    where: RecurringTransactionScalarWhereInput
    data: XOR<RecurringTransactionUpdateManyMutationInput, RecurringTransactionUncheckedUpdateManyWithoutRecurringTransactionInput>
  }

  export type UserCreateWithoutCurrenciesInput = {
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetCreateNestedManyWithoutUserInput
    payers?: PayerCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryCreateNestedManyWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCurrenciesInput = {
    id?: number
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    payers?: PayerUncheckedCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedCreateNestedManyWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCurrenciesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCurrenciesInput, UserUncheckedCreateWithoutCurrenciesInput>
  }

  export type TransactionCreateWithoutCurrencyInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    payer: PayerCreateNestedOneWithoutTransactionsInput
    payFrom: BudgetCreateNestedOneWithoutTransactionsInput
    category: CategoryCreateNestedOneWithoutTransactionsInput
    subcategory?: SubcategoryCreateNestedOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutCurrencyInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    budgetId: number
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionCreateOrConnectWithoutCurrencyInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutCurrencyInput, TransactionUncheckedCreateWithoutCurrencyInput>
  }

  export type TransactionCreateManyCurrencyInputEnvelope = {
    data: Enumerable<TransactionCreateManyCurrencyInput>
    skipDuplicates?: boolean
  }

  export type RecurringTransactionCreateWithoutCurrencyInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payer: PayerCreateNestedOneWithoutRecurringTransactionsInput
    budgets?: TransactionsOnBudgetsCreateNestedManyWithoutTransactionInput
    category: CategoryCreateNestedOneWithoutRecurringTransactionInput
    subcategory?: SubcategoryCreateNestedOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedCreateWithoutCurrencyInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
    budgets?: TransactionsOnBudgetsUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type RecurringTransactionCreateOrConnectWithoutCurrencyInput = {
    where: RecurringTransactionWhereUniqueInput
    create: XOR<RecurringTransactionCreateWithoutCurrencyInput, RecurringTransactionUncheckedCreateWithoutCurrencyInput>
  }

  export type RecurringTransactionCreateManyCurrencyInputEnvelope = {
    data: Enumerable<RecurringTransactionCreateManyCurrencyInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCurrenciesInput = {
    update: XOR<UserUpdateWithoutCurrenciesInput, UserUncheckedUpdateWithoutCurrenciesInput>
    create: XOR<UserCreateWithoutCurrenciesInput, UserUncheckedCreateWithoutCurrenciesInput>
  }

  export type UserUpdateWithoutCurrenciesInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUpdateManyWithoutUserInput
    payers?: PayerUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUpdateManyWithoutUserInput
    categories?: CategoryUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutCurrenciesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUncheckedUpdateManyWithoutUserInput
    payers?: PayerUncheckedUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedUpdateManyWithoutUserInput
    categories?: CategoryUncheckedUpdateManyWithoutUserInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutCurrencyInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutCurrencyInput, TransactionUncheckedUpdateWithoutCurrencyInput>
    create: XOR<TransactionCreateWithoutCurrencyInput, TransactionUncheckedCreateWithoutCurrencyInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutCurrencyInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutCurrencyInput, TransactionUncheckedUpdateWithoutCurrencyInput>
  }

  export type TransactionUpdateManyWithWhereWithoutCurrencyInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutTransactionsInput>
  }

  export type RecurringTransactionUpsertWithWhereUniqueWithoutCurrencyInput = {
    where: RecurringTransactionWhereUniqueInput
    update: XOR<RecurringTransactionUpdateWithoutCurrencyInput, RecurringTransactionUncheckedUpdateWithoutCurrencyInput>
    create: XOR<RecurringTransactionCreateWithoutCurrencyInput, RecurringTransactionUncheckedCreateWithoutCurrencyInput>
  }

  export type RecurringTransactionUpdateWithWhereUniqueWithoutCurrencyInput = {
    where: RecurringTransactionWhereUniqueInput
    data: XOR<RecurringTransactionUpdateWithoutCurrencyInput, RecurringTransactionUncheckedUpdateWithoutCurrencyInput>
  }

  export type RecurringTransactionUpdateManyWithWhereWithoutCurrencyInput = {
    where: RecurringTransactionScalarWhereInput
    data: XOR<RecurringTransactionUpdateManyMutationInput, RecurringTransactionUncheckedUpdateManyWithoutRecurringTransactionInput>
  }

  export type PayerCreateWithoutTransactionsInput = {
    name: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutPayersInput
    recurringTransactions?: RecurringTransactionCreateNestedManyWithoutPayerInput
  }

  export type PayerUncheckedCreateWithoutTransactionsInput = {
    id?: number
    name: string
    isDeleted?: boolean
    userId: number
    recurringTransactions?: RecurringTransactionUncheckedCreateNestedManyWithoutPayerInput
  }

  export type PayerCreateOrConnectWithoutTransactionsInput = {
    where: PayerWhereUniqueInput
    create: XOR<PayerCreateWithoutTransactionsInput, PayerUncheckedCreateWithoutTransactionsInput>
  }

  export type CurrencyCreateWithoutTransactionsInput = {
    code: string
    exchangeRate: Decimal | number | string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutCurrenciesInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutCurrencyInput
  }

  export type CurrencyUncheckedCreateWithoutTransactionsInput = {
    id?: number
    code: string
    exchangeRate: Decimal | number | string
    isDeleted?: boolean
    userId: number
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutCurrencyInput
  }

  export type CurrencyCreateOrConnectWithoutTransactionsInput = {
    where: CurrencyWhereUniqueInput
    create: XOR<CurrencyCreateWithoutTransactionsInput, CurrencyUncheckedCreateWithoutTransactionsInput>
  }

  export type BudgetCreateWithoutTransactionsInput = {
    value: Decimal | number | string
    currentValue: Decimal | number | string
    name: string
    isDeleted?: boolean
    type: BudgetType
    validMonth: Date | string
    user: UserCreateNestedOneWithoutBudgetsInput
    recurringTransactions?: TransactionsOnBudgetsCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUncheckedCreateWithoutTransactionsInput = {
    id?: number
    value: Decimal | number | string
    currentValue: Decimal | number | string
    name: string
    isDeleted?: boolean
    type: BudgetType
    validMonth: Date | string
    userId: number
    recurringTransactions?: TransactionsOnBudgetsUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetCreateOrConnectWithoutTransactionsInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutTransactionsInput, BudgetUncheckedCreateWithoutTransactionsInput>
  }

  export type CategoryCreateWithoutTransactionsInput = {
    name: string
    icon: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutCategoriesInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutCategoryInput
    subCategories?: SubcategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutTransactionsInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutCategoryInput
    subCategories?: SubcategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutTransactionsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type SubcategoryCreateWithoutTransactionsInput = {
    name: string
    icon: string
    isDeleted?: boolean
    category: CategoryCreateNestedOneWithoutSubCategoriesInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedCreateWithoutTransactionsInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    categoryId: number
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryCreateOrConnectWithoutTransactionsInput = {
    where: SubcategoryWhereUniqueInput
    create: XOR<SubcategoryCreateWithoutTransactionsInput, SubcategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type OutcomeCategoryCreateWithoutTransactionsInput = {
    name: string
    icon: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutOutcomeCategoriesInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryUncheckedCreateWithoutTransactionsInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryCreateOrConnectWithoutTransactionsInput = {
    where: OutcomeCategoryWhereUniqueInput
    create: XOR<OutcomeCategoryCreateWithoutTransactionsInput, OutcomeCategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type IncomeCategoryCreateWithoutTransactionsInput = {
    name: string
    icon: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutIncomeCategoriesInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryUncheckedCreateWithoutTransactionsInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryCreateOrConnectWithoutTransactionsInput = {
    where: IncomeCategoryWhereUniqueInput
    create: XOR<IncomeCategoryCreateWithoutTransactionsInput, IncomeCategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type PayerUpsertWithoutTransactionsInput = {
    update: XOR<PayerUpdateWithoutTransactionsInput, PayerUncheckedUpdateWithoutTransactionsInput>
    create: XOR<PayerCreateWithoutTransactionsInput, PayerUncheckedCreateWithoutTransactionsInput>
  }

  export type PayerUpdateWithoutTransactionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutPayersInput
    recurringTransactions?: RecurringTransactionUpdateManyWithoutPayerInput
  }

  export type PayerUncheckedUpdateWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    recurringTransactions?: RecurringTransactionUncheckedUpdateManyWithoutPayerInput
  }

  export type CurrencyUpsertWithoutTransactionsInput = {
    update: XOR<CurrencyUpdateWithoutTransactionsInput, CurrencyUncheckedUpdateWithoutTransactionsInput>
    create: XOR<CurrencyCreateWithoutTransactionsInput, CurrencyUncheckedCreateWithoutTransactionsInput>
  }

  export type CurrencyUpdateWithoutTransactionsInput = {
    code?: StringFieldUpdateOperationsInput | string
    exchangeRate?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutCurrenciesInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutCurrencyInput
  }

  export type CurrencyUncheckedUpdateWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    exchangeRate?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutCurrencyInput
  }

  export type BudgetUpsertWithoutTransactionsInput = {
    update: XOR<BudgetUpdateWithoutTransactionsInput, BudgetUncheckedUpdateWithoutTransactionsInput>
    create: XOR<BudgetCreateWithoutTransactionsInput, BudgetUncheckedCreateWithoutTransactionsInput>
  }

  export type BudgetUpdateWithoutTransactionsInput = {
    value?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    currentValue?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumBudgetTypeFieldUpdateOperationsInput | BudgetType
    validMonth?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBudgetsInput
    recurringTransactions?: TransactionsOnBudgetsUpdateManyWithoutBudgetInput
  }

  export type BudgetUncheckedUpdateWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    currentValue?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumBudgetTypeFieldUpdateOperationsInput | BudgetType
    validMonth?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    recurringTransactions?: TransactionsOnBudgetsUncheckedUpdateManyWithoutBudgetInput
  }

  export type CategoryUpsertWithoutTransactionsInput = {
    update: XOR<CategoryUpdateWithoutTransactionsInput, CategoryUncheckedUpdateWithoutTransactionsInput>
    create: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type CategoryUpdateWithoutTransactionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutCategoriesInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutCategoryInput
    subCategories?: SubcategoryUpdateManyWithoutCategoryInput
  }

  export type CategoryUncheckedUpdateWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutCategoryInput
    subCategories?: SubcategoryUncheckedUpdateManyWithoutCategoryInput
  }

  export type SubcategoryUpsertWithoutTransactionsInput = {
    update: XOR<SubcategoryUpdateWithoutTransactionsInput, SubcategoryUncheckedUpdateWithoutTransactionsInput>
    create: XOR<SubcategoryCreateWithoutTransactionsInput, SubcategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type SubcategoryUpdateWithoutTransactionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    category?: CategoryUpdateOneRequiredWithoutSubCategoriesInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedUpdateWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: IntFieldUpdateOperationsInput | number
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutSubcategoryInput
  }

  export type OutcomeCategoryUpsertWithoutTransactionsInput = {
    update: XOR<OutcomeCategoryUpdateWithoutTransactionsInput, OutcomeCategoryUncheckedUpdateWithoutTransactionsInput>
    create: XOR<OutcomeCategoryCreateWithoutTransactionsInput, OutcomeCategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type OutcomeCategoryUpdateWithoutTransactionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutOutcomeCategoriesInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryUncheckedUpdateWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutOutcomeCategoryInput
  }

  export type IncomeCategoryUpsertWithoutTransactionsInput = {
    update: XOR<IncomeCategoryUpdateWithoutTransactionsInput, IncomeCategoryUncheckedUpdateWithoutTransactionsInput>
    create: XOR<IncomeCategoryCreateWithoutTransactionsInput, IncomeCategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type IncomeCategoryUpdateWithoutTransactionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutIncomeCategoriesInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryUncheckedUpdateWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutIncomeCategoryInput
  }

  export type PayerCreateWithoutRecurringTransactionsInput = {
    name: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutPayersInput
    transactions?: TransactionCreateNestedManyWithoutPayerInput
  }

  export type PayerUncheckedCreateWithoutRecurringTransactionsInput = {
    id?: number
    name: string
    isDeleted?: boolean
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutPayerInput
  }

  export type PayerCreateOrConnectWithoutRecurringTransactionsInput = {
    where: PayerWhereUniqueInput
    create: XOR<PayerCreateWithoutRecurringTransactionsInput, PayerUncheckedCreateWithoutRecurringTransactionsInput>
  }

  export type CurrencyCreateWithoutRecurringTransactionInput = {
    code: string
    exchangeRate: Decimal | number | string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutCurrenciesInput
    transactions?: TransactionCreateNestedManyWithoutCurrencyInput
  }

  export type CurrencyUncheckedCreateWithoutRecurringTransactionInput = {
    id?: number
    code: string
    exchangeRate: Decimal | number | string
    isDeleted?: boolean
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutCurrencyInput
  }

  export type CurrencyCreateOrConnectWithoutRecurringTransactionInput = {
    where: CurrencyWhereUniqueInput
    create: XOR<CurrencyCreateWithoutRecurringTransactionInput, CurrencyUncheckedCreateWithoutRecurringTransactionInput>
  }

  export type TransactionsOnBudgetsCreateWithoutTransactionInput = {
    createdAt?: Date | string
    budget: BudgetCreateNestedOneWithoutRecurringTransactionsInput
  }

  export type TransactionsOnBudgetsUncheckedCreateWithoutTransactionInput = {
    budgetId: number
    createdAt?: Date | string
  }

  export type TransactionsOnBudgetsCreateOrConnectWithoutTransactionInput = {
    where: TransactionsOnBudgetsWhereUniqueInput
    create: XOR<TransactionsOnBudgetsCreateWithoutTransactionInput, TransactionsOnBudgetsUncheckedCreateWithoutTransactionInput>
  }

  export type TransactionsOnBudgetsCreateManyTransactionInputEnvelope = {
    data: Enumerable<TransactionsOnBudgetsCreateManyTransactionInput>
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutRecurringTransactionInput = {
    name: string
    icon: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutCategoryInput
    subCategories?: SubcategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutRecurringTransactionInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutCategoryInput
    subCategories?: SubcategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutRecurringTransactionInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutRecurringTransactionInput, CategoryUncheckedCreateWithoutRecurringTransactionInput>
  }

  export type SubcategoryCreateWithoutRecurringTransactionInput = {
    name: string
    icon: string
    isDeleted?: boolean
    category: CategoryCreateNestedOneWithoutSubCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedCreateWithoutRecurringTransactionInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    categoryId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryCreateOrConnectWithoutRecurringTransactionInput = {
    where: SubcategoryWhereUniqueInput
    create: XOR<SubcategoryCreateWithoutRecurringTransactionInput, SubcategoryUncheckedCreateWithoutRecurringTransactionInput>
  }

  export type OutcomeCategoryCreateWithoutRecurringTransactionInput = {
    name: string
    icon: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutOutcomeCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryUncheckedCreateWithoutRecurringTransactionInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryCreateOrConnectWithoutRecurringTransactionInput = {
    where: OutcomeCategoryWhereUniqueInput
    create: XOR<OutcomeCategoryCreateWithoutRecurringTransactionInput, OutcomeCategoryUncheckedCreateWithoutRecurringTransactionInput>
  }

  export type IncomeCategoryCreateWithoutRecurringTransactionInput = {
    name: string
    icon: string
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutIncomeCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryUncheckedCreateWithoutRecurringTransactionInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryCreateOrConnectWithoutRecurringTransactionInput = {
    where: IncomeCategoryWhereUniqueInput
    create: XOR<IncomeCategoryCreateWithoutRecurringTransactionInput, IncomeCategoryUncheckedCreateWithoutRecurringTransactionInput>
  }

  export type PayerUpsertWithoutRecurringTransactionsInput = {
    update: XOR<PayerUpdateWithoutRecurringTransactionsInput, PayerUncheckedUpdateWithoutRecurringTransactionsInput>
    create: XOR<PayerCreateWithoutRecurringTransactionsInput, PayerUncheckedCreateWithoutRecurringTransactionsInput>
  }

  export type PayerUpdateWithoutRecurringTransactionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutPayersInput
    transactions?: TransactionUpdateManyWithoutPayerInput
  }

  export type PayerUncheckedUpdateWithoutRecurringTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutPayerInput
  }

  export type CurrencyUpsertWithoutRecurringTransactionInput = {
    update: XOR<CurrencyUpdateWithoutRecurringTransactionInput, CurrencyUncheckedUpdateWithoutRecurringTransactionInput>
    create: XOR<CurrencyCreateWithoutRecurringTransactionInput, CurrencyUncheckedCreateWithoutRecurringTransactionInput>
  }

  export type CurrencyUpdateWithoutRecurringTransactionInput = {
    code?: StringFieldUpdateOperationsInput | string
    exchangeRate?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutCurrenciesInput
    transactions?: TransactionUpdateManyWithoutCurrencyInput
  }

  export type CurrencyUncheckedUpdateWithoutRecurringTransactionInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    exchangeRate?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutCurrencyInput
  }

  export type TransactionsOnBudgetsUpsertWithWhereUniqueWithoutTransactionInput = {
    where: TransactionsOnBudgetsWhereUniqueInput
    update: XOR<TransactionsOnBudgetsUpdateWithoutTransactionInput, TransactionsOnBudgetsUncheckedUpdateWithoutTransactionInput>
    create: XOR<TransactionsOnBudgetsCreateWithoutTransactionInput, TransactionsOnBudgetsUncheckedCreateWithoutTransactionInput>
  }

  export type TransactionsOnBudgetsUpdateWithWhereUniqueWithoutTransactionInput = {
    where: TransactionsOnBudgetsWhereUniqueInput
    data: XOR<TransactionsOnBudgetsUpdateWithoutTransactionInput, TransactionsOnBudgetsUncheckedUpdateWithoutTransactionInput>
  }

  export type TransactionsOnBudgetsUpdateManyWithWhereWithoutTransactionInput = {
    where: TransactionsOnBudgetsScalarWhereInput
    data: XOR<TransactionsOnBudgetsUpdateManyMutationInput, TransactionsOnBudgetsUncheckedUpdateManyWithoutBudgetsInput>
  }

  export type CategoryUpsertWithoutRecurringTransactionInput = {
    update: XOR<CategoryUpdateWithoutRecurringTransactionInput, CategoryUncheckedUpdateWithoutRecurringTransactionInput>
    create: XOR<CategoryCreateWithoutRecurringTransactionInput, CategoryUncheckedCreateWithoutRecurringTransactionInput>
  }

  export type CategoryUpdateWithoutRecurringTransactionInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutCategoriesInput
    transactions?: TransactionUpdateManyWithoutCategoryInput
    subCategories?: SubcategoryUpdateManyWithoutCategoryInput
  }

  export type CategoryUncheckedUpdateWithoutRecurringTransactionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutCategoryInput
    subCategories?: SubcategoryUncheckedUpdateManyWithoutCategoryInput
  }

  export type SubcategoryUpsertWithoutRecurringTransactionInput = {
    update: XOR<SubcategoryUpdateWithoutRecurringTransactionInput, SubcategoryUncheckedUpdateWithoutRecurringTransactionInput>
    create: XOR<SubcategoryCreateWithoutRecurringTransactionInput, SubcategoryUncheckedCreateWithoutRecurringTransactionInput>
  }

  export type SubcategoryUpdateWithoutRecurringTransactionInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    category?: CategoryUpdateOneRequiredWithoutSubCategoriesInput
    transactions?: TransactionUpdateManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedUpdateWithoutRecurringTransactionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutSubcategoryInput
  }

  export type OutcomeCategoryUpsertWithoutRecurringTransactionInput = {
    update: XOR<OutcomeCategoryUpdateWithoutRecurringTransactionInput, OutcomeCategoryUncheckedUpdateWithoutRecurringTransactionInput>
    create: XOR<OutcomeCategoryCreateWithoutRecurringTransactionInput, OutcomeCategoryUncheckedCreateWithoutRecurringTransactionInput>
  }

  export type OutcomeCategoryUpdateWithoutRecurringTransactionInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutOutcomeCategoriesInput
    transactions?: TransactionUpdateManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryUncheckedUpdateWithoutRecurringTransactionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutOutcomeCategoryInput
  }

  export type IncomeCategoryUpsertWithoutRecurringTransactionInput = {
    update: XOR<IncomeCategoryUpdateWithoutRecurringTransactionInput, IncomeCategoryUncheckedUpdateWithoutRecurringTransactionInput>
    create: XOR<IncomeCategoryCreateWithoutRecurringTransactionInput, IncomeCategoryUncheckedCreateWithoutRecurringTransactionInput>
  }

  export type IncomeCategoryUpdateWithoutRecurringTransactionInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutIncomeCategoriesInput
    transactions?: TransactionUpdateManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryUncheckedUpdateWithoutRecurringTransactionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutIncomeCategoryInput
  }

  export type BudgetCreateWithoutRecurringTransactionsInput = {
    value: Decimal | number | string
    currentValue: Decimal | number | string
    name: string
    isDeleted?: boolean
    type: BudgetType
    validMonth: Date | string
    user: UserCreateNestedOneWithoutBudgetsInput
    transactions?: TransactionCreateNestedManyWithoutPayFromInput
  }

  export type BudgetUncheckedCreateWithoutRecurringTransactionsInput = {
    id?: number
    value: Decimal | number | string
    currentValue: Decimal | number | string
    name: string
    isDeleted?: boolean
    type: BudgetType
    validMonth: Date | string
    userId: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutPayFromInput
  }

  export type BudgetCreateOrConnectWithoutRecurringTransactionsInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutRecurringTransactionsInput, BudgetUncheckedCreateWithoutRecurringTransactionsInput>
  }

  export type RecurringTransactionCreateWithoutBudgetsInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payer: PayerCreateNestedOneWithoutRecurringTransactionsInput
    currency?: CurrencyCreateNestedOneWithoutRecurringTransactionInput
    category: CategoryCreateNestedOneWithoutRecurringTransactionInput
    subcategory?: SubcategoryCreateNestedOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedCreateWithoutBudgetsInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    currencyId?: number | null
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type RecurringTransactionCreateOrConnectWithoutBudgetsInput = {
    where: RecurringTransactionWhereUniqueInput
    create: XOR<RecurringTransactionCreateWithoutBudgetsInput, RecurringTransactionUncheckedCreateWithoutBudgetsInput>
  }

  export type BudgetUpsertWithoutRecurringTransactionsInput = {
    update: XOR<BudgetUpdateWithoutRecurringTransactionsInput, BudgetUncheckedUpdateWithoutRecurringTransactionsInput>
    create: XOR<BudgetCreateWithoutRecurringTransactionsInput, BudgetUncheckedCreateWithoutRecurringTransactionsInput>
  }

  export type BudgetUpdateWithoutRecurringTransactionsInput = {
    value?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    currentValue?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumBudgetTypeFieldUpdateOperationsInput | BudgetType
    validMonth?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBudgetsInput
    transactions?: TransactionUpdateManyWithoutPayFromInput
  }

  export type BudgetUncheckedUpdateWithoutRecurringTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    currentValue?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumBudgetTypeFieldUpdateOperationsInput | BudgetType
    validMonth?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutPayFromInput
  }

  export type RecurringTransactionUpsertWithoutBudgetsInput = {
    update: XOR<RecurringTransactionUpdateWithoutBudgetsInput, RecurringTransactionUncheckedUpdateWithoutBudgetsInput>
    create: XOR<RecurringTransactionCreateWithoutBudgetsInput, RecurringTransactionUncheckedCreateWithoutBudgetsInput>
  }

  export type RecurringTransactionUpdateWithoutBudgetsInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payer?: PayerUpdateOneRequiredWithoutRecurringTransactionsInput
    currency?: CurrencyUpdateOneWithoutRecurringTransactionInput
    category?: CategoryUpdateOneRequiredWithoutRecurringTransactionInput
    subcategory?: SubcategoryUpdateOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedUpdateWithoutBudgetsInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserCreateWithoutPayersInput = {
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryCreateNestedManyWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
    currencies?: CurrencyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPayersInput = {
    id?: number
    email: string
    passwordHash: string
    passwordSalt: string
    firstName: string
    lastName: string
    verificationToken?: string | null
    activationStatus?: ActivationStatus
    budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedCreateNestedManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedCreateNestedManyWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    currencies?: CurrencyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPayersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPayersInput, UserUncheckedCreateWithoutPayersInput>
  }

  export type TransactionCreateWithoutPayerInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currency?: CurrencyCreateNestedOneWithoutTransactionsInput
    payFrom: BudgetCreateNestedOneWithoutTransactionsInput
    category: CategoryCreateNestedOneWithoutTransactionsInput
    subcategory?: SubcategoryCreateNestedOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutPayerInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionCreateOrConnectWithoutPayerInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutPayerInput, TransactionUncheckedCreateWithoutPayerInput>
  }

  export type TransactionCreateManyPayerInputEnvelope = {
    data: Enumerable<TransactionCreateManyPayerInput>
    skipDuplicates?: boolean
  }

  export type RecurringTransactionCreateWithoutPayerInput = {
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    currency?: CurrencyCreateNestedOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsCreateNestedManyWithoutTransactionInput
    category: CategoryCreateNestedOneWithoutRecurringTransactionInput
    subcategory?: SubcategoryCreateNestedOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryCreateNestedOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryCreateNestedOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedCreateWithoutPayerInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    currencyId?: number | null
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
    budgets?: TransactionsOnBudgetsUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type RecurringTransactionCreateOrConnectWithoutPayerInput = {
    where: RecurringTransactionWhereUniqueInput
    create: XOR<RecurringTransactionCreateWithoutPayerInput, RecurringTransactionUncheckedCreateWithoutPayerInput>
  }

  export type RecurringTransactionCreateManyPayerInputEnvelope = {
    data: Enumerable<RecurringTransactionCreateManyPayerInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPayersInput = {
    update: XOR<UserUpdateWithoutPayersInput, UserUncheckedUpdateWithoutPayersInput>
    create: XOR<UserCreateWithoutPayersInput, UserUncheckedCreateWithoutPayersInput>
  }

  export type UserUpdateWithoutPayersInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUpdateManyWithoutUserInput
    categories?: CategoryUpdateManyWithoutUserInput
    currencies?: CurrencyUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutPayersInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordSalt?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    activationStatus?: EnumActivationStatusFieldUpdateOperationsInput | ActivationStatus
    budgets?: BudgetUncheckedUpdateManyWithoutUserInput
    outcomeCategories?: OutcomeCategoryUncheckedUpdateManyWithoutUserInput
    incomeCategories?: IncomeCategoryUncheckedUpdateManyWithoutUserInput
    categories?: CategoryUncheckedUpdateManyWithoutUserInput
    currencies?: CurrencyUncheckedUpdateManyWithoutUserInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutPayerInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutPayerInput, TransactionUncheckedUpdateWithoutPayerInput>
    create: XOR<TransactionCreateWithoutPayerInput, TransactionUncheckedCreateWithoutPayerInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutPayerInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutPayerInput, TransactionUncheckedUpdateWithoutPayerInput>
  }

  export type TransactionUpdateManyWithWhereWithoutPayerInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutTransactionsInput>
  }

  export type RecurringTransactionUpsertWithWhereUniqueWithoutPayerInput = {
    where: RecurringTransactionWhereUniqueInput
    update: XOR<RecurringTransactionUpdateWithoutPayerInput, RecurringTransactionUncheckedUpdateWithoutPayerInput>
    create: XOR<RecurringTransactionCreateWithoutPayerInput, RecurringTransactionUncheckedCreateWithoutPayerInput>
  }

  export type RecurringTransactionUpdateWithWhereUniqueWithoutPayerInput = {
    where: RecurringTransactionWhereUniqueInput
    data: XOR<RecurringTransactionUpdateWithoutPayerInput, RecurringTransactionUncheckedUpdateWithoutPayerInput>
  }

  export type RecurringTransactionUpdateManyWithWhereWithoutPayerInput = {
    where: RecurringTransactionScalarWhereInput
    data: XOR<RecurringTransactionUpdateManyMutationInput, RecurringTransactionUncheckedUpdateManyWithoutRecurringTransactionsInput>
  }

  export type BudgetCreateWithoutUserInput = {
    value: Decimal | number | string
    currentValue: Decimal | number | string
    name: string
    isDeleted?: boolean
    type: BudgetType
    validMonth: Date | string
    transactions?: TransactionCreateNestedManyWithoutPayFromInput
    recurringTransactions?: TransactionsOnBudgetsCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUncheckedCreateWithoutUserInput = {
    id?: number
    value: Decimal | number | string
    currentValue: Decimal | number | string
    name: string
    isDeleted?: boolean
    type: BudgetType
    validMonth: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutPayFromInput
    recurringTransactions?: TransactionsOnBudgetsUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetCreateOrConnectWithoutUserInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
  }

  export type BudgetCreateManyUserInputEnvelope = {
    data: Enumerable<BudgetCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type PayerCreateWithoutUserInput = {
    name: string
    isDeleted?: boolean
    transactions?: TransactionCreateNestedManyWithoutPayerInput
    recurringTransactions?: RecurringTransactionCreateNestedManyWithoutPayerInput
  }

  export type PayerUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    isDeleted?: boolean
    transactions?: TransactionUncheckedCreateNestedManyWithoutPayerInput
    recurringTransactions?: RecurringTransactionUncheckedCreateNestedManyWithoutPayerInput
  }

  export type PayerCreateOrConnectWithoutUserInput = {
    where: PayerWhereUniqueInput
    create: XOR<PayerCreateWithoutUserInput, PayerUncheckedCreateWithoutUserInput>
  }

  export type PayerCreateManyUserInputEnvelope = {
    data: Enumerable<PayerCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type OutcomeCategoryCreateWithoutUserInput = {
    name: string
    icon: string
    isDeleted?: boolean
    transactions?: TransactionCreateNestedManyWithoutOutcomeCategoryInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    transactions?: TransactionUncheckedCreateNestedManyWithoutOutcomeCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryCreateOrConnectWithoutUserInput = {
    where: OutcomeCategoryWhereUniqueInput
    create: XOR<OutcomeCategoryCreateWithoutUserInput, OutcomeCategoryUncheckedCreateWithoutUserInput>
  }

  export type OutcomeCategoryCreateManyUserInputEnvelope = {
    data: Enumerable<OutcomeCategoryCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type IncomeCategoryCreateWithoutUserInput = {
    name: string
    icon: string
    isDeleted?: boolean
    transactions?: TransactionCreateNestedManyWithoutIncomeCategoryInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    transactions?: TransactionUncheckedCreateNestedManyWithoutIncomeCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryCreateOrConnectWithoutUserInput = {
    where: IncomeCategoryWhereUniqueInput
    create: XOR<IncomeCategoryCreateWithoutUserInput, IncomeCategoryUncheckedCreateWithoutUserInput>
  }

  export type IncomeCategoryCreateManyUserInputEnvelope = {
    data: Enumerable<IncomeCategoryCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutUserInput = {
    name: string
    icon: string
    isDeleted?: boolean
    transactions?: TransactionCreateNestedManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutCategoryInput
    subCategories?: SubcategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
    transactions?: TransactionUncheckedCreateNestedManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutCategoryInput
    subCategories?: SubcategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutUserInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryCreateManyUserInputEnvelope = {
    data: Enumerable<CategoryCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type CurrencyCreateWithoutUserInput = {
    code: string
    exchangeRate: Decimal | number | string
    isDeleted?: boolean
    transactions?: TransactionCreateNestedManyWithoutCurrencyInput
    recurringTransaction?: RecurringTransactionCreateNestedManyWithoutCurrencyInput
  }

  export type CurrencyUncheckedCreateWithoutUserInput = {
    id?: number
    code: string
    exchangeRate: Decimal | number | string
    isDeleted?: boolean
    transactions?: TransactionUncheckedCreateNestedManyWithoutCurrencyInput
    recurringTransaction?: RecurringTransactionUncheckedCreateNestedManyWithoutCurrencyInput
  }

  export type CurrencyCreateOrConnectWithoutUserInput = {
    where: CurrencyWhereUniqueInput
    create: XOR<CurrencyCreateWithoutUserInput, CurrencyUncheckedCreateWithoutUserInput>
  }

  export type CurrencyCreateManyUserInputEnvelope = {
    data: Enumerable<CurrencyCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type BudgetUpsertWithWhereUniqueWithoutUserInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutUserInput, BudgetUncheckedUpdateWithoutUserInput>
    create: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
  }

  export type BudgetUpdateWithWhereUniqueWithoutUserInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutUserInput, BudgetUncheckedUpdateWithoutUserInput>
  }

  export type BudgetUpdateManyWithWhereWithoutUserInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutBudgetsInput>
  }

  export type BudgetScalarWhereInput = {
    AND?: Enumerable<BudgetScalarWhereInput>
    OR?: Enumerable<BudgetScalarWhereInput>
    NOT?: Enumerable<BudgetScalarWhereInput>
    id?: IntFilter | number
    value?: DecimalFilter | Decimal | number | string
    currentValue?: DecimalFilter | Decimal | number | string
    name?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    type?: EnumBudgetTypeFilter | BudgetType
    validMonth?: DateTimeFilter | Date | string
    userId?: IntFilter | number
  }

  export type PayerUpsertWithWhereUniqueWithoutUserInput = {
    where: PayerWhereUniqueInput
    update: XOR<PayerUpdateWithoutUserInput, PayerUncheckedUpdateWithoutUserInput>
    create: XOR<PayerCreateWithoutUserInput, PayerUncheckedCreateWithoutUserInput>
  }

  export type PayerUpdateWithWhereUniqueWithoutUserInput = {
    where: PayerWhereUniqueInput
    data: XOR<PayerUpdateWithoutUserInput, PayerUncheckedUpdateWithoutUserInput>
  }

  export type PayerUpdateManyWithWhereWithoutUserInput = {
    where: PayerScalarWhereInput
    data: XOR<PayerUpdateManyMutationInput, PayerUncheckedUpdateManyWithoutPayersInput>
  }

  export type PayerScalarWhereInput = {
    AND?: Enumerable<PayerScalarWhereInput>
    OR?: Enumerable<PayerScalarWhereInput>
    NOT?: Enumerable<PayerScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    userId?: IntFilter | number
  }

  export type OutcomeCategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: OutcomeCategoryWhereUniqueInput
    update: XOR<OutcomeCategoryUpdateWithoutUserInput, OutcomeCategoryUncheckedUpdateWithoutUserInput>
    create: XOR<OutcomeCategoryCreateWithoutUserInput, OutcomeCategoryUncheckedCreateWithoutUserInput>
  }

  export type OutcomeCategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: OutcomeCategoryWhereUniqueInput
    data: XOR<OutcomeCategoryUpdateWithoutUserInput, OutcomeCategoryUncheckedUpdateWithoutUserInput>
  }

  export type OutcomeCategoryUpdateManyWithWhereWithoutUserInput = {
    where: OutcomeCategoryScalarWhereInput
    data: XOR<OutcomeCategoryUpdateManyMutationInput, OutcomeCategoryUncheckedUpdateManyWithoutOutcomeCategoriesInput>
  }

  export type OutcomeCategoryScalarWhereInput = {
    AND?: Enumerable<OutcomeCategoryScalarWhereInput>
    OR?: Enumerable<OutcomeCategoryScalarWhereInput>
    NOT?: Enumerable<OutcomeCategoryScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    icon?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    userId?: IntFilter | number
  }

  export type IncomeCategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: IncomeCategoryWhereUniqueInput
    update: XOR<IncomeCategoryUpdateWithoutUserInput, IncomeCategoryUncheckedUpdateWithoutUserInput>
    create: XOR<IncomeCategoryCreateWithoutUserInput, IncomeCategoryUncheckedCreateWithoutUserInput>
  }

  export type IncomeCategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: IncomeCategoryWhereUniqueInput
    data: XOR<IncomeCategoryUpdateWithoutUserInput, IncomeCategoryUncheckedUpdateWithoutUserInput>
  }

  export type IncomeCategoryUpdateManyWithWhereWithoutUserInput = {
    where: IncomeCategoryScalarWhereInput
    data: XOR<IncomeCategoryUpdateManyMutationInput, IncomeCategoryUncheckedUpdateManyWithoutIncomeCategoriesInput>
  }

  export type IncomeCategoryScalarWhereInput = {
    AND?: Enumerable<IncomeCategoryScalarWhereInput>
    OR?: Enumerable<IncomeCategoryScalarWhereInput>
    NOT?: Enumerable<IncomeCategoryScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    icon?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    userId?: IntFilter | number
  }

  export type CategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
  }

  export type CategoryUpdateManyWithWhereWithoutUserInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutCategoriesInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: Enumerable<CategoryScalarWhereInput>
    OR?: Enumerable<CategoryScalarWhereInput>
    NOT?: Enumerable<CategoryScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    icon?: StringFilter | string
    isDeleted?: BoolFilter | boolean
    userId?: IntFilter | number
  }

  export type CurrencyUpsertWithWhereUniqueWithoutUserInput = {
    where: CurrencyWhereUniqueInput
    update: XOR<CurrencyUpdateWithoutUserInput, CurrencyUncheckedUpdateWithoutUserInput>
    create: XOR<CurrencyCreateWithoutUserInput, CurrencyUncheckedCreateWithoutUserInput>
  }

  export type CurrencyUpdateWithWhereUniqueWithoutUserInput = {
    where: CurrencyWhereUniqueInput
    data: XOR<CurrencyUpdateWithoutUserInput, CurrencyUncheckedUpdateWithoutUserInput>
  }

  export type CurrencyUpdateManyWithWhereWithoutUserInput = {
    where: CurrencyScalarWhereInput
    data: XOR<CurrencyUpdateManyMutationInput, CurrencyUncheckedUpdateManyWithoutCurrenciesInput>
  }

  export type CurrencyScalarWhereInput = {
    AND?: Enumerable<CurrencyScalarWhereInput>
    OR?: Enumerable<CurrencyScalarWhereInput>
    NOT?: Enumerable<CurrencyScalarWhereInput>
    id?: IntFilter | number
    code?: StringFilter | string
    exchangeRate?: DecimalFilter | Decimal | number | string
    isDeleted?: BoolFilter | boolean
    userId?: IntFilter | number
  }

  export type TransactionCreateManyPayFromInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionsOnBudgetsCreateManyBudgetInput = {
    transactionId: number
    createdAt?: Date | string
  }

  export type TransactionUpdateWithoutPayFromInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    payer?: PayerUpdateOneRequiredWithoutTransactionsInput
    currency?: CurrencyUpdateOneWithoutTransactionsInput
    category?: CategoryUpdateOneRequiredWithoutTransactionsInput
    subcategory?: SubcategoryUpdateOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutTransactionsInput
  }

  export type TransactionUncheckedUpdateWithoutPayFromInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TransactionUncheckedUpdateManyWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TransactionsOnBudgetsUpdateWithoutBudgetInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: RecurringTransactionUpdateOneRequiredWithoutBudgetsInput
  }

  export type TransactionsOnBudgetsUncheckedUpdateWithoutBudgetInput = {
    transactionId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionsOnBudgetsUncheckedUpdateManyWithoutRecurringTransactionsInput = {
    transactionId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyIncomeCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
  }

  export type RecurringTransactionCreateManyIncomeCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    currencyId?: number | null
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
  }

  export type TransactionUpdateWithoutIncomeCategoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    payer?: PayerUpdateOneRequiredWithoutTransactionsInput
    currency?: CurrencyUpdateOneWithoutTransactionsInput
    payFrom?: BudgetUpdateOneRequiredWithoutTransactionsInput
    category?: CategoryUpdateOneRequiredWithoutTransactionsInput
    subcategory?: SubcategoryUpdateOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutTransactionsInput
  }

  export type TransactionUncheckedUpdateWithoutIncomeCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    budgetId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RecurringTransactionUpdateWithoutIncomeCategoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payer?: PayerUpdateOneRequiredWithoutRecurringTransactionsInput
    currency?: CurrencyUpdateOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsUpdateManyWithoutTransactionInput
    category?: CategoryUpdateOneRequiredWithoutRecurringTransactionInput
    subcategory?: SubcategoryUpdateOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedUpdateWithoutIncomeCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: TransactionsOnBudgetsUncheckedUpdateManyWithoutTransactionInput
  }

  export type RecurringTransactionUncheckedUpdateManyWithoutRecurringTransactionInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TransactionCreateManyOutcomeCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    categoryId: number
    subcategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type RecurringTransactionCreateManyOutcomeCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    currencyId?: number | null
    categoryId: number
    subcategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionUpdateWithoutOutcomeCategoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    payer?: PayerUpdateOneRequiredWithoutTransactionsInput
    currency?: CurrencyUpdateOneWithoutTransactionsInput
    payFrom?: BudgetUpdateOneRequiredWithoutTransactionsInput
    category?: CategoryUpdateOneRequiredWithoutTransactionsInput
    subcategory?: SubcategoryUpdateOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutTransactionsInput
  }

  export type TransactionUncheckedUpdateWithoutOutcomeCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    budgetId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RecurringTransactionUpdateWithoutOutcomeCategoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payer?: PayerUpdateOneRequiredWithoutRecurringTransactionsInput
    currency?: CurrencyUpdateOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsUpdateManyWithoutTransactionInput
    category?: CategoryUpdateOneRequiredWithoutRecurringTransactionInput
    subcategory?: SubcategoryUpdateOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedUpdateWithoutOutcomeCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: TransactionsOnBudgetsUncheckedUpdateManyWithoutTransactionInput
  }

  export type TransactionCreateManyCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type RecurringTransactionCreateManyCategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    currencyId?: number | null
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type SubcategoryCreateManyCategoryInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
  }

  export type TransactionUpdateWithoutCategoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    payer?: PayerUpdateOneRequiredWithoutTransactionsInput
    currency?: CurrencyUpdateOneWithoutTransactionsInput
    payFrom?: BudgetUpdateOneRequiredWithoutTransactionsInput
    subcategory?: SubcategoryUpdateOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutTransactionsInput
  }

  export type TransactionUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    budgetId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RecurringTransactionUpdateWithoutCategoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payer?: PayerUpdateOneRequiredWithoutRecurringTransactionsInput
    currency?: CurrencyUpdateOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsUpdateManyWithoutTransactionInput
    subcategory?: SubcategoryUpdateOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: TransactionsOnBudgetsUncheckedUpdateManyWithoutTransactionInput
  }

  export type SubcategoryUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUpdateManyWithoutSubcategoryInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUncheckedUpdateManyWithoutSubcategoryInput
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedUpdateManyWithoutSubCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TransactionCreateManySubcategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    categoryId: number
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type RecurringTransactionCreateManySubcategoryInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    currencyId?: number | null
    categoryId: number
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionUpdateWithoutSubcategoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    payer?: PayerUpdateOneRequiredWithoutTransactionsInput
    currency?: CurrencyUpdateOneWithoutTransactionsInput
    payFrom?: BudgetUpdateOneRequiredWithoutTransactionsInput
    category?: CategoryUpdateOneRequiredWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutTransactionsInput
  }

  export type TransactionUncheckedUpdateWithoutSubcategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    budgetId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RecurringTransactionUpdateWithoutSubcategoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payer?: PayerUpdateOneRequiredWithoutRecurringTransactionsInput
    currency?: CurrencyUpdateOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsUpdateManyWithoutTransactionInput
    category?: CategoryUpdateOneRequiredWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedUpdateWithoutSubcategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: IntFieldUpdateOperationsInput | number
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: TransactionsOnBudgetsUncheckedUpdateManyWithoutTransactionInput
  }

  export type TransactionCreateManyCurrencyInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    payerId: number
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    budgetId: number
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type RecurringTransactionCreateManyCurrencyInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    payerId: number
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionUpdateWithoutCurrencyInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    payer?: PayerUpdateOneRequiredWithoutTransactionsInput
    payFrom?: BudgetUpdateOneRequiredWithoutTransactionsInput
    category?: CategoryUpdateOneRequiredWithoutTransactionsInput
    subcategory?: SubcategoryUpdateOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutTransactionsInput
  }

  export type TransactionUncheckedUpdateWithoutCurrencyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    budgetId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RecurringTransactionUpdateWithoutCurrencyInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payer?: PayerUpdateOneRequiredWithoutRecurringTransactionsInput
    budgets?: TransactionsOnBudgetsUpdateManyWithoutTransactionInput
    category?: CategoryUpdateOneRequiredWithoutRecurringTransactionInput
    subcategory?: SubcategoryUpdateOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedUpdateWithoutCurrencyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    payerId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: TransactionsOnBudgetsUncheckedUpdateManyWithoutTransactionInput
  }

  export type TransactionsOnBudgetsCreateManyTransactionInput = {
    budgetId: number
    createdAt?: Date | string
  }

  export type TransactionsOnBudgetsUpdateWithoutTransactionInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: BudgetUpdateOneRequiredWithoutRecurringTransactionsInput
  }

  export type TransactionsOnBudgetsUncheckedUpdateWithoutTransactionInput = {
    budgetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionsOnBudgetsUncheckedUpdateManyWithoutBudgetsInput = {
    budgetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyPayerInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    isDeleted?: boolean
    currencyCode?: string | null
    exchangeRate?: Decimal | number | string | null
    currencyId?: number | null
    budgetId: number
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type RecurringTransactionCreateManyPayerInput = {
    id?: number
    date: Date | string
    note: string
    amount: Decimal | number | string
    dayOfPayment: Date | string
    activationDate: Date | string
    isDeleted?: boolean
    currencyId?: number | null
    categoryId: number
    subcategoryId?: number | null
    outcomeCategoryId?: number | null
    incomeCategoryId?: number | null
  }

  export type TransactionUpdateWithoutPayerInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    currency?: CurrencyUpdateOneWithoutTransactionsInput
    payFrom?: BudgetUpdateOneRequiredWithoutTransactionsInput
    category?: CategoryUpdateOneRequiredWithoutTransactionsInput
    subcategory?: SubcategoryUpdateOneWithoutTransactionsInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutTransactionsInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutTransactionsInput
  }

  export type TransactionUncheckedUpdateWithoutPayerInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | number | string | null
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    budgetId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RecurringTransactionUpdateWithoutPayerInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currency?: CurrencyUpdateOneWithoutRecurringTransactionInput
    budgets?: TransactionsOnBudgetsUpdateManyWithoutTransactionInput
    category?: CategoryUpdateOneRequiredWithoutRecurringTransactionInput
    subcategory?: SubcategoryUpdateOneWithoutRecurringTransactionInput
    outcomeCategory?: OutcomeCategoryUpdateOneWithoutRecurringTransactionInput
    incomeCategory?: IncomeCategoryUpdateOneWithoutRecurringTransactionInput
  }

  export type RecurringTransactionUncheckedUpdateWithoutPayerInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: TransactionsOnBudgetsUncheckedUpdateManyWithoutTransactionInput
  }

  export type RecurringTransactionUncheckedUpdateManyWithoutRecurringTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    dayOfPayment?: DateTimeFieldUpdateOperationsInput | Date | string
    activationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    currencyId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    incomeCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BudgetCreateManyUserInput = {
    id?: number
    value: Decimal | number | string
    currentValue: Decimal | number | string
    name: string
    isDeleted?: boolean
    type: BudgetType
    validMonth: Date | string
  }

  export type PayerCreateManyUserInput = {
    id?: number
    name: string
    isDeleted?: boolean
  }

  export type OutcomeCategoryCreateManyUserInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
  }

  export type IncomeCategoryCreateManyUserInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
  }

  export type CategoryCreateManyUserInput = {
    id?: number
    name: string
    icon: string
    isDeleted?: boolean
  }

  export type CurrencyCreateManyUserInput = {
    id?: number
    code: string
    exchangeRate: Decimal | number | string
    isDeleted?: boolean
  }

  export type BudgetUpdateWithoutUserInput = {
    value?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    currentValue?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumBudgetTypeFieldUpdateOperationsInput | BudgetType
    validMonth?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutPayFromInput
    recurringTransactions?: TransactionsOnBudgetsUpdateManyWithoutBudgetInput
  }

  export type BudgetUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    currentValue?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumBudgetTypeFieldUpdateOperationsInput | BudgetType
    validMonth?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutPayFromInput
    recurringTransactions?: TransactionsOnBudgetsUncheckedUpdateManyWithoutBudgetInput
  }

  export type BudgetUncheckedUpdateManyWithoutBudgetsInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    currentValue?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumBudgetTypeFieldUpdateOperationsInput | BudgetType
    validMonth?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayerUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUpdateManyWithoutPayerInput
    recurringTransactions?: RecurringTransactionUpdateManyWithoutPayerInput
  }

  export type PayerUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUncheckedUpdateManyWithoutPayerInput
    recurringTransactions?: RecurringTransactionUncheckedUpdateManyWithoutPayerInput
  }

  export type PayerUncheckedUpdateManyWithoutPayersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OutcomeCategoryUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUpdateManyWithoutOutcomeCategoryInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUncheckedUpdateManyWithoutOutcomeCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutOutcomeCategoryInput
  }

  export type OutcomeCategoryUncheckedUpdateManyWithoutOutcomeCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IncomeCategoryUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUpdateManyWithoutIncomeCategoryInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUncheckedUpdateManyWithoutIncomeCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutIncomeCategoryInput
  }

  export type IncomeCategoryUncheckedUpdateManyWithoutIncomeCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoryUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUpdateManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutCategoryInput
    subCategories?: SubcategoryUpdateManyWithoutCategoryInput
  }

  export type CategoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUncheckedUpdateManyWithoutCategoryInput
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutCategoryInput
    subCategories?: SubcategoryUncheckedUpdateManyWithoutCategoryInput
  }

  export type CategoryUncheckedUpdateManyWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CurrencyUpdateWithoutUserInput = {
    code?: StringFieldUpdateOperationsInput | string
    exchangeRate?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUpdateManyWithoutCurrencyInput
    recurringTransaction?: RecurringTransactionUpdateManyWithoutCurrencyInput
  }

  export type CurrencyUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    exchangeRate?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: TransactionUncheckedUpdateManyWithoutCurrencyInput
    recurringTransaction?: RecurringTransactionUncheckedUpdateManyWithoutCurrencyInput
  }

  export type CurrencyUncheckedUpdateManyWithoutCurrenciesInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    exchangeRate?: DecimalFieldUpdateOperationsInput | Decimal | number | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}