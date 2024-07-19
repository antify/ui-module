import AntRadioGroup from '../AntRadioGroup.vue';
import { ref } from 'vue';
import { InputState } from '../../../../enums';
import {AntRadioSize} from '../__types/AntRadio.type';
import { type Meta, type StoryObj } from '@storybook/vue3';
import { useFieldValidator } from '@antify/validate';
import { Direction } from '../../../../enums/Direction.enum';
import AntFormGroupLabel from '../../AntFormGroupLabel.vue';
import AntFormGroup from '../../AntFormGroup.vue';

const meta: Meta<typeof AntRadioGroup> = {
  title: 'Components/Forms/Radio Group',
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
  state?: InputState;
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
    state: {
      control: { type: 'select' },
      options: Object.values(InputState),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(AntRadioSize),
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
  {
    id: 'radio-4',
    label: 'Radio 4',
    value: 'radio-4',
  }
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
    radioButtons: simpleButtons
  }
};

export const WithValidator: Story = {
  render: (args) => ({
    components: { AntRadioGroup },
    setup() {
      const value = ref(null);

      const validator = ref(useFieldValidator([
        (val: string) => val !== 'invalid-radio' || 'Choose other option!'
      ]));

      return { args, value, validator };
    },
    template: `
      <AntRadioGroup
        v-bind="args"
        v-model="value"
        :errors="Array.isArray(args.errors) ? args.errors : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />
    `
  }),
  args: {
    radioButtons: [
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
        id: 'invalid-radio',
        label: 'Invalid Radio',
        value: 'invalid-radio',
      },
      {
        id: 'radio-4',
        label: 'Radio 4',
        value: 'radio-4',
      }
    ]
  }
};

export const summary: Story = {
  render: (args) => ({
    components: { AntRadioGroup, AntFormGroupLabel, AntFormGroup },
    setup() {
      const value = ref<string>('radio-3');
      return { args, value, InputState, AntRadioSize };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>States</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntRadioGroup v-bind="args" v-model="value" :state="InputState.base" label="Label" description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :state="InputState.info" label="Label" description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :state="InputState.success" label="Label" description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :state="InputState.warning" label="Label" description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :state="InputState.danger" label="Label" description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>
        <AntFormGroupLabel>Sizes</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntRadioGroup v-bind="args" v-model="value" :size="AntRadioSize.md" label="Label" description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="AntRadioSize.sm" label="Label" description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
            <AntFormGroup direction="row">
              <AntRadioGroup v-bind="args" v-model="value"label="Label" description="Lorem ipsum dolor sit amet" disabled/>
            </AntFormGroup>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <AntFormGroup direction="row">
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :readonly="true"/>
            </AntFormGroup>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :skeleton="true"/>
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntRadioGroup v-bind="args" v-model="value"/>
        <AntFormGroupLabel>With label</AntFormGroupLabel>
        <AntRadioGroup v-bind="args" v-model="value" label="Label" />
        <AntFormGroupLabel>With description</AntFormGroupLabel>
        <AntRadioGroup v-bind="args" v-model="value" description="Lorem ipsum dolor sit amet"/>
        <AntFormGroupLabel>With label + description</AntFormGroupLabel>
        <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"/>
      </AntFormGroup>
    `
  }),
  args: {
    ...Docs.args,
  }
};
