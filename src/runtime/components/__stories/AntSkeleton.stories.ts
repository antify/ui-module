import AntSkeleton from '../AntSkeleton.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Grouped as _Grouped} from '../../enums/Grouped.enum';
import {computed} from 'vue';

const meta: Meta<typeof AntSkeleton> = {
  title: 'Components/Skeleton',
  component: AntSkeleton,
  argTypes: {
    modelValue: {
      description: 'Reactive value if the skeleton is currently visible.'
    },
    grouped: {
      control: {type: 'select'},
      options: Object.values(_Grouped),
      description: 'Where is this fields position in a group',
      table: {defaultValue: {summary: _Grouped.none}},
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntSkeleton>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntSkeleton},
    setup() {
      const modelValue = computed({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
        set: (val) => args.modelValue = val
      });

      return {args, modelValue};
    },
    template: `
      <AntSkeleton
        v-model="modelValue"
        v-bind="args"
        class="h-5 w-full"
      />`,
  }),
  args: {
    modelValue: true
  },
};

export const Rounded: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    rounded: true
  },
};

export const Grouped: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    grouped: _Grouped.left
  },
};
