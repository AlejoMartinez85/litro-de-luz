# Litro de Luz® — Sitio Web

Stack: **Astro 4** + **React** (islands) + **GSAP** (animaciones) + **TypeScript**

## Arrancar en desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:4321

## Construir para producción

```bash
npm run build
npm run preview
```

## Estructura

```
src/
├── components/
│   ├── ui/          # Átomos: Button, MetricCard, Badge, SectionLabel
│   ├── sections/    # Bloques de página: Hero, Problem, Elisa, etc.
│   ├── islands/     # React interactivo: MetricCounter, ImpactGlobe
│   └── layout/      # Navbar, Footer
├── data/            # countries.ts · metrics.ts · testimonials.ts
├── layouts/         # BaseLayout.astro (SEO incluido)
├── pages/           # index · empresas · impacto
├── styles/          # tokens.css · global.css
├── types/           # index.ts
└── utils/           # formatNumber.ts
```

## Próximos pasos

- [ ] Agregar fotos reales de ELISA® y comunidades en `src/assets/images/`
- [ ] Completar secciones: `Elisa.astro`, `HowItWorks.astro`, `ForCompanies.astro`, `Testimonials.astro`, `Awards.astro`, `Partners.astro`
- [ ] Integrar mapa interactivo en `src/components/islands/ImpactGlobe.jsx` con Globe.gl
- [ ] Formulario de contacto ESG en `/empresas#contacto`
- [ ] Agregar favicon y OG image en `public/`
- [ ] Deploy en Vercel: conectar repo y hacer push
