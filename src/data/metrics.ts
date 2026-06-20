import type { Metric } from '@/types';

export const impactMetrics: Metric[] = [
  { value: 550728, suffix: '+', label: 'Beneficiarios directos', description: 'Personas con acceso a luz e internet' },
  { value: 7000,   suffix: '+', label: 'Nodos ELISA® activos', description: 'Postes solares activos' },
  { value: 35,     label: 'Países', description: 'Presencia global' },
  { value: 500,    suffix: '+', label: 'Comunidades', description: 'Comunidades transformadas' },
  { value: 100,    label: 'ELISA®/día', description: 'Ritmo de instalación actual' },
  { value: 12,     suffix: 'M+', label: 'ESG Value Generated', description: 'USD en valor de impacto certificado' },
];

export const problemStats: Metric[] = [
  { value: 740,  suffix: 'M', label: 'Sin acceso a energía', description: 'Personas en el mundo' },
  { value: 2700, suffix: 'M', label: 'Sin acceso a internet', description: 'Personas en el mundo' },
  { value: 1.4,  suffix: 'M', label: 'Colombianos sin luz', description: 'En zonas rurales' },
];

export const csrdStats: Metric[] = [
  { value: 50000, suffix: '+', label: 'empresas afectadas por CSRD', description: 'Obligadas a reportar impacto ESG en Europa para 2025' },
  { value: 87,    suffix: '%', label: 'no pueden verificar su cadena de impacto', description: 'Según Carbon Disclosure Project 2024' },
  { value: 12,    suffix: 'M+', label: 'USD en valor ESG sin certificar', description: 'Estimado en mercados emergentes' },
];
