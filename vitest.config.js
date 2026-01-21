import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['./src/**/*.test.{js,jsx,ts,tsx}'],
    isolate: false,
    pool: 'threads',
    watch: false,
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      provider: 'v8',
      reporter: ['text'],
    },
  },
});
