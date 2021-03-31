export interface ExternalCurrencyInterface {
  currency: string,
  code: string,
  mid: number
}

export interface ExternalApiResponseInterface {
  rates: ExternalCurrencyInterface[]
}
