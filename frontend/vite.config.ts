import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import fs from 'fs';
import path from 'path';

// Obtiene todos los archivos dentro de la carpeta entrypoints como puntos de entrada
const entrypointsDir = path.resolve(__dirname, './src/entrypoints');
const entrypoints = fs.readdirSync(entrypointsDir).reduce<Record<string, string>>((entries, file) => {
  const fullPath = path.resolve(entrypointsDir, file);
  const name = path.parse(file).name; // Usa el nombre del archivo como clave
  if (fs.statSync(fullPath).isFile()) {
    entries[name] = fullPath; // Asigna la ruta completa como valor
  }
  return entries;
}, {});

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    manifest: true,
    outDir: '../static_dev/js', // Directorio de salida para los archivos construidos
    emptyOutDir: true, // Limpiar el directorio de salida antes de construir
    rollupOptions: {
      input: entrypoints, // Usa los puntos de entrada generados dinámicamente
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
      },
    },
  },
});