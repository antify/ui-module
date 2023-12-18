import AntToggle from '../AntToggle.vue';
import { ref } from 'vue';
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'Components/Forms/Ant Toggle',
  component: AntToggle,
  decorators: [() => ({ template: '<div class="m-2"><story/></div>' })],
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    args: {
      description:
        'Additional attributes will be forwarded to the toggle-button field. This way you can access the default button events.',
    },
    value: {
      description: 'The reactive value of the toggle button',
    },
    id: {
      description: 'Id for toggle button and label.',
      table: {
        defaultValue: { summary: 'UUID', detail: 'A randomly generated UUID' },
      },
    },
    color: {
      control: 'text',
      table: { defaultValue: { summary: 'primary' } },
      description: 'A tailwind css color definition',
    },
    default: {
      description: 'Default slot is used to display label',
    },
    icon: {
      description: 'Can be used to add a icon to the toggle button',
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntToggle },
  setup() {
    const value = ref<boolean>(false);
    return { args, value };
  },
  template: `
    <AntToggle v-bind="args" v-model:value="value">
      <span class="text-sm font-medium text-gray-900">Annual billing </span>
      <span class="text-sm text-gray-500">(Save 10%)</span>
    </AntToggle>

    <span class="text-xs text-gray-400">Reactive Value: {{value}}</span>
  `,
});

export const WithIcon = (args: any) => ({
  components: { AntToggle },
  setup() {
    const value = ref<boolean>(false);

    return { args, value, faX, faCheck };
  },
  template: `
    <AntToggle v-bind="args" v-model:value="value">
      <template #icon>
        <span class="opacity-100 ease-in duration-200 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity">
          <fa-icon v-if="!value" :icon="faX" class="w-2 h-2 text-gray-400"/>
          <fa-icon v-if="value" :icon="faCheck" class="w-2 h-2 text-primary"/>
        </span>
      </template>
    </AntToggle>
  `,
});
