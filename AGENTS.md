# AGENTS.md

## Objetivo
Este archivo define las reglas de diseno, contenido y ejecucion para construir el resto de paginas de `fil-ontech-landing-nueva` siguiendo la identidad ya implementada en el home.

Cada pagina se desarrollara como un `hito` independiente. Cada hito debe dividirse en `subhitos` por seccion para poder construir, revisar y ajustar la pagina por partes.

## Alcance inicial
Paginas a desarrollar despues del home:

1. `Somos`
2. `Servicios`
3. `Cotizaciones`
4. `Contacto`

## Regla principal
No inventar un sistema visual nuevo para paginas internas. Todo debe sentirse parte del mismo lenguaje del home.

## Referencias obligatorias del home
Antes de construir cualquier pagina, usar como referencia directa:

- `src/features/home/sections/HomeHeroSection.tsx`
- `src/features/home/sections/HomeIndustrialGridSection.tsx`
- `src/features/home/sections/HomeSocialImpactSection.tsx`
- `src/features/home/sections/HomeMiningTransformationSection.tsx`
- `src/features/home/sections/HomeWhyChooseSection.tsx`
- `src/components/common/SiteHeader.tsx`
- `src/components/common/SiteFooter.tsx`

## Reglas visuales no negociables

### 1. Identidad general
- Mantener el contraste entre fondos claros `#f7f5f2` / `#f1efec` y acentos calidos rosa, cobre, arena y marron.
- Mantener titulares grandes, pesados, condensados visualmente y con tracking negativo.
- Mantener mezcla entre secciones limpias y secciones atmosfericas con imagen de fondo.
- Evitar layouts genericos de SaaS. Las paginas deben sentirse editoriales, corporativas y territoriales.

### 2. Estructura por pagina
Cada pagina debe tener entre 4 y 6 bloques principales:

1. Hero propio de pagina
2. Seccion narrativa o comercial principal
3. Seccion de respaldo visual o de capacidades
4. Seccion intermedia con mayor atmosfera visual
5. CTA o cierre orientado a conversion

### 3. Tipografia y composicion
- Priorizar bloques grandes de titulo en 2 o 3 lineas.
- Usar parrafos cortos o medianos. No saturar las secciones con texto largo.
- Mantener composiciones asimetricas: texto a un lado, imagen o forma al otro.
- Mantener ghost text, labels, eyebrow pills y bloques con cards cuando aporten jerarquia.

### 4. Movimiento y transiciones
- Mantener `motion/react` como sistema de entrada y scroll.
- Las entradas deben seguir la familia ya usada en home: `opacity + x/y`, `scaleX`, `whileInView`, `useScroll`, `useMotionValueEvent`.
- `figurageometrica.webp` debe reutilizarse con efecto de rotacion ligado al scroll en 1 o 2 secciones por pagina.
- No agregar animaciones nuevas que rompan el lenguaje actual. Todo debe sentirse de la misma familia del home.

### 5. Imagenes y fondos
- `fondoheroyfooter.webp` debe usarse en algunas secciones intermedias o cierres, no solo en hero/footer.
- Las imagenes deben ocupar un rol claro: hero, banda editorial, collage o respaldo de confianza.
- Evitar usar las imagenes solo como relleno. Cada una debe tener una funcion narrativa.

## Reglas de contenido

### 1. Fuente de contenido permitida
Se puede reutilizar y adaptar contenido del proyecto:

- `/home/san7imo/Escritorio/Proyectos/fil-ontech`

### 2. Exclusiones obligatorias
Eliminar o evitar cualquier contenido relacionado con:

- cripto
- crypto
- blockchain
- tokenizacion
- tokens
- DeFi
- wallet
- NFT
- bitcoin
- ethereum
- marketplace cripto

### 3. Temas validos para reutilizar
Si son utiles para las nuevas paginas, se pueden adaptar estos enfoques:

- capital y liquidez
- creditos, microcreditos, factoring, leasing, confirming
- dispersion
- pasarela de pagos
- servicios digitales
- herramientas de gestion
- cumplimiento inteligente
- prevencion de riesgos regulatorios
- inclusion financiera
- trazabilidad
- operacion en territorio
- crecimiento del ecosistema agrominero

### 4. Voz y tono
- Hablar de economia real, operacion, territorio, control, trazabilidad, confianza y ejecucion.
- Evitar frases vacias de marketing.
- Mantener tono corporativo, sobrio y directo.
- Reforzar mineria, agroindustria, industria estrategica y cobertura territorial.

## Mapa de imagenes y usos sugeridos

