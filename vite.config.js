import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import requireTransform from 'vite-plugin-require-transform';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
    resolvers: [
        ElementPlusResolver(),
        IconsResolver({prefix: 'Icon',}),
    ],

  }),
    Components({
      resolvers: [
          ElementPlusResolver(),
          IconsResolver({enabledCollections: ['ep'],}),
      ],
    }),
      Icons({autoInstall: true,}),
    requireTransform({fileRegex:/.ts$|.tsx$|.js$|.vue$/}),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
  },
  server:{
    host: '127.0.0.1',
    port: 65535 ,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  build: {
    outDir: './root'
  }
})
