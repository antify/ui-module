import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntTextInput from '../AntTextInput.vue';
import {computed} from 'vue';
import {useValidator} from '@antify/validate';
import {TextInputType} from '../__types/AntTextInput.type';
import {InputColorType} from '../../../enums';

const meta: Meta<typeof AntTextInput> = {
  title: 'Components/Forms/Text Input',
  component: AntTextInput,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
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
      const value = computed({
        // @ts-ignore
        get: () => args.value,
        // @ts-ignore
        set: (val: string) => args.value = val
      });

      return {args, value};
    },
    template: `
      <AntTextInput v-bind="args" v-model:value="value"/>`,
  }),
  args: {
    value: '',
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const withValidator: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    validator: useValidator([
      (val: string) => val.length > 0 || 'This field should not be empty'
    ])
  },
};

export const limited: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    value: 'A to long value',
    max: 10,
    limiter: true,
    validator: useValidator([
      (val: string) => val.length <= 10 || 'Max. 10 characters allowed'
    ])
  },
};
