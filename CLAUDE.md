# Litro de Luz® — Contexto del proyecto para Claude Code

## Qué es este proyecto

Sitio web de **Litro de Luz®**, empresa de tecnología de energía solar que lleva infraestructura de luz e internet a comunidades sin acceso a la red eléctrica. Presencia en 35 países, +550.000 beneficiarios.

**Esto NO es el sitio de una ONG.** Es una empresa de impacto con modelo de negocio B2B: marcas corporativas financian infraestructura solar a cambio de métricas ESG verificadas.

---

## Stack

- **Framework:** Astro 4 (output estático)
- **Islands interactivos:** React 18 (solo donde hay interactividad real)
- **Animaciones:** GSAP + ScrollTrigger
- **Lenguaje:** TypeScript en todo lo que no sea `.astro`
- **Estilos:** CSS puro con variables (sin Tailwind, sin CSS-in-JS)
- **Deploy target:** Vercel / static hosting

---

## Arquitectura de carpetas

```
src/
├── components/
│   ├── ui/          # Átomos reutilizables (Button, MetricCard, Badge, SectionLabel)
│   ├── sections/    # Bloques de página (Hero, Problem, Elisa, etc.)
│   ├── islands/     # React con client:visible (MetricCounter, ImpactGlobe)
│   └── layout/      # Navbar, Footer
├── data/            # Datos estáticos en TypeScript (countries, metrics, testimonials)
├── layouts/         # BaseLayout.astro — incluye SEO completo
├── pages/           # Una página por ruta (index, empresas, impacto)
├── styles/          # tokens.css + global.css
├── types/           # index.ts — interfaces compartidas
└── utils/           # formatNumber.ts, animations.ts
```

**Regla clave:** si un componente necesita `useState` o interacción JS, va en `islands/` con `client:visible`. Si es HTML estático, va en `sections/` o `ui/` como `.astro`.

---

## Design system

### Colores (variables CSS en `src/styles/tokens.css`)

| Variable | Valor | Uso |
|---|---|---|
| `--color-primary` | `#38b6ff` | Azul cielo — identidad visual, fondos, acentos gráficos |
| `--color-primary-dark` | `#1a9ee0` | CTAs, botones, links — garantiza contraste WCAG AA |
| `--color-primary-light` | `#e8f6ff` | Hover de botón secundario, fondos suaves |
| `--color-accent` | `#E8621A` | Naranja solar — energía, CTAs secundarios, highlights |
| `--color-bg` | `#ffffff` | Fondo dominante |
| `--color-bg-soft` | `#F0F8FF` | Secciones alternas (azul hielo muy suave) |
| `--color-bg-dark` | `#0D1A2E` | Secciones oscuras para estadísticas de impacto |
| `--color-text-primary` | `#0D1A2E` | Texto principal |
| `--color-text-secondary` | `#4A5568` | Subtítulos, cuerpo de texto |
| `--color-success` | `#16a34a` | Badges ESG verificado |

**Regla de contraste:** `#38b6ff` se usa como fondo o elemento gráfico grande. Para texto/botón interactivo sobre fondo blanco, siempre usar `#1a9ee0`.

### Tipografía

- **Display / Headlines:** `Plus Jakarta Sans` — weight 700/800
- **Body:** `Inter` — weight 400/500/600
- Escala definida en tokens: `--text-hero` hasta `--text-caption`
- Headlines siempre con `letter-spacing: -0.02em` o `-0.03em`

### Espaciado

Sistema de escala en `tokens.css`: `--space-1` (4px) hasta `--space-32` (128px). Usar siempre variables, nunca valores arbitrarios.

---

## Convenciones de código

### Componentes Astro
```astro
---
// Props con interface tipada siempre
interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}
const { title, variant = 'primary' } = Astro.props;
---
<!-- HTML semántico con roles ARIA cuando aplique -->
<section aria-labelledby="section-id">
  <h2 id="section-id">{title}</h2>
</section>

<style>
  /* Estilos scoped — usar variables de tokens, nunca valores hardcoded */
</style>
```

### Islands React
```jsx
// Siempre con client:visible — solo cargan cuando entran al viewport
// <MiComponente client:visible />
// Usar CSS variables de tokens para estilos inline si es necesario
```

### Animaciones GSAP
```js
// Siempre importar ScrollTrigger y registrarlo
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Patrón estándar para entradas por scroll:
gsap.fromTo('.mi-seccion .gsap-hidden',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.mi-seccion', start: 'top 75%' } }
);
```