### `src/assets/agromineria-sembradora.webp`
- Imagen panoramica amplia con maquinaria sobre cultivo.
- Mejor uso: hero de `Servicios` o banda intermedia de `Cotizaciones`.
- Funcion: mostrar escala operativa y precision en campo.

### `src/assets/agromineria.webp`
- Vista aerea diagonal con cosecha y transferencia de carga.
- Mejor uso: seccion de capacidades, operacion o eficiencia.
- Funcion: reforzar ejecucion, logistica y movimiento real.

### `src/assets/siembraagrominera.webp`
- Vista superior con patron repetitivo de cultivo y maquinaria.
- Mejor uso: seccion de metricas, trazabilidad o proceso.
- Funcion: mostrar orden, sistema, cobertura y lectura tecnica.

### `src/assets/siembra.webp`
- Campo al amanecer con una lectura mas emocional e institucional.
- Mejor uso: `Somos`, manifiesto, vision o CTA final.
- Funcion: dar aire, confianza y horizonte.

### `src/assets/tres-imagenes.webp`
- Collage de agro, mineria e industria/personas.
- Mejor uso: `Somos` o una seccion de sectores atendidos.
- Funcion: explicar el cruce entre territorio, operacion e industria.

### `src/assets/fondoheroyfooter.webp`
- Fondo atmosferico calido ya integrado al lenguaje del sitio.
- Mejor uso: hero interno, banda editorial, CTA intermedio o cierre.
- Funcion: continuidad visual con home y footer.

### `src/assets/figurageometrica.webp`
- Elemento grafico de marca.
- Mejor uso: 1 o 2 secciones por pagina.
- Funcion: conectar visualmente el resto del sitio con el hero y `WhyChoose` del home.

## Reglas de implementacion

### Estructura de archivos
- Cada pagina debe vivir en su propio folder de `features`.
- Cada seccion nueva debe ser un componente independiente.
- Mantener nombres consistentes, por ejemplo:
  - `src/features/about/sections/AboutHeroSection.tsx`
  - `src/features/services/sections/ServicesCapabilitiesSection.tsx`
  - `src/features/quote/sections/QuoteRequirementsSection.tsx`
  - `src/features/contact/sections/ContactPresenceSection.tsx`

### Regla sobre placeholders actuales
- `PageHero.tsx` y las secciones placeholder actuales son base temporal.
- Cada hito debe reemplazar o evolucionar esas piezas por secciones reales alineadas con el home.
- No construir las paginas finales apoyandose solo en `panel` + `SectionHeading`.

### Reutilizacion
- Reutilizar patrones del home cuando aporte coherencia:
  - heroes full-bleed
  - cards grandes con ghost text
  - bloques editoriales con imagen y acento geometrico
  - bandas CTA con reveal horizontal
  - estadisticas o bullets con peso visual alto

## Hito 0: Preparacion compartida
Este hito debe completarse antes o durante el primer desarrollo de pagina si hace falta infraestructura comun.

### Subhitos
0.1 Evaluar si `PageHero.tsx` debe evolucionar o ser reemplazado por heroes especificos por pagina.
0.2 Identificar helpers y patrones de animacion reutilizables del home.
0.3 Definir si conviene crear un util compartido para la rotacion en scroll de `figurageometrica.webp`.
0.4 Corregir copys globales que aun arrastren lenguaje viejo o demasiado placeholder.

## Hito 1: Pagina `Somos`
Objetivo: convertir `Somos` en una pagina institucional con narrativa, credibilidad y relacion entre territorio, operacion y vision.

### Subhitos
1.1 Hero institucional
- Hero con mas caracter que `PageHero`.
- Usar `fondoheroyfooter.webp` como base o `siembra.webp` si se necesita una lectura mas abierta.
- Copy enfocado en esencia, territorio, confianza y ejecucion.

1.2 Seccion de relato y posicionamiento
- Bloque editorial de 2 columnas.
- Texto sobre economia real, industrias estrategicas y acompanamiento operativo.
- Puede usar `figurageometrica.webp` como acento secundario.

1.3 Seccion de sectores o presencia
- Usar `tres-imagenes.webp`.
- Mostrar cruce entre agro, mineria e industria.
- Puede resolverse como collage + bullets de capacidades.

1.4 Seccion de metodo o forma de trabajo
- Explicar como Fil-On conecta capital, tecnologia, control y cumplimiento.
- Reutilizar composicion de cards o una secuencia por pasos.
- Incluir una seccion con `figurageometrica.webp` en scroll.

1.5 CTA de cierre
- Fondo con `fondoheroyfooter.webp` o `siembra.webp`.
- CTA hacia `Contacto` o `Cotizaciones`.

## Hito 2: Pagina `Servicios`
Objetivo: bajar a oferta concreta sin perder el tono institucional del home.

