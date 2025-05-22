
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add React Native web compatibility
      'react-native': 'react-native-web',
      '@react-native-async-storage/async-storage': 'react-native-web/dist/exports/AsyncStorage',
      '@react-native-community/netinfo': path.resolve(__dirname, './src/polyfills/netinfo-polyfill.js'),
      'react-native-ble-plx': path.resolve(__dirname, './src/polyfills/ble-plx-polyfill.js'),
      // Add polyfill for missing codegenNativeComponent - use a more direct path match
      'react-native-web/Libraries/Utilities/codegenNativeComponent': 
        path.resolve(__dirname, './src/polyfills/codegenNativeComponent.js'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
}));
