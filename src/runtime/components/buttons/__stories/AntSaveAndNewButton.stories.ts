import AntSaveAndNewButton from '../AntSaveAndNewButton.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import {Grouped as _Grouped} from '../../../enums/Grouped.enum';
import {Position} from '../../../enums';

const meta: Meta<typeof AntSaveAndNewButton> = {
  title: 'Components/Buttons/Save And New Button',
  component: AntSaveAndNewButton,
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

type Story = StoryObj<typeof AntSaveAndNewButton>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntSaveAndNewButton},
    setup() {
      return {args};
    },
    template: '<AntSaveAndNewButton v-bind="args"/>',
  }),
  args: {
		invalidPermissionTooltipPosition: Position.right
	},
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

export const InvalidPermission: Story = {
	render: Docs.render,
	args: {
		...Docs.args,
		canSave: false,
	},
};
