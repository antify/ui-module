import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntSearch from '../AntSearch.vue';

const meta: Meta<typeof AntSearch> = {
  title: 'Components/Forms/Search',
  component: AntSearch,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      control: 'text',
      table: {type: {summary: 'string|null'}},
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
    },
    inputTimeout: {
      description:
        'How long is the timeout between inputs to update the value in milliseconds',
    },
    query: {
      description:
        'Read and write the value into url as urldecoded string. Using the given string as query name.',
    },
    placeholder: {
      table: {defaultValue: {summary: 'Search'}},
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntSearch>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntSearch},
    setup() {
      return {args};
    },
    template: `
      <AntSearch v-bind="args" v-model="args.modelValue"/>
      <div class="text-xs mt-4">Reactive value: {{ args.modelValue }}</div>
    `,
  }),
  args: {
    modelValue: '',
    placeholder: 'Search',
  },
};
