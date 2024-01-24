import AntCreateButton from '../AntCreateButton.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import {Grouped as _Grouped} from '../../../enums/Grouped.enum';

const meta: Meta<typeof AntCreateButton> = {
  title: 'Components/Buttons/Create Button',
  component: AntCreateButton,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    size: {
      control: {type: 'radio'},
      options: Object.values(Size)
    },
    grouped: {
      control: {type: 'select'},
      options: Object.values(_Grouped),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntCreateButton>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntCreateButton},
    setup() {
      return {args};
    },
    template: '<AntCreateButton v-bind="args"/>',
  }),
  args: {},
};

export const Disabled: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    disabled: true
  },
};

export const Grouped: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    grouped: _Grouped.left
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true
  },
};

export const Expanded: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    expanded: true
  },
};