import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fitnessxmarketing.com',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
});
