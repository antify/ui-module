import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntNumberInput from '../AntNumberInput.vue';
import {InputColorType} from '../../../enums/ColorType.enum';
import {isRequiredRule, useFieldValidator} from '@antify/validate';
import {reactive} from 'vue';

const meta: Meta<typeof AntNumberInput> = {
  title: 'Components/Forms/Number Input',
  component: AntNumberInput,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      control: {type: 'number'},
      table: {type: {summary: 'number|null'}},
    },
    colorType: {
      control: {type: 'select'},
      options: Object.values(InputColorType)
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
      table: {defaultValue: {summary: Size.md}},
    },
    placeholder: {
      table: {defaultValue: {summary: 'this.label'}},
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntNumberInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntNumberInput},
    setup() {
      return {args};
    },
    template: `
      <AntNumberInput
        v-bind="args"
        v-model="args.modelValue"
      />`
  }),
  args: {
    modelValue: null,
    steps: 1,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const withValidator: Story = {
  render: (args) => ({
    components: {AntNumberInput},
    setup() {
      const validator = reactive(useFieldValidator([
        isRequiredRule
      ]));

      return {args, validator};
    },
    template: `
      <AntNumberInput
        v-bind="args"
        v-model="args.modelValue"
        :errors="Array.isArray(args.errors) ? args.errors : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />`
  }),
  args: {
    modelValue: null,
    steps: 1,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const Limited: Story = {
  render: (args) => ({
    components: {AntNumberInput},
    setup() {
      const validator = reactive(useFieldValidator([
        isRequiredRule,
        (val: number) => val <= 10 || 'Value should not be bigger than 10',
        (val: number) => val <= 11 || 'It should be really not bigger than 10!!!!'
      ]));

      return {args, validator};
    },
    template: `
      <AntNumberInput
        v-bind="args"
        v-model="args.modelValue"
        :errors="Array.isArray(args.errors) ? args.errors : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />`
  }),
  args: {
    ...Docs.args,
    modelValue: 50,
    limiter: true,
    max: 10,
  },
};

export const WithIndicators: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    indicators: true
  },
};
