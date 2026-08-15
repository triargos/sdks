import { defineConfig } from 'tsdown';

export default defineConfig({
  // One entry per v4 entry point: `/v3` must offer the same surface as `.`.
  entry: ['generated/index.ts', 'generated/schemas.ts', 'generated/errors.ts'],
  tsconfig: './tsconfig.generated.json',
  outDir: '../dist/v3',
  format: ['esm'],
  dts: true,
  // The package is `"type": "module"`, so `.js` is already ESM — same as the v4 build.
  outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
  deps: {
    // Patterns, not names: TypeScript writes inferred types as deep imports
    // (`effect/Stream`), and a bundled copy of `effect`'s declarations would
    // redeclare its `unique symbol` type ids — making every type nominally
    // foreign to the consumer's own `effect` install.
    neverBundle: [/^effect(\/|$)/, /^@effect\/platform(\/|$)/],
  },
});
