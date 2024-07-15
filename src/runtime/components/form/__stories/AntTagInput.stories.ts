import { AntTagInput } from '../index';
import type { Meta, StoryObj } from '@storybook/vue3';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { InputColorType } from '../../../enums';
import type { SelectOption } from '../__types';
import {AntTagInputSize} from '../__types/AntTagInput.types';

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
      control: { type: 'select' },
      options: Object.values(AntTagInputSize),
      table: { defaultValue: { summary: AntTagInputSize.md } },
    },
    placeholder: {
      table: { defaultValue: { summary: 'this.label' } },
    },
    createCallback: {
      control: 'none',
      description: 'If allowCreate is true the createCallback needs to be specified. It will be called when the user creates a new tag. It should return a promise that resolves to a SelectOption.',
      table: {
        type: {
          summary: '(item: string) => Promise<SelectOption>',
          detail: `
Params:
item: string - the label of the new tag

Returns:
Promise<SelectOption> - the new tag as a SelectOption
          `
        }
      }
    }
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
      <div style="width: 360px">
      <AntTagInput v-model="value" v-bind="args"/>
      </div>
    `
  }),
  args: {
    options
  }
};

export const AllowCreate: Story = {
  render: Docs.render,
  args: {
    options,
    allowCreate: true,
    createCallback(item: string): Promise<SelectOption> {
      return new Promise((resolve) => {
        resolve({ label: item, value: `${Math.random()}-${item}` });
      });
    },
  }
};

export const Disabled: Story = {
  render: Docs.render,
  args: {
    options,
    disabled: true,
  }
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    options,
    skeleton: true,
  }
};
