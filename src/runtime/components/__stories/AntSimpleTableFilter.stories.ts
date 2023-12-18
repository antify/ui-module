import AntSimpleTableFilter from '../AntSimpleTableFilter.vue';
import { type Meta, type StoryObj} from '@storybook/vue3';
import {computed} from 'vue';

const meta: Meta<typeof AntSimpleTableFilter> = {
  title: 'Components/Simple Table Filter',
  component: AntSimpleTableFilter,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    search: {
      control: 'text',
      table: {type: {summary: 'string|null'}},
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntSimpleTableFilter>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntSimpleTableFilter},
    setup() {
      const search = computed({
        // @ts-ignore
        get: () => args.search,
        // @ts-ignore
        set: (val) => args.search = val
      });

      return {args, search};
    },
    template: `
      <AntSimpleTableFilter v-bind="args" v-model:search="search"/>
    `,
  }),
  args: {
    search: null
  },
};
