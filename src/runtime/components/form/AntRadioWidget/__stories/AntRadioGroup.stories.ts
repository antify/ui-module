import AntRadioGroup from '../AntRadioGroup.vue';
import { ref } from 'vue';
import { InputColorType, Size } from "../../../../enums";
import { type Meta, type StoryObj } from "@storybook/vue3";
import { useValidator } from "@antify/validate";
import { Direction } from "../../../../enums/Direction.enum";

const meta: Meta<typeof AntRadioGroup> = {
  title: 'Components/Forms/Radio/Radio Group',
  component: AntRadioGroup,
  decorators: [ () => ({ template: '<div class="m-2"><story/></div>' }) ],
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    label: {
      description: 'The label for the radio widget',
    },
    description: {
      description: 'Description for the radio widget',
    },
    radioButtons: {
      description: 'Array of RadioButton',
      table: {
        type: {
          summary: 'AntRadioType[]',
          detail: `
{
  value: string;
  label?: string;
  disabled?: boolean;
  colorType?: InputColorType;
  validator?: Validator;
}
`
        },
      },
    },
    modelValue: {
      description:
        'Reactive value, contains the currently selected radio-button value',
      table: {
        type: {
          summary: 'string | null'
        }
      }
    },
    direction: {
      control: { type: 'select' },
      options: Object.values(Direction)
    },
    colorType: {
      control: { type: 'select' },
      options: Object.values(InputColorType),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntRadioGroup>;

const simpleButtons = [
  {
    id: 'radio-1',
    label: 'Radio 1',
    value: 'radio-1',
  },
  {
    id: 'radio-2',
    label: 'Radio 2',
    value: 'radio-2',
  },
  {
    id: 'radio-3',
    label: 'Radio 3',
    value: 'radio-3',
  },
];

export const Docs: Story = {
  render: (args) => ({
    components: { AntRadioGroup },
    setup() {
      const value = ref<string>('');
      return { args, value };
    },
    template: `
      <AntRadioGroup v-bind="args" v-model="value"/>
      <span class="text-xs text-gray-500">Reactive value: {{ value }}</span>
    `
  }),
  args: {
    label: 'Different style',
    description: 'Message',
    radioButtons: simpleButtons
  }
}

export const WithValidator: Story = {
  render: (args) => ({
    components: { AntRadioGroup },
    setup() {
      const value = ref(null);

      const validator = ref(useValidator([
        (val: string) => val !== null || 'Value is required'
      ]));

      validator.value.validate(value.value);

      return { args, value, validator }
    },
    template: `
      <AntRadioGroup v-bind="args" v-model="value" :validator="validator"/>
    `
  }),
  args: {
    ...Docs.args,
  }
}

export const WithDisabledRadioButton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    radioButtons: [
      ...simpleButtons,
      {
        id: 'radio-4',
        label: 'Radio 4',
        description: 'I am disabled',
        value: 'radio-4',
        disabled: true,
      },
    ]
  }
};
export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true
  }
};
