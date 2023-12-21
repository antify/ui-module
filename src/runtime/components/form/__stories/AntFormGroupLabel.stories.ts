import { type Meta, type StoryObj} from '@storybook/vue3';
import AntFormGroupLabel from '../AntFormGroupLabel.vue';
import {computed} from 'vue';

const meta: Meta<typeof AntFormGroupLabel> = {
  title: 'Components/Forms/Form Group Label',
  component: AntFormGroupLabel,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntFormGroupLabel>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntFormGroupLabel},
    setup() {
      return {args};
    },
    template: `
      <AntFormGroupLabel v-bind="args">Example label</AntFormGroupLabel>
    `,
  }),
  args: {},
};
