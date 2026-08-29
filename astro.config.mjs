import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Astro builds canonical URLs and the og:image URL from this, so a wrong
  // value ships a broken social preview on every page. No `base` — a custom
  // domain serves from the root.
  site: 'https://belloftheballreno.com',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
