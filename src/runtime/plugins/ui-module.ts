import {
  defineNuxtPlugin,
} from '#app';
import {
  FontAwesomeIcon,
} from '@fortawesome/vue-fontawesome';
import {
  useToaster,
} from '@antify/ui';
import {
  createI18n,
} from 'vue-i18n';

export default defineNuxtPlugin((nuxtApp) => {
  const toaster = useToaster();
  const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'de',
  });
  nuxtApp.vueApp.component('FaIcon', FontAwesomeIcon);
  nuxtApp.vueApp.use(i18n);

  return {
    provide: {
      uiModule: {
        toaster: {
          ...toaster,
          toastDeleted() {
            toaster.toastError('Gelöscht');
          },
          toastCreated() {
            toaster.toastSuccess('Gespeichert');
          },
          toastUpdated() {
            toaster.toastSuccess('Gespeichert');
          },
          toastDuplicated() {
            toaster.toastSuccess('Dupliziert');
          },
          toastInvalidFork() {
            toaster.toastInfo('Das Formular ist Fehlerhaft. Bitte beheben Sie diese vor dem Absenden.');
          },
        },
      },
    },
  };
});
