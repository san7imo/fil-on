import { Seo } from '@/components/common/Seo'
import { QuoteClosingSection } from '@/features/quote/sections/QuoteClosingSection'
import { QuoteHeroSection } from '@/features/quote/sections/QuoteHeroSection'
import { QuoteMarketSection } from '@/features/quote/sections/QuoteMarketSection'
import { QuoteTrmSection } from '@/features/quote/sections/QuoteTrmSection'
import { routeSeo } from '@/shared/config/seo'

export function QuotePage() {
  return (
    <>
      <Seo config={routeSeo['/cotizaciones']} />
      <QuoteHeroSection />
      <QuoteTrmSection />
      <QuoteMarketSection
        id="metales-preciosos"
        kind="metals"
        title="Indicadores de mercado."
        text="Oro, plata, cobre, aluminio, platino y paladio se presentan como tablero activo para leer precio, rango, volumen y dirección reciente."
      />
      <QuoteMarketSection
        id="agronomicos"
        kind="agro"
        title="Insumos informativos."
        text="Café, cacao, maíz, soya, trigo y azúcar se consultan como futuros agrícolas para conectar actualidad, logística, inventario y operación en territorio."
      />
      <QuoteClosingSection />
    </>
  )
}
