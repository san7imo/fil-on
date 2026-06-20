export type MarketCategory = 'precious-metals' | 'agro'

export type PricePoint = {
  label: string
  value: number
}

export type MarketQuote = {
  id: string
  name: string
  symbol: string
  category: MarketCategory
  market: string
  price: number
  change: number
  unit: string
  color: string
  points: PricePoint[]
  sourceName: string
  lastUpdated: string
  high?: number
  low?: number
  volume?: number
}

export type QuoteLoadResult = {
  quotes: MarketQuote[]
  status: 'live' | 'fallback'
  sourceLabel: string
}

type ApiQuoteKind = 'metals' | 'agro'

const buildSeries = (base: number, factors: number[]): PricePoint[] =>
  factors.map((factor, index) => ({
    label: `D-${factors.length - index - 1}`,
    value: Number((base * factor).toFixed(2)),
  }))

export const preciousMetalFallbackQuotes: MarketQuote[] = [
  {
    id: 'gold',
    name: 'Oro',
    symbol: 'XAU/USD',
    category: 'precious-metals',
    market: 'Spot internacional',
    price: 4540.77,
    change: 0.96,
    unit: 'USD/oz troy',
    color: '#d9a63c',
    points: buildSeries(4540.77, [0.998, 0.993, 0.997, 1.004, 1.001, 0.991, 1]),
    sourceName: 'SILV.DATA',
    lastUpdated: '2026-05-29T22:50:38.000Z',
  },
  {
    id: 'silver',
    name: 'Plata',
    symbol: 'XAG/USD',
    category: 'precious-metals',
    market: 'Spot internacional',
    price: 75.3,
    change: -0.47,
    unit: 'USD/oz troy',
    color: '#c7cbd2',
    points: buildSeries(75.3, [0.952, 0.966, 0.981, 0.996, 1.008, 1.005, 1]),
    sourceName: 'SILV.DATA',
    lastUpdated: '2026-05-29T22:50:39.000Z',
  },
  {
    id: 'copper',
    name: 'Cobre',
    symbol: 'HG/USD',
    category: 'precious-metals',
    market: 'COMEX / spot',
    price: 6.39,
    change: -0.42,
    unit: 'USD/lb',
    color: '#e06f3a',
    points: buildSeries(6.39, [0.928, 0.949, 0.965, 0.986, 1.011, 1.004, 1]),
    sourceName: 'SILV.DATA',
    lastUpdated: '2026-05-29T22:50:20.000Z',
  },
  {
    id: 'aluminum',
    name: 'Aluminio',
    symbol: 'ALI=F',
    category: 'precious-metals',
    market: 'COMEX',
    price: 3656.75,
    change: 0.54,
    unit: 'USD/t',
    color: '#8fd3d8',
    points: buildSeries(3656.75, [0.986, 0.992, 1.004, 1.011, 0.997, 1.006, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'platinum',
    name: 'Platino',
    symbol: 'XPT/USD',
    category: 'precious-metals',
    market: 'Spot internacional',
    price: 1922.9,
    change: -0.07,
    unit: 'USD/oz troy',
    color: '#dad1c8',
    points: buildSeries(1922.9, [0.978, 0.986, 0.993, 1.002, 1.008, 1.001, 1]),
    sourceName: 'SILV.DATA',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'palladium',
    name: 'Paladio',
    symbol: 'XPD/USD',
    category: 'precious-metals',
    market: 'Spot internacional',
    price: 1368.5,
    change: -1.09,
    unit: 'USD/oz troy',
    color: '#b98460',
    points: buildSeries(1368.5, [1.075, 1.061, 1.044, 1.027, 1.011, 0.996, 1]),
    sourceName: 'SILV.DATA',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
]

export const agronomicFallbackQuotes: MarketQuote[] = [
  {
    id: 'coffee',
    name: 'Café',
    symbol: 'KC=F',
    category: 'agro',
    market: 'ICE Futures',
    price: 265.9,
    change: -12.89,
    unit: 'USX/lb',
    color: '#7a4a2b',
    points: buildSeries(265.9, [1.148, 1.09, 1.055, 1.021, 0.994, 0.983, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'cocoa',
    name: 'Cacao',
    symbol: 'CC=F',
    category: 'agro',
    market: 'ICE Futures',
    price: 3901,
    change: -4.6,
    unit: 'USD/t',
    color: '#7d3d21',
    points: buildSeries(3901, [1.046, 1.028, 1.012, 0.991, 0.982, 1.006, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'corn',
    name: 'Maíz',
    symbol: 'ZC=F',
    category: 'agro',
    market: 'CBOT',
    price: 447,
    change: 1.15,
    unit: 'USX/bu',
    color: '#c8903e',
    points: buildSeries(447, [0.986, 0.991, 1.002, 1.008, 0.997, 1.01, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'soybean',
    name: 'Soya',
    symbol: 'ZS=F',
    category: 'agro',
    market: 'CBOT',
    price: 1186.5,
    change: 0.72,
    unit: 'USX/bu',
    color: '#8f8f45',
    points: buildSeries(1186.5, [0.981, 0.993, 1.004, 0.998, 1.006, 1.012, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'wheat',
    name: 'Trigo',
    symbol: 'ZW=F',
    category: 'agro',
    market: 'CBOT',
    price: 610.25,
    change: -0.33,
    unit: 'USX/bu',
    color: '#e0b84e',
    points: buildSeries(610.25, [1.01, 0.998, 0.986, 0.991, 1.004, 0.997, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'sugar',
    name: 'Azúcar',
    symbol: 'SB=F',
    category: 'agro',
    market: 'ICE Futures',
    price: 14.07,
    change: 0.21,
    unit: 'USX/lb',
    color: '#c7e5d3',
    points: buildSeries(14.07, [0.992, 1.006, 0.998, 1.012, 1.004, 0.996, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
]

function isPricePoint(value: unknown): value is PricePoint {
  if (!value || typeof value !== 'object') return false
  const point = value as PricePoint
  return typeof point.label === 'string' && typeof point.value === 'number'
}

function isMarketQuote(value: unknown): value is MarketQuote {
  if (!value || typeof value !== 'object') return false
  const quote = value as MarketQuote

  return (
    typeof quote.id === 'string' &&
    typeof quote.name === 'string' &&
    typeof quote.symbol === 'string' &&
    (quote.category === 'precious-metals' || quote.category === 'agro') &&
    typeof quote.market === 'string' &&
    typeof quote.price === 'number' &&
    typeof quote.change === 'number' &&
    typeof quote.unit === 'string' &&
    typeof quote.color === 'string' &&
    Array.isArray(quote.points) &&
    quote.points.every(isPricePoint) &&
    typeof quote.sourceName === 'string' &&
    typeof quote.lastUpdated === 'string'
  )
}

function isQuoteLoadResult(value: unknown): value is QuoteLoadResult {
  if (!value || typeof value !== 'object') return false
  const result = value as QuoteLoadResult

  return (
    Array.isArray(result.quotes) &&
    result.quotes.every(isMarketQuote) &&
    (result.status === 'live' || result.status === 'fallback') &&
    typeof result.sourceLabel === 'string'
  )
}

async function loadQuotesFromApi(
  kind: ApiQuoteKind,
  fallback: MarketQuote[],
  sourceLabel: string,
): Promise<QuoteLoadResult> {
  try {
    const response = await fetch(`/api/market-quotes?kind=${kind}`, {
      headers: { accept: 'application/json' },
    })
    if (!response.ok) throw new Error('Market quote API failed')

    const payload = await response.json()
    if (!isQuoteLoadResult(payload) || payload.quotes.length === 0) {
      throw new Error('Invalid market quote API payload')
    }

    return payload
  } catch {
    return {
      quotes: fallback,
      status: 'fallback',
      sourceLabel,
    }
  }
}

export async function loadPreciousMetalQuotes(): Promise<QuoteLoadResult> {
  return loadQuotesFromApi('metals', preciousMetalFallbackQuotes, 'SILV.DATA / Yahoo Finance')
}

export async function loadAgronomicQuotes(): Promise<QuoteLoadResult> {
  return loadQuotesFromApi('agro', agronomicFallbackQuotes, 'Yahoo Finance')
}
