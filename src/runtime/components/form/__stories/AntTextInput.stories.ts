import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntTextInput from '../AntTextInput.vue';
import {isRequiredRule, notBlankRule, useFieldValidator} from '@antify/validate';
import {TextInputType} from '../__types/AntTextInput.type';
import {InputColorType} from '../../../enums';
import {reactive} from 'vue';

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
      control: {type: 'select'},
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
      const validator = reactive(useFieldValidator([isRequiredRule, notBlankRule]));

      return {args, validator};
    },
    template: `
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :errors="Array.isArray(args.errors) ? args.errors : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />`,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
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

export const Summary: Story = {
  render: (args) => ({
    components: {AntTextInput},
    setup() {
      return {args, InputColorType};
    },
    template: `
    <div class="flex gap-2.5">
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
      />
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :color-type="InputColorType.info"
      />
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :color-type="InputColorType.success"
      />
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :color-type="InputColorType.warning"
      />
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :color-type="InputColorType.danger"
      />
    </div>
    <div class="flex gap-2.5">
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :show-icon="true"
      />
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :color-type="InputColorType.info"
        :show-icon="true"
      />
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :color-type="InputColorType.success"
        :show-icon="true"
      />
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :color-type="InputColorType.warning"
        :show-icon="true"
      />
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :color-type="InputColorType.danger"
        :show-icon="true"
      />
    </div>
    `,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};
