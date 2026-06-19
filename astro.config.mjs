import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [react()],
  site: 'https://litrodeluz.org',
  output: 'hybrid',
  adapter: vercel(),
  compressHTML: true,
  build: {
    assets: '_assets',
  },
});
