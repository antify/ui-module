import { type Meta, type StoryObj} from '@storybook/vue3';
import AntTabItem from '../AntTabItem.vue';
import {ColorType} from '../__types/AntTabItem.types';

const meta: Meta<typeof AntTabItem> = {
  title: 'Components/Tab Item',
  component: AntTabItem,
  parameters: {controls: {sort: 'requiredFirst'}},
  decorators: [() => ({template: '<div class="border border-neutral-light border-dashed"><story /></div>'})],
  argTypes: {
    showIcon: {
      control: 'boolean',
      description:
        'Some InputColorTypes can have an icon. Control with this property if it gets shown or not.',
    },
    colorType: {
      control: {type: 'select'},
      options: Object.values(ColorType)
    },
  }
}

export default meta;

type Story = StoryObj<typeof AntTabItem>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntTabItem},
    setup() {
      return {args};
    },
    template: '<AntTabItem v-bind="args"/>'
  }),
  args: {
    label: 'First tab',
    active: false
  }
}
