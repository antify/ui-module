import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntUnitInput from '../AntUnitInput.vue';
import {faEuroSign} from '@fortawesome/free-solid-svg-icons';
import {InputColorType} from '../../../enums';
import {isRequiredRule, useFieldValidator} from '@antify/validate';
import {reactive} from 'vue';

const meta: Meta<typeof AntUnitInput> = {
  title: 'Components/Forms/Unit Input',
  component: AntUnitInput,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      table: {type: {summary: 'number|null'}},
    },
    unit: {
      control: 'text',
      description:
        'Will be displayed right to the input.<br>Use text or Font-awesome Icons.',
      table: {type: {summary: 'string|IconDefinition'}},
    },
    colorType: {
      control: {type: 'select'},
      options: Object.values(InputColorType),
    },
    size: {
      control: {type: 'radio'},
      options: Object.values(Size),
    },
    placeholder: {
      table: {defaultValue: {summary: 'this.label'}},
    },
    wrapperClass: {
      control: 'text',
      description:
        'Class for the first element because the attribute "class" would affect the input element.',
      table: {type: {summary: 'string|object'}},
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntUnitInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntUnitInput},
    setup() {
      const validator = reactive(useFieldValidator([
        isRequiredRule,
        (val) => typeof val !== 'number' || val <= 8 || 'Value should not be bigger than 8'
      ]))

      return {args, validator};
    },
    template: `
      <AntUnitInput
        v-bind="args"
        v-model="args.modelValue"
        :unit="args.unit"
        :errors="Array.isArray(args.errors) ? args.errors : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />`,
  }),
  args: {
    modelValue: null,
    unit: '€',
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const Limited: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    modelValue: 50,
    limiter: true,
    max: 10,
    validator: useFieldValidator([
      (val: number) => val <= 10 || 'Value should not be bigger than 10',
      (val: number) => val <= 11 || 'It should be really not bigger than 10!!!!'
    ])
  },
};

export const UnitAsIcon: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    unit: faEuroSign,
  },
};
