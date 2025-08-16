import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // allows using describe/test/expect without imports
    environment: 'node', // 'node' or 'jsdom'
    // setupFiles: ['./src/lib/test/core.js'],
    watch: false,
    coverage: {
      provider: 'v8', // 'v8' or 'istanbul'
      reporter: ['text', 'html'],
    },
  },
});
