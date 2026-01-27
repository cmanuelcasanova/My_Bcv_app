export interface Api_Bcv {
  current: Current
  previous: Previous
  changePercentage: ChangePercentage
}

interface Current {
  usd: number
  eur: number
  date: string
}

interface Previous {
  usd: number
  eur: number
  date: string
}

interface ChangePercentage {
  usd: number
  eur: number
}