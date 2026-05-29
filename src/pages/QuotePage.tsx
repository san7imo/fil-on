import { QuoteClosingSection } from '@/features/quote/sections/QuoteClosingSection'
import { QuoteHeroSection } from '@/features/quote/sections/QuoteHeroSection'
import { QuoteMarketSection } from '@/features/quote/sections/QuoteMarketSection'

export function QuotePage() {
  return (
    <>
      <QuoteHeroSection />
      <QuoteMarketSection
        id="metales-preciosos"
        kind="metals"
        title="Metales en bolsa, lectura en vivo."
        text="Oro, plata, cobre, aluminio, platino y paladio se presentan como tablero activo para leer precio, rango, volumen y dirección reciente."
      />
      <QuoteMarketSection
        id="agronomicos"
        kind="agro"
        title="Agronómicos en vivo."
        text="Café, cacao, maíz, soya, trigo y azúcar se consultan como futuros agrícolas para conectar el dato con logística, inventario y operación en territorio."
      />
      <QuoteClosingSection />
    </>
  )
}
