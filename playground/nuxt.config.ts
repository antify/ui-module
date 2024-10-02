export default defineNuxtConfig({
  ssr: false,

  imports: {
    autoImport: false
  },

  modules: [
    '../src/module'
  ],

  uiModule: {

  },

  compatibilityDate: '2024-09-06'
});
