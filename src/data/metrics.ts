import type { Metric } from '@/types';

export const impactMetrics: Metric[] = [
  { value: 550728, suffix: '+', label: 'Beneficiarios', description: 'Personas con acceso a luz e internet' },
  { value: 7000,   suffix: '+', label: 'ELISA® instaladas', description: 'Postes solares activos' },
  { value: 35,     label: 'Países', description: 'Presencia global' },
  { value: 500,    suffix: '+', label: 'Comunidades', description: 'Comunidades transformadas' },
  { value: 100,    label: 'ELISA®/día', description: 'Ritmo de instalación actual' },
];

export const problemStats: Metric[] = [
  { value: 740,  suffix: 'M', label: 'Sin acceso a energía', description: 'Personas en el mundo' },
  { value: 2700, suffix: 'M', label: 'Sin acceso a internet', description: 'Personas en el mundo' },
  { value: 1.4,  suffix: 'M', label: 'Colombianos sin luz', description: 'En zonas rurales' },
];
