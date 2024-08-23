import {defineNuxtPlugin} from '#app';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {useToaster} from '@antify/ui';

export default defineNuxtPlugin((nuxtApp) => {
  const toaster = useToaster();
  nuxtApp.vueApp.component('FaIcon', FontAwesomeIcon);

  return {
    provide: {
      uiModule: {
        toaster
      }
    }
  };
});
