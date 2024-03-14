import AntActionButton from '../AntActionButton.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import {Grouped as _Grouped} from '../../../enums/Grouped.enum';
import {Position} from '../../../enums/Position.enum';

const meta: Meta<typeof AntActionButton> = {
  title: 'Components/Buttons/Action Button',
  component: AntActionButton,
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
		invalidPermissionTooltipPosition: {
      control: {type: 'select'},
      options: Object.values(Position),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntActionButton>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntActionButton},
    setup() {
      return {args};
    },
    template: '<AntActionButton v-bind="args">Action Button</AntActionButton>',
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

export const WithPermissionTooltip: Story = {
	render: (args) => ({
		components: {AntActionButton},
		setup() {
			return {args};
		},
		template: `<AntActionButton v-bind="args">
			Action Button

			<template #invalidPermissionTooltipContent>You have no permission to do this</template>
		</AntActionButton>`,
	}),
	args: {
		...Docs.args,
		hasPermission: false,
	},
};
