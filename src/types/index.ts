export interface Country {
  name: string;
  code: string;
  lat: number;
  lng: number;
  elisaCount?: number;
}

export interface Metric {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  age?: number;
  location: string;
  image?: string;
}

export interface ElisaSpec {
  label: string;
  value: string;
  icon?: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
