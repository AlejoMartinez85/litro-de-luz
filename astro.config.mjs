import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [react()],
  site: 'https://litro-de-luz.vercel.app',
  output: 'hybrid',
  adapter: vercel(),
  compressHTML: true,
  build: {
    assets: '_assets',
  },
});
