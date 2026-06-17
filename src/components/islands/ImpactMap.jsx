import { useMemo, useState } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import world from '@/data/world-110m.json';

/**
 * ImpactMap — mapa de presencia global de Litro de Luz®
 *
 * Render con d3-geo (geoEqualEarth + geoPath) sobre topojson real → SVG plano.
 * Sin react-simple-maps (su MapProvider rompe los hooks en React 18 + Astro).
 * d3-geo/topojson-client son funciones puras: geografía precisa, cero conflicto.
 *
 * variant="full"   → /impacto: mapa grande, tooltips activos
 * variant="teaser" → home: versión compacta, gancho visual
 *
 * Solo muestra PRESENCIA (nombre del país en hover/tap). Sin cifras por país.
 */

const VB_W = 800;
const VB_H = 412;

export default function ImpactMap({ countries = [], variant = 'full' }) {
  const [hovered, setHovered] = useState(null);
  const isTeaser = variant === 'teaser';

  // Proyección + paths se calculan una sola vez (funciones puras, sin hooks externos)
  const { paths, project } = useMemo(() => {
    const land = feature(world, world.objects.countries);
    const projection = geoEqualEarth().fitSize([VB_W, VB_H], land);
    const pathGen = geoPath(projection);
    return {
      paths: land.features.map((f) => pathGen(f)),
      project: (lng, lat) => projection([lng, lat]),
    };
  }, []);

  return (
    <div className={`impactmap impactmap--${variant}`}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="impactmap__svg"
        role="img"
        aria-label={`Mapa de presencia global de Litro de Luz® en ${countries.length} países`}
      >
        {/* Continentes */}
        <g>
          {paths.map((d, i) => (
            <path key={i} d={d} className="impactmap__land" />
          ))}
        </g>

        {/* Puntos de presencia */}
        {countries.map((c, i) => {
          const pt = project(c.lng, c.lat);
          if (!pt) return null;
          const [x, y] = pt;
          const active = hovered === c.name;
          return (
            <g
              key={c.code || c.name}
              transform={`translate(${x}, ${y})`}
              className="impactmap__marker"
              tabIndex={0}
              role="button"
              aria-label={c.name}
              onMouseEnter={() => setHovered(c.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(c.name)}
              onBlur={() => setHovered(null)}
            >
              <circle
                className="impactmap__pulse"
                r={isTeaser ? 7 : 8}
                style={{ animationDelay: `${(i % 12) * 0.18}s` }}
              />
              <circle
                className="impactmap__dot"
                r={active ? (isTeaser ? 5 : 5.5) : (isTeaser ? 3.4 : 4)}
              />
              {active && (
                <text className="impactmap__label" textAnchor="middle" y={-13}>
                  {c.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Lista accesible / SEO — los países en texto real */}
      <ul className="impactmap__sr-list" aria-label="Países con presencia de Litro de Luz®">
        {countries.map((c) => (
          <li key={c.code || c.name}>{c.name}</li>
        ))}
      </ul>

      <style>{`
        .impactmap { position: relative; width: 100%; }

        .impactmap__svg { width: 100%; height: auto; display: block; }

        /* Continentes */
        .impactmap__land {
          fill: rgba(255, 255, 255, 0.06);
          stroke: rgba(56, 182, 255, 0.14);
          stroke-width: 0.4;
          vector-effect: non-scaling-stroke;
        }

        /* Marker group */
        .impactmap__marker { cursor: pointer; outline: none; }

        /* Punto sólido */
        .impactmap__dot {
          fill: var(--color-primary);
          transition: r var(--duration-fast) var(--easing-smooth), fill var(--duration-fast);
        }

        .impactmap__marker:hover .impactmap__dot,
        .impactmap__marker:focus-visible .impactmap__dot {
          fill: var(--color-white);
        }

        /* Halo pulsante */
        .impactmap__pulse {
          fill: var(--color-primary);
          opacity: 0.35;
          transform-box: fill-box;
          transform-origin: center;
          animation: impactmap-pulse 2.6s var(--easing-smooth) infinite;
        }

        @keyframes impactmap-pulse {
          0%   { transform: scale(0.4); opacity: 0.5; }
          70%  { transform: scale(1);   opacity: 0;   }
          100% { transform: scale(1);   opacity: 0;   }
        }

        .impactmap__marker:focus-visible .impactmap__pulse { opacity: 0.7; }

        /* Etiqueta del país */
        .impactmap__label {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          fill: var(--color-white);
          paint-order: stroke;
          stroke: var(--color-bg-dark);
          stroke-width: 4px;
          stroke-linejoin: round;
        }

        /* Lista solo para lectores de pantalla */
        .impactmap__sr-list {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .impactmap__pulse { animation: none; opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
