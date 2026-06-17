export type BrandCategory = 'corporativo' | 'energia' | 'organizacion' | 'academia' | 'premio' | 'medios' | 'gobierno';

export interface Brand {
  name: string;
  category: BrandCategory;
  tier: 1 | 2 | 3; // 1 = reconocimiento global, 2 = institucional fuerte, 3 = regional/especializado
  url?: string;
}

// ── Socios corporativos ──────────────────────────────────────────────
export const corporativos: Brand[] = [
  { name: 'Google',                category: 'corporativo', tier: 1 },
  { name: 'PepsiCo',               category: 'corporativo', tier: 1 },
  { name: 'AB-InBev',              category: 'corporativo', tier: 1 },
  { name: 'Nestlé',                category: 'corporativo', tier: 1 },
  { name: 'IKEA',                  category: 'corporativo', tier: 1 },
  { name: 'AWS',                   category: 'corporativo', tier: 1 },
  { name: 'SAP',                   category: 'corporativo', tier: 1 },
  { name: 'Accenture',             category: 'corporativo', tier: 1 },
  { name: 'Novartis',              category: 'corporativo', tier: 1 },
  { name: 'Novo Nordisk',          category: 'corporativo', tier: 1 },
  { name: 'Sika Group',            category: 'corporativo', tier: 1 },
  { name: 'AngloGold Ashanti',     category: 'corporativo', tier: 1 },
  { name: 'Stanley Black & Decker', category: 'corporativo', tier: 1 },
  { name: 'Alpina',                category: 'corporativo', tier: 2 },
  { name: 'Baker McKenzie',        category: 'corporativo', tier: 2 },
  { name: 'Calvé',                 category: 'corporativo', tier: 2 },
  { name: 'Halcyon',               category: 'corporativo', tier: 2 },
];

// ── Sector energético ────────────────────────────────────────────────
export const energia: Brand[] = [
  { name: 'ENEL',                       category: 'energia', tier: 1 },
  { name: 'NEXANS',                     category: 'energia', tier: 2 },
  { name: 'Grupo de Energía de Bogotá', category: 'energia', tier: 2 },
  { name: 'Promigas',                   category: 'energia', tier: 2 },
  { name: 'TGI',                        category: 'energia', tier: 2 },
  { name: 'Centelsa',                   category: 'energia', tier: 2 },
  { name: 'ACUACAR',                    category: 'energia', tier: 3 },
  { name: 'Fundación Aquae',            category: 'energia', tier: 3 },
];

// ── Organismos internacionales & ONGs ────────────────────────────────
export const organizaciones: Brand[] = [
  { name: 'UNICEF',              category: 'organizacion', tier: 1 },
  { name: 'UNDP',                category: 'organizacion', tier: 1 },
  { name: 'Habitat for Humanity', category: 'organizacion', tier: 1 },
  { name: 'Ashoka',              category: 'organizacion', tier: 1 },
  { name: 'IDB',                 category: 'organizacion', tier: 1 },
  { name: '100+ Accelerator',    category: 'organizacion', tier: 2 },
  { name: 'Liter of Light Global', category: 'organizacion', tier: 2 },
  { name: 'SOCIALAB',            category: 'organizacion', tier: 2 },
  { name: 'JCI Colombia',        category: 'organizacion', tier: 2 },
  { name: 'SEED Kenya',          category: 'organizacion', tier: 2 },
];

// ── Academia ─────────────────────────────────────────────────────────
export const academia: Brand[] = [
  { name: 'MIT',                            category: 'academia', tier: 1 },
  { name: 'Harvard',                        category: 'academia', tier: 1 },
  { name: 'INSEAD',                         category: 'academia', tier: 1 },
  { name: 'Royal Academy of Engineering',   category: 'academia', tier: 1 },
  { name: 'Singularity University',         category: 'academia', tier: 2 },
  { name: 'University of St. Gallen (HSG)', category: 'academia', tier: 2 },
  { name: 'INCAE',                          category: 'academia', tier: 2 },
  { name: 'Universidad de los Andes',       category: 'academia', tier: 2 },
  { name: 'EAN Universidad',                category: 'academia', tier: 3 },
  { name: 'Colciencias',                    category: 'academia', tier: 3 },
  { name: 'MINTIC Colombia',                category: 'academia', tier: 3 },
];

// ── Gobierno & diplomacia ────────────────────────────────────────────
export const gobierno: Brand[] = [
  { name: 'Embajada de Colombia en Suiza', category: 'gobierno', tier: 2 },
  { name: 'Embajada de Colombia en Ghana', category: 'gobierno', tier: 2 },
];

// ── Premios & reconocimientos ────────────────────────────────────────
export const premios: Brand[] = [
  { name: 'Earthshot Prize',       category: 'premio', tier: 1 },
  { name: 'Zayed Sustainability Prize', category: 'premio', tier: 1 },
];

// ── Medios de comunicación ───────────────────────────────────────────
export const medios: Brand[] = [
  { name: 'Forbes',   category: 'medios', tier: 1 },
  { name: 'CNN',      category: 'medios', tier: 1 },
  { name: 'BBC News', category: 'medios', tier: 1 },
];

// ── Sets para el componente Marcas ───────────────────────────────────

// Fila 1 del marquee: empresas + energía (peso corporativo)
export const marqueeRow1: Brand[] = [
  ...corporativos,
  ...energia,
];

// Fila 2 del marquee: orgs + academia + gobierno (credibilidad institucional)
export const marqueeRow2: Brand[] = [
  ...organizaciones,
  ...academia,
  ...gobierno,
];

// Marcas de máximo impacto para el teaser del home
export const teaserBrands: Brand[] = [
  { name: 'PepsiCo',  category: 'corporativo',   tier: 1 },
  { name: 'Google',   category: 'corporativo',   tier: 1 },
  { name: 'AB InBev', category: 'corporativo',   tier: 1 },
  { name: 'Nestlé',   category: 'corporativo',   tier: 1 },
  { name: 'UNICEF',   category: 'organizacion',  tier: 1 },
  { name: 'Harvard',  category: 'academia',      tier: 1 },
  { name: 'MIT',      category: 'academia',      tier: 1 },
];

// Todos los socios juntos
export const allBrands: Brand[] = [
  ...corporativos,
  ...energia,
  ...organizaciones,
  ...academia,
  ...gobierno,
  ...premios,
  ...medios,
];
