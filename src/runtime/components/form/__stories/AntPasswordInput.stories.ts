import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import {isRequiredRule, notBlankRule, useFieldValidator} from '@antify/validate';
import {InputState} from '../../../enums';
import {reactive} from 'vue';
import AntPasswordInput from '../AntPasswordInput.vue';

const meta: Meta<typeof AntPasswordInput> = {
  title: 'Components/Forms/Password Input',
  component: AntPasswordInput,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      control: 'text',
      table: {type: {summary: 'string|null'}},
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState)
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
      table: {defaultValue: {summary: Size.md}},
    },
    placeholder: {
      table: {defaultValue: {summary: 'this.label'}},
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntPasswordInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntPasswordInput},
    setup() {
      return {args};
    },
    template: `
      <AntPasswordInput
        v-bind="args"
        v-model="args.modelValue"
      />`,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const WithValidator: Story = {
  render: (args) => ({
    components: {AntPasswordInput},
    setup() {
      const validator = reactive(useFieldValidator([isRequiredRule, notBlankRule]));

      return {args, validator};
    },
    template: `
      <AntPasswordInput
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
  render: (args) => ({
    components: {AntPasswordInput},
    setup() {
      const validator = reactive(useFieldValidator([isRequiredRule, notBlankRule, (val) => val?.length <= 10 || 'Max. 10 characters allowed']));

      return {args, validator};
    },
    template: `
      <AntPasswordInput
        v-bind="args"
        v-model="args.modelValue"
        :errors="Array.isArray(args.errors) ? args.errors : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />`,
  }),
  args: {
    modelValue: 'PasswordIsTooLong',
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const Summary: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => ({
    components: {AntPasswordInput},
    setup() {
      return {args, InputState, Size};
    },
    template: `
      <div class="flex flex-col gap-2.5">
        <div class="font-bold">
          Color types:
        </div>
        <div class="flex gap-2.5">
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.info"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.success"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.warning"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.danger"
          />
        </div>
        <div class="font-bold">
          Sizes:
        </div>
        <div class="flex gap-2.5">
          <AntPasswordInput
            v-bind="args"
            value="1234"
            :size="Size.lg"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.info"
            :size="Size.md"
          />
          <AntPasswordInput
            v-bind="args"
            value="1234"
            :state="InputState.success"
            :size="Size.sm"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.warning"
            :size="Size.xs"
          />
          <AntPasswordInput
            v-bind="args"
            value="1234"
            :state="InputState.danger"
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
