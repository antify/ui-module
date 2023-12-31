export default defineNuxtConfig({
  modules: [
    '../src/module'
  ],
  nitro: {
    storage: {
      db: {
        driver: 'memory',
      }
    }
  },
  /**
   * Allow using packages outside the monorepo with "link:../../example-package".
   * Without strict, vite would throw 403 error.
   */
  vite: {
    server: {
      fs: {
        strict: false,
      }
    }
  }
});