Agregar clase `gsap-hidden` a elementos que deben animarse al entrar.

---

## Accesibilidad — reglas no negociables

- Cada `<section>` debe tener `aria-labelledby` apuntando a su heading
- Imágenes decorativas: `alt=""` y `aria-hidden="true"`
- Imágenes informativas: `alt` descriptivo real
- Listas de navegación: `role="list"` en `<ul>` con reset de CSS
- Focus visible siempre (ya definido en `global.css`)
- Nunca remover el outline de focus sin reemplazarlo
- Contraste mínimo WCAG AA en todo texto

---

## SEO

`BaseLayout.astro` ya maneja: title, description, canonical, OG, Twitter cards.

Al crear una página nueva, siempre pasar props:
```astro
<BaseLayout
  title="Título específico — Litro de Luz®"
  description="Descripción de 150-160 caracteres con keywords naturales."
>
```

`astro.config.mjs` ya tiene `site: 'https://litrodeluz.org'` configurado.

---

## Voz de marca y copy

| ✅ Correcto | ❌ Evitar |
|---|---|
| "Llevamos luz solar donde la red no llega" | "Ayudamos a comunidades vulnerables" |
| "Certifica tu impacto ESG" | "Contáctanos" |
| "100 ELISA® instaladas cada día" | "Esperamos generar un cambio" |
| "Infraestructura solar verificada" | "Donación de postes" |

**CTAs:** siempre empezar con verbo de acción específico. Nunca "Ver más", "Saber más", "Submit".

**Tono:** startup de tecnología solar, no ONG. Bold, optimista, técnico con propósito.

---

## Datos del negocio (no inventar, usar `src/data/`)

- **Producto:** ELISA® (Energy · Light · Inclusive · Sustainable · Affordable)
- **Fundador:** Camilo Herrera — "Ambassador of Light"
- **Impacto:** +550.728 beneficiarios · 7.000+ ELISA · 35 países · 500+ comunidades · 100 ELISA/día
- **Modelo:** marca paga $699/ELISA + $99/año por métricas → comunidad recibe energía + internet gratis
- **Emails:** ana@unlitrodeluzcolombia.org · gerencia@unlitrodeluzcolombia.org
- **Redes:** @unlitrodeluzcol (Twitter) · /unlitrodeluzcol (Facebook) · /user/unlitrodeluzcolombia (YouTube)

---

## Estado actual del proyecto

### Construido ✅
- `BaseLayout.astro` — SEO completo
- `Navbar.astro` — sticky con blur, responsive
- `Footer.astro` — links, redes, legal
- `Button.astro` — variantes primary / secondary / ghost, tamaños sm/md/lg
- `MetricCard.astro` — card con animación de contador
- `SectionLabel.astro` — eyebrow label
- `Hero.astro` — hero completo con GSAP
- `Problem.astro` — sección de estadísticas del problema
- `FinalCTA.astro` — sección de cierre con CTAs
- `MetricCounter.jsx` — island con contador animado por IntersectionObserver
- `pages/index.astro` — home (Hero + Problem + FinalCTA)
- `pages/empresas.astro` — stub con hero
- `pages/impacto.astro` — contadores + placeholder del mapa
- `src/data/` — countries.ts (35 países), metrics.ts, testimonials.ts
- `src/styles/tokens.css` — design system completo
- `src/styles/global.css` — reset + utilidades

### Pendiente de construir 🔲
- `sections/Elisa.astro` — presentación del producto ELISA® con specs técnicos
- `sections/HowItWorks.astro` — modelo de negocio en 3 pasos
- `sections/ForCompanies.astro` — propuesta de valor ESG con cards
- `sections/Testimonials.astro` — historias de comunidades
- `sections/Awards.astro` — reconocimientos y prensa
- `sections/Partners.astro` — logos de aliados
- `islands/ImpactGlobe.jsx` — mapa/globo interactivo con Globe.gl y datos de `countries.ts`
- Formulario de contacto ESG en `/empresas`
- Imágenes reales en `src/assets/images/` (actualmente placeholders)
- Favicon y OG image en `public/`

---

## Comandos

```bash
npm run dev      # Servidor de desarrollo en localhost:4321
npm run build    # Build estático en dist/
npm run preview  # Preview del build
```
