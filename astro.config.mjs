import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://litrodeluz.org',
  output: 'static',
  compressHTML: true,
  build: {
    assets: '_assets',
  },
});
