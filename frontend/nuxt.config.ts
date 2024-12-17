export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-lodash',
    '@pinia/nuxt',
    'shadcn-nuxt',
    '@vesp/nuxt-fontawesome',
    '@nuxt/test-utils/module'
  ],
  fontawesome: {
    icons: {
      solid: ['user', 'circle', 'plus'],
      regular: ['circle'],
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    'assets/css/main.css'
  ],
  tailwindcss: {
    configPath: "./tailwind.config.ts",
  },
  postcss: {
    plugins: {
      tailwindcss: {
        config: './tailwind.config.ts', // Spécifie le fichier TS directement
      },
    },
  },
  imports: {
    autoImport: false
  },
})