import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    schemas: 'src/schemas.ts',
    errors: 'src/errors.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  treeshake: true,
  outDir: 'dist',
  external: ['effect', '@effect/platform']
})