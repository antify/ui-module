export default defineNuxtConfig({
  ssr: false,

  uiModule: {
    tailwindCSSPath: './assets/css/tailwind.css',
  },

  imports: {
    autoImport: false
  },

  modules: [
    '../src/module'
  ],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-09-06'
});
