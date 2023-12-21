import {type Toast} from '../components/__types/AntToaster.types';
import {InputColorType} from '../enums';
import {ref} from 'vue';

export default () => {
  const toasts = ref<Toast[]>([]);

  return {
    getToasts() {
      return toasts.value;
    },
    toast(toast: Toast) {
      toasts.value.push(toast);

      setTimeout(() => {
        toasts.value.shift();
      }, useRuntimeConfig().public.uiModule.toasterMessageShowTime);
    },
    removeToast(toast: Toast) {
      const index = toasts.value.indexOf(toast);

      if (index !== -1) {
        toasts.value.splice(index, 1);
      }
    },
    toastSuccess(message: string) {
      this.toast({title: message, type: InputColorType.success});
    },
    toastError(message: string) {
      this.toast({title: message, type: InputColorType.danger});
    },
    toastWarning(message: string) {
      this.toast({title: message, type: InputColorType.warning});
    },
    toastInfo(message: string) {
      this.toast({title: message, type: InputColorType.info});
    },
    toastDeleted() {
      // TODO:: translate
      this.toastSuccess('Deleted');
    },
    toastCreated() {
      // TODO:: translate
      this.toastSuccess('Saved');
    },
    toastUpdated() {
      // TODO:: translate
      this.toastSuccess('Saved');
    },
  }
};
