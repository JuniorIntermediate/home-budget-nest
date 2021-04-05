export enum OperatorEnum {
  IN = 'IN',
  BETWEEN = 'BETWEEN',
  GT = 'GT',
  LT = 'LT',
  GTE = 'GTE',
  LTE = 'LTE',
  EQ = 'EQ',
  NOT = 'NOT',
  NOT_IN = 'NOT_IN',
  CONTAINS = 'CONTAINS'
}

export enum FieldEnum {
  DATE = 'date',
  AMOUNT = 'amount',
  CURRENCY = 'currencyId',
  PAY_FROM = 'payFromId',
  CATEGORY = 'categoryId',
  SUBCATEGORY = 'subcategoryId',
  OUTCOME_CATEGORY = 'outcomeCategoryId',
  INCOME_CATEGORY = 'incomeCategoryId',
  PAYER = 'payerId',
  NOTE = 'note'
}

export enum OrderDirectionEnum {
  DESC = 'DESC',
  ASC = 'ASC'
}

export enum OrderByFieldEnum {
  DATE = 'date',
  AMOUNT = 'amount',
  CURRENCY = 'code',
  PAY_FROM = 'budgetId',
  SUBCATEGORY = 'subcategoryId',
  OUTCOME_CATEGORY = 'outcomeCategoryId',
  INCOME_CATEGORY = 'incomeCategoryId',
  PAYER = 'payerId',
  NOTE = 'note'
}

export enum GroupByEnum {
  YEAR = 'year',
  MONTH = 'month',
  WEEK = 'week'
}
