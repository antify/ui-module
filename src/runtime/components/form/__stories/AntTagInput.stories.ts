import { AntTagInput } from '../index';
import type { Meta, StoryObj } from '@storybook/vue3';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { InputColorType, Size } from '../../../enums';
import type { SelectOption } from '../__types';

const meta: Meta<typeof AntTagInput> = {
  title: 'Components/Forms/Tag input',
  component: AntTagInput,
  argTypes: {
    modelValue: {
      control: 'text',
      table: { type: { summary: 'string|null' } },
    },
    colorType: {
      control: { type: 'select' },
      options: Object.values(InputColorType)
    },
    size: {
      control: { type: 'radio' },
      options: Object.values(Size),
      table: { defaultValue: { summary: Size.md } },
    },
    placeholder: {
      table: { defaultValue: { summary: 'this.label' } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntTagInput>;

const options: SelectOption[] = [
  {
    label: 'Tag',
    value: '1',
  },
  {
    label: 'Cat',
    value: '2',
  },
  {
    label: 'Dog',
    value: '3',
  },
  {
    label: 'Chicken',
    value: '4',
  },
];

export const Docs: Story = {
  render: (args) => ({
    components: { AntTagInput },
    setup() {
      const value: Ref<string[]> = ref([]);

      return {
        args,
        value,
      };
    },
    template: `
      <AntTagInput v-model="value" v-bind="args"/>
    `
  }),
  args: {
    options
  }
};
