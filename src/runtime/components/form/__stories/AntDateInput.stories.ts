import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntDateInput from '../AntDateInput.vue';
import {InputColorType} from '../../../enums';
import {AntDateInputType} from '../__types/AntDateInput.type';
import {isRequiredRule, useFieldValidator} from '@antify/validate';
import {reactive} from 'vue';

const meta: Meta<typeof AntDateInput> = {
  title: 'Components/Forms/Date Input',
  component: AntDateInput,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      table: {type: {summary: 'number|null'}},
    },
    type: {
      control: {type: 'select'},
      options: Object.values(AntDateInputType),
    },
    colorType: {
      control: {type: 'select'},
      options: Object.values(InputColorType),
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
    },
    placeholder: {
      table: {defaultValue: {summary: 'this.label'}},
    }
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
    components: {AntDateInput},
    setup() {
      return {args, InputColorType, Size, AntDateInputType};
    },
    template: `
      <div class="flex flex-col gap-2.5">
        <div class="font-bold">
          Color types:
        </div>
        <div class="flex gap-2.5">
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :color-type="InputColorType.info"
            :type="AntDateInputType.datetimeLocal"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :color-type="InputColorType.success"
            :type="AntDateInputType.month"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :color-type="InputColorType.warning"
            :type="AntDateInputType.time"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :color-type="InputColorType.danger"
            :type="AntDateInputType.week"
          />
        </div>
        <div class="font-bold">
          Sizes:
        </div>
        <div class="flex gap-2.5">
          <AntDateInput
            v-bind="args"
            value="2024-01-01"
            :type="AntDateInputType.date"
            :size="Size.lg"
          />
          <AntDateInput
            v-bind="args"
            value="2018-06-12T19:30"
            :color-type="InputColorType.info"
            :type="AntDateInputType.datetimeLocal"
            :size="Size.md"
          />
          <AntDateInput
            v-bind="args"
            value="2024-12"
            :color-type="InputColorType.success"
            :type="AntDateInputType.month"
            :size="Size.sm"
          />
          <AntDateInput
            v-bind="args"
            value="14:28"
            :color-type="InputColorType.warning"
            :type="AntDateInputType.time"
            :size="Size.xs"
          />
          <AntDateInput
            v-bind="args"
            value="2024-W18"
            :color-type="InputColorType.danger"
            :type="AntDateInputType.week"
            :size="Size.xs2"
          />
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};
