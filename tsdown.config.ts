import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  dts: true,
  external: ['react', 'react-native', 'react-native-web'],
  format: ['esm', 'cjs'],
});
