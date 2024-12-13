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
})