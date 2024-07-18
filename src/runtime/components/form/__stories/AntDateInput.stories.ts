import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import {Direction} from '../../../enums/Direction.enum';
import AntDateInput from '../AntDateInput.vue';
import {InputState} from '../../../enums';
import {AntDateInputType} from '../__types/AntDateInput.type';
import {isRequiredRule, useFieldValidator} from '@antify/validate';
import {reactive} from 'vue';
import AntFormGroup from '../AntFormGroup.vue';
import AntFormGroupLabel from '../AntFormGroupLabel.vue';

const meta: Meta<typeof AntDateInput> = {
  title: 'Components/Forms/Date Input',
  component: AntDateInput,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      table: {type: {summary: 'string|null'}},
    },
    type: {
      control: {type: 'select'},
      options: Object.values(AntDateInputType),
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState),
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntDateInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntDateInput},
    setup() {
      return {args};
    },
    template: `
      <AntDateInput
        v-bind="args"
        v-model="args.modelValue"
      />
    `,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const WithValidator: Story = {
  render: (args) => ({
    components: {AntDateInput},
    setup() {
      const validator = reactive(useFieldValidator([
        isRequiredRule,
        (val) => typeof val !== 'number' || val <= 8 || 'Value should not be bigger than 8'
      ]));

      return {args, validator};
    },
    template: `
      <AntDateInput
        v-bind="args"
        v-model="args.modelValue"
        :errors="Array.isArray(args.errors) ? args.errors : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />
    `,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};


export const Summary: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => ({
    components: {AntDateInput, AntFormGroup, AntFormGroupLabel},
    setup() {
      return {args, InputState, Size, AntDateInputType, Direction};
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>
          Color types:
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.info"
            :type="AntDateInputType.datetimeLocal"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.success"
            :type="AntDateInputType.month"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.warning"
            :type="AntDateInputType.time"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.danger"
            :type="AntDateInputType.week"
          />
        </AntFormGroup>
        <AntFormGroupLabel>
          Sizes:
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntDateInput
            v-bind="args"
            value="2024-01-01"
            :type="AntDateInputType.date"
            :size="Size.lg"
          />
          <AntDateInput
            v-bind="args"
            value="2018-06-12T19:30"
            :state="InputState.info"
            :type="AntDateInputType.datetimeLocal"
            :size="Size.md"
          />
          <AntDateInput
            v-bind="args"
            value="2024-12"
            :state="InputState.success"
            :type="AntDateInputType.month"
            :size="Size.sm"
          />
          <AntDateInput
            v-bind="args"
            value="14:28"
            :state="InputState.warning"
            :type="AntDateInputType.time"
            :size="Size.xs"
          />
          <AntDateInput
            v-bind="args"
            value="2024-W18"
            :state="InputState.danger"
            :type="AntDateInputType.week"
            :size="Size.xs2"
          />
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};
