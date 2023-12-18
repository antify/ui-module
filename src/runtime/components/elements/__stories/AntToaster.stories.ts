import AntToaster from '../AntToaster.vue';
import AntButton from '../../form/AntButton.vue';
import { ref } from 'vue';
import { Toaster, TOASTER_TYPE } from '../../../types/Toaster.type';
import { generateId } from '../../../utils/helper';

export default {
  title: 'Components/Elements/Ant Toaster',
  component: AntToaster,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    toasts: {
      description:
        'List of toasts that will be displayed. This is a reactive value and will be updated if the user removes one toast.<br/>The Type can be "NOTIFICATION", "WARNING" or "ERROR"',
      table: {
        type: {
          summary: 'Array<Toaster>',
          detail: `type Toaster = {
            id: string;
            message: string;
            type?: TOASTER_TYPE;
          };`,
        },
      },
    },
    canClose: {
      description:
        "Boolean value if the user can close a toast. If the user can't close them you have to remove them yourself",
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    position: {
      description: 'Defines where the toasts will appear',
      table: {
        defaultValue: {
          summary: 'LEFT_BOTTOM',
        },
        type: {
          detail: `enum POSITION {
  LEFT_TOP='LEFT_TOP',
  RIGHT_TOP='RIGHT_TOP',
  LEFT_BOTTOM='LEFT_BOTTOM',
  RIGHT_BOTTOM='RIGHT_BOTTOM',
}`,
        },
      },
    },
    default: {
      description:
        'The default slot is the message of one toast, it gets the toast as parameter',
      table: {
        type: {
          summary: 'HTML',
        },
      },
    },
    icons: {
      description: 'Override for all icons',
      table: {
        type: {
          summary: 'HTML',
        },
      },
    },
    notificationIcon: {
      description:
        'Place for an icon, will be displayed if <br/> toast.type === "NOTIFICIATION"',
      table: {
        type: {
          summary: 'HTML',
        },
      },
    },
    warningIcon: {
      description:
        'Override for the warning icon, will be displayed if <br/> toast.type === "WARNING" <br/> <a href="https://fontawesome.com/icons/triangle-exclamation?s=solid">Link to default</a>',
      table: {
        defaultValue: {
          summary: 'faTriangleExclamation',
        },
        type: {
          summary: 'HTML',
        },
      },
    },
    errorIcon: {
      description:
        'Override for the error icon, will be displayed if <br/> toast.type === "ERROR" <br/> <a href="https://fontawesome.com/icons/triangle-exclamation?s=solid">Link to default</a>',
      table: {
        defaultValue: {
          summary: 'faTriangleExclamation',
        },
        type: {
          summary: 'HTML',
        },
      },
    },

    closeIcon: {
      description:
        'Override for the close icon, will be displayed if canClose is true <br/> <a href="https://fontawesome.com/icons/x?s=solid">Link to default</a>',
      table: {
        defaultValue: {
          summary: 'faX',
        },
        type: {
          summary: 'HTML',
        },
      },
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntToaster, AntButton },
  setup() {
    args.canClose = true;

    const toasts = ref<Array<Toaster>>([]);

    const addToast = (type: TOASTER_TYPE) => {
      toasts.value.push({
        id: generateId(5),
        message: `Message - ${generateId(5)}`,
        type,
      });
    };

    return { args, toasts, addToast, TOASTER_TYPE };
  },
  template: `
  <div class="flex flex-col w-40 m-4 space-y-2">
    <AntButton :primary="true" @click="addToast(TOASTER_TYPE.NOTIFICATION)">Open notification</AntButton>
    <AntButton :primary="true" @click="addToast(TOASTER_TYPE.WARNING)">Open warning</AntButton>
    <AntButton :primary="true" @click="addToast(TOASTER_TYPE.ERROR)">Open error</AntButton>
  </div>

  <AntToaster v-bind="args" v-model:toasts="toasts"/>
  `,
});
