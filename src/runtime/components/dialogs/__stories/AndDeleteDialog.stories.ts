import {type Meta, type StoryObj} from '@storybook/vue3';
import AntDeleteDialog from '../AntDeleteDialog.vue';
import AntButton from '../../buttons/AntButton.vue';

const meta: Meta<typeof AntDeleteDialog> = {
  title: 'Components/Dialogs/Delete Dialog',
  component: AntDeleteDialog,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntDeleteDialog>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntDeleteDialog, AntButton},
    setup() {
      return {args}
    },
    template: `
      <AntButton @click="() => args.open = true" color-type="danger">Delete</AntButton>

      <AntDeleteDialog
        v-model:open="args.open"
        :entry="args.entry"
        v-bind="args"
      />
    `,
  }),
  args: {
    open: false,
    entry: 'Lorem ipsum'
  },
}
