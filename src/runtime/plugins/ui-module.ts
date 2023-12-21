import { defineNuxtPlugin } from '#app';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import toaster from './toaster';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('fa-icon', FontAwesomeIcon);

  return {
    provide: {
      uiModule: {
        toaster: toaster()
      }
    }
  }
});