### Subhitos
2.1 Hero de servicios
- Usar `agromineria-sembradora.webp`.
- Hablar de soluciones financieras, operativas y tecnologicas para sectores estrategicos.

2.2 Seccion de arquitectura de soluciones
- Evolucionar la logica de `HomeIndustrialGridSection`.
- Mantener `Capital`, `Tech`, `Guardian`, `Secure/LegalTech`.
- Excluir cualquier derivacion cripto.

2.3 Secciones detalle por solucion
- Una banda o bloque por servicio.
- Cada servicio con propuesta breve + 3 a 5 capacidades.
- Lista valida:
  - Capital: creditos, microcreditos, factoring, leasing, confirming
  - Tech: dispersion, pasarela de pagos, servicios digitales, herramientas de gestion
  - Guardian: tarjetas corporativas, sistema de tarjeta para empresas, control operativo
  - Secure / LegalTech: compliance digital, prevencion de riesgos regulatorios, asesoria regulatoria

2.4 Seccion de sectores y operacion
- Usar `agromineria.webp` o `siembraagrominera.webp`.
- Enfatizar trazabilidad, escalabilidad y presencia en territorio.

2.5 CTA final
- Puede reutilizar fondo atmosferico calido y ribbon CTA coherente con home.

## Hito 3: Pagina `Cotizaciones`
Objetivo: convertir interes comercial en una solicitud clara y ordenada.

### Subhitos
3.1 Hero de conversion
- Usar `agromineria-sembradora.webp` o `fondoheroyfooter.webp`.
- Mensaje centrado en claridad, tiempos y viabilidad operativa.

3.2 Seccion de que se puede solicitar
- Cards por tipo de requerimiento:
  - capital de trabajo
  - herramientas de pago
  - tecnologia operativa
  - cumplimiento y soporte regulatorio

3.3 Seccion de proceso
- Evolucionar la base actual `QuoteProcessSection`.
- Proceso en pasos, visual y directo.
- Idealmente con una lectura mas premium que la actual.

3.4 Seccion de requisitos o informacion minima
- Checklist de datos necesarios.
- Debe reducir friccion y filtrar briefs poco claros.

3.5 CTA o formulario futuro
- Espacio preparado para integracion posterior.
- Cierre con alta confianza y contacto directo.

## Hito 4: Pagina `Contacto`
Objetivo: convertir la pagina en un punto de conversacion serio, no solo en una lista de datos.

### Subhitos
4.1 Hero de contacto
- Puede usar `siembra.webp` o `fondoheroyfooter.webp`.
- Mensaje orientado a acompanamiento, cobertura y respuesta.

4.2 Canales principales
- Evolucionar `ContactChannelsSection`.
- Dar mas presencia a telefono, correo y ubicacion.
- Visualmente debe sentirse consistente con home, no como tabla simple.

4.3 Seccion de presencia o cobertura
- Mostrar que la confianza se construye en territorio.
- Puede usar `tres-imagenes.webp` o `agromineria.webp`.

4.4 Seccion de confianza / FAQ breve
- Responder que tipo de proyectos atienden, tiempos de respuesta y cobertura.
- Mantener tono sobrio.

4.5 CTA final
- Redireccion a cotizacion o contacto directo.
- Incluir `figurageometrica.webp` en una de las secciones de esta pagina.

## Criterios de cierre por pagina
Una pagina solo se considera terminada si cumple todo esto:

- Tiene hero propio alineado con el home.
- Tiene minimo 4 secciones reales, no placeholders.
- Usa al menos 1 imagen fuerte del set disponible.
- Usa `figurageometrica.webp` en 1 o 2 secciones con movimiento coherente.
- Tiene al menos 1 bloque con atmosfera basada en `fondoheroyfooter.webp` o una imagen equivalente.
- No contiene referencias a cripto o blockchain.
- Se ve consistente en desktop y mobile.
- Mantiene la calidad tipografica, espacial y cromatica del home.

## Orden de trabajo recomendado

1. `Somos`
2. `Servicios`
3. `Cotizaciones`
4. `Contacto`

## Modo de ejecucion
- Trabajar siempre `hito por hito`.
- Dentro de cada hito, desarrollar `subhito por subhito`.
- No abrir varias paginas grandes a la vez.
- Al terminar cada subhito, revisar:
  - coherencia visual
  - legibilidad
  - uso correcto de imagenes
  - continuidad con header y footer

## Nota final
Si en algun punto una pagina empieza a sentirse demasiado generica, volver al home y corregir. El objetivo no es solo completar rutas; es extender el sistema visual y narrativo ya construido.
