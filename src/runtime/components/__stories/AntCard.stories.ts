import {type Meta, type StoryObj} from '@storybook/vue3';
import AntCard from '../AntCard.vue';
import {AntCardPaddingSize} from '../__types/AntCard.types';
import AntFormGroup from '../form/AntFormGroup.vue';
import AntFormGroupLabel from '../form/AntFormGroupLabel.vue';

const meta: Meta<typeof AntCard> = {
  title: 'Components/Card',
  component: AntCard,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    padding: {
      control: {type: 'select'},
      options: Object.values(AntCardPaddingSize),
    },
    expanded: {
      control: {type: 'boolean'},
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntCard>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntCard},
    setup() {
      return {args, AntCardPaddingSize};
    },
    template: `
      <AntCard v-bind="args">
        <div
          class="slot h-40"
          :class="args.expanded ? 'w-full' : 'w-48'"
        >
          SLOT
        </div>
      </AntCard>
    `,
  }),
  args: {}
};

export const Summary: Story = {
  parameters: {
    chromatic: {disableSnapshot: false},
  },
  render: (args) => ({
    components: {AntCard, AntFormGroup, AntFormGroupLabel},
    setup() {
      return {args, AntCardPaddingSize};
    },
    template: `
      <AntFormGroup direction="column">
        <AntFormGroupLabel>Padding size</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCard v-bind="args"  :padding="AntCardPaddingSize.none" :expanded="true">
            <div class="slot h-40">SLOT</div>
          </AntCard>
          <AntCard v-bind="args"  :padding="AntCardPaddingSize.lg" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
          <AntCard v-bind="args"  :padding="AntCardPaddingSize.md" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
          <AntCard v-bind="args"  :padding="AntCardPaddingSize.sm" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
          <AntCard v-bind="args"  :padding="AntCardPaddingSize.xs" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
          <AntCard v-bind="args"  :padding="AntCardPaddingSize.xs2" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
        </AntFormGroup>
      </AntFormGroup>`,
  }),
  args: {}
};
