import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5177,
    strictPort: true,
    open: '/#/',
  },
  preview: {
    port: 4177,
    strictPort: true,
  },
});
