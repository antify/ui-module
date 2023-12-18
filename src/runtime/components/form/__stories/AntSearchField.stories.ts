import AntSearchField from '../AntSearchField.vue';
import { ref } from 'vue';

export default {
  title: 'Components/Forms/Ant Search Field',
  component: AntSearchField,
  parameters: { controls: { sort: 'requiredFirst' } },
  decorators: [() => ({ template: '<div class="m-2"><story/></div>' })],
  argTypes: {
    args: {
      description:
        'Additional attributes given to this will be forwarded to the AntInput-Field. For more details look at the AntInput-Story.',
    },
    id: {
      description: 'The ID for the search input and label combination',
      table: {
        defaultValue: { summary: 'UUID', detail: 'A randomly generated UUID' },
      },
    },
    value: {
      description:
        'The reactive value of the search input. Will be updated only after a timeout',
    },
    timeoutLength: {
      description:
        'Defines the timeout length in ms before an update to the value is triggered after the user typed inside the input field.',
      table: {
        defaultValue: { summary: 300 },
      },
    },
  },
};

const Template = (args: any) => ({
  components: { AntSearchField },
  setup() {
    const value = ref<string>('');

    return { args, value };
  },
  template: `
    <AntSearchField v-bind="args" v-model:value="value"/>
    <span class="text-xs text-gray-500">Reactive value: {{ value }}</span>`,
});

export const Primary = Template.bind({});
//@ts-ignore
Primary.args = {
  timeoutLength: 1000,
  placeholder: 'Search field',
};
