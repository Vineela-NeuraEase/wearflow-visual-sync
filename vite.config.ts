
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
      
      // Handle all possible import paths for codegenNativeComponent
      'react-native-web/Libraries/Utilities/codegenNativeComponent': 
        path.resolve(__dirname, './src/polyfills/codegenNativeComponent.js'),
      'react-native-web/dist/vendor/react-native/Libraries/Utilities/codegenNativeComponent':
        path.resolve(__dirname, './src/polyfills/codegenNativeComponent.js'),
      'react-native-web/dist/cjs/vendor/react-native/Libraries/Utilities/codegenNativeComponent':
        path.resolve(__dirname, './src/polyfills/codegenNativeComponent.js'),
      'react-native/Libraries/Utilities/codegenNativeComponent':
        path.resolve(__dirname, './src/polyfills/codegenNativeComponent.js'),
      // Handle direct import paths as well
      'Libraries/Utilities/codegenNativeComponent':
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
    include: [
      'react-native-web',
      '@react-native-community/netinfo',
      'react-native-safe-area-context',
    ],
    force: true, // Force dependency pre-bundling
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress certain warnings
        if (warning.code === 'MISSING_EXPORT') return;
        warn(warning);
      },
    },
  },
}));
