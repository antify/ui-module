import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntUnitInput from '../AntUnitInput.vue';
import {computed} from 'vue';
import {faEuroSign} from '@fortawesome/free-solid-svg-icons';
import {InputColorType} from '../../../enums';

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
      const modelValue = computed<number | null>({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
        set: (val: number | null) => args.modelValue = val
      });

      return {args, modelValue};
    },
    template: `
      <AntUnitInput v-bind="args" v-model="modelValue" :unit="args.unit"/>`,
  }),
  args: {
    modelValue: 0,
    unit: '€',
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const UnitAsIcon: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    unit: faEuroSign,
  },
};
