import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    optimizeDeps: {
      // Only scan the real app entry — never crawl Ref/ HTML dumps.
      entries: ['index.html', 'src/**/*.{js,jsx,ts,tsx}'],
    },
    server: {
      port: 3000,
      strictPort: true,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : {
              ignored: ['**/Ref/**', '**/apps/api/**', '**/packages/**/dist/**'],
            },
      fs: {
        deny: ['**/Ref/**'],
      },
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
  };
});
