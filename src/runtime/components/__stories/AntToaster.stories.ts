import AntButton from '../form/AntButton.vue';
import {CornerPosition, InputColorType} from '../../enums';
import {enumToPlainText} from '../../utils';

export default {
  title: 'Components/Toaster',
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    position: {
      description: 'Defines where the toasts will appear',
      table: {
        defaultValue: {
          summary: 'CornerPosition.bottomRight',
        },
        type: {
          summary: 'CornerPosition',
          detail: enumToPlainText(CornerPosition, 'CornerPosition'),
        },
      },
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntButton },
  setup() {
    return { args, InputColorType };
  },
  template: `
    <div class="flex flex-col m-4 space-y-2">
      <p>
        This module use the <code>useNuxtApp</code> and <code>defineNuxtPlugin</code> functions to provide the toaster to the app. <br>
        Because storybook does not support nuxt enternals, the component is not useable here. <br>
        To test it, open the nuxt playground.
      </p>

      <AntButton
          v-for="colorType in Object.values(InputColorType)"
      >
        Toast {{ colorType }}
      </AntButton>
    </div>
  `,
});
