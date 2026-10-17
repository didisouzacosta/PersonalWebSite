// @ts-check
import { defineConfig } from 'astro/config';

// Build for https://duotake.app. Pages live in sites/duotake/pages and reuse
// the portfolio components and DuoTake content from src/.
export default defineConfig({
  site: 'https://duotake.app',
  srcDir: './sites/duotake',
  publicDir: './sites/duotake/public',
  outDir: './dist-duotake',
  server: { port: 4322 },
  integrations: [],
});
