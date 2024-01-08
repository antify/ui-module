import AntTableFilter from '../AntTableFilter.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';

const meta: Meta<typeof AntTableFilter> = {
  title: 'Components/Table Filter',
  component: AntTableFilter,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntTableFilter>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntTableFilter},
    setup() {
      return {args};
    },
    template: `
      <div class="border border-neutral-light border-dashed">
        <AntTableFilter
          v-model:search="args.search"
          v-bind="args"
        />
      </div>
    `,
  }),
  args: {},
};
