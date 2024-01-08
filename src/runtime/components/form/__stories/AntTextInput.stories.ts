import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntTextInput from '../AntTextInput.vue';
import {useFieldValidator} from '@antify/validate';
import {TextInputType} from '../__types/AntTextInput.type';
import {InputColorType} from '../../../enums';
import {emailRule} from '@antify/validate'

const meta: Meta<typeof AntTextInput> = {
  title: 'Components/Forms/Text Input',
  component: AntTextInput,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      control: 'text',
      table: {type: {summary: 'string|null'}},
    },
    colorType: {
      control: {type: 'select'},
      options: Object.values(InputColorType)
    },
    size: {
      control: {type: 'radio'},
      options: Object.values(Size),
      table: {defaultValue: {summary: Size.md}},
    },
    placeholder: {
      table: {defaultValue: {summary: 'this.label'}},
    },
    type: {
      control: {type: 'select'},
      options: Object.values(TextInputType),
      table: {defaultValue: {summary: TextInputType.text}},
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntTextInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntTextInput},
    setup() {
      return {args};
    },
    template: `
      <AntTextInput v-bind="args" v-model="args.modelValue"/>`,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const withValidator: Story = {
  render: (args) => ({
    components: {AntTextInput},
    setup() {
      setTimeout(() => { args.skeleton = false }, 1000);

      return {args};
    },
    template: `
      <AntTextInput v-bind="args" v-model="args.modelValue"/>`,
  }),
  args: {
    ...Docs.args,
    modelValue: '',
    skeleton: true,
    description: undefined,
    validator: useFieldValidator([
      (val: string) => val?.length > 0 || 'This field should not be empty',
      (val: string) => val?.length >= 5 || 'This field should has min 5 characters',
      (val: string) => val?.length <= 10 || 'This field should has max 10 characters',
      emailRule
    ])
  },
};

export const limited: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    modelValue: 'A to long value',
    max: 10,
    limiter: true,
    validator: useFieldValidator([
      (val: string) => val.length <= 10 || 'Max. 10 characters allowed'
    ])
  },
};
