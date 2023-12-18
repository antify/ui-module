import AntInputDescription from '../AntInputDescription.vue';
import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../../enums/Size.enum';
import {InputColorType} from '../../../../enums';

const meta: Meta<typeof AntInputDescription> = {
  title: 'Components/Forms/Elements/Ant Input Description',
  component: AntInputDescription,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    size: {
      control: {type: 'radio'},
      options: Object.values(Size),
      table: {defaultValue: {summary: Size.md}},
    },
    skeleton: {
      control: 'boolean',
      table: {defaultValue: {summary: false}},
    },
    colorType: {
      control: {type: 'select'},
      options: Object.values(InputColorType)
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntInputDescription>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntInputDescription},
    setup() {
      return {args};
    },
    template: '<div class="p-4"><AntInputDescription v-bind="args">Description</AntInputDescription></div>',
  }),
  args: {},
};
