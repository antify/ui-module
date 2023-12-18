import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntNumberInput from '../AntNumberInput.vue';
import {computed} from 'vue';
import {ColorType} from '../../../enums/ColorType.enum';
import {useValidator} from '@antify/validate';

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
      options: Object.values(ColorType)
    },
    size: {
      control: {type: 'radio'},
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
      const modelValue = computed({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
        set: (val) => args.modelValue = val
      })

      return {args, modelValue};
    },
    template: '<div class="p-4"><AntNumberInput v-bind="args" v-model="modelValue" /></div>',
  }),
  args: {
    modelValue: 0,
    steps: 1,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const withoutValue: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    modelValue: null
  },
};

export const withValidator: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    validator: useValidator([
      (val: number) => val < 4 || 'Value should not be bigger than 4',
      (val: number) => val < 5 || 'Value should really not be bigger than 4!'
    ])
  },
};

export const limited: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    modelValue: 50,
    limiter: true,
    max: 10,
    validator: useValidator([
      (val: number) => val <= 10 || 'Value should not be bigger than 10',
      (val: number) => val <= 11 || 'It should be really not bigger than 10!!!!'
    ])
  },
};
