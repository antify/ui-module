import AntField from '../AntField.vue';
import AntBaseInput from '../AntBaseInput.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../../enums/Size.enum';
import {computed, reactive, ref} from 'vue';
import {InputColorType} from '../../../../enums';
import {isRequiredRule, notBlankRule, useFieldValidator} from '@antify/validate';

const meta: Meta<typeof AntField> = {
  title: 'Components/Forms/Elements/Field',
  component: AntField,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
    },
    colorType: {
      control: {type: 'select'},
      options: Object.values(InputColorType)
    },
    skeleton: {
      control: 'boolean',
      table: {defaultValue: {summary: false}},
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntField>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntField, AntBaseInput},
    setup: () => {
      const skeleton = computed({
        get() {
          return args.skeleton;
        },
        set(val) {
          args.skeleton = val;
        }
      });
      const size = computed({
        get() {
          return args.size;
        },
        set(val) {
          args.size = val;
        }
      });
      const colorType = computed({
        get() {
          return args.colorType;
        },
        set(val) {
          args.colorType = val;
        }
      });
      const value = ref<string | null>(null);
      const validator = reactive(useFieldValidator([isRequiredRule, notBlankRule]));

      return {args, value, validator, skeleton, size, colorType};
    },
    template: `
      <AntField
        v-bind="args"
        :errors="Array.isArray(args.errors) ? args.errors : validator.getErrors()"
      >
        <AntBaseInput
          v-model:value="value"
          :skeleton="skeleton"
          :size="size"
          :color-type="colorType"
          placeholder="Placeholder"
          :has-errors="Array.isArray(args.errors) ? args.errors.length > 0 : validator.hasErrors()"
          @validate="(val) => validator.validate(val)"
        />
      </AntField>
    `,
  }),
  args: {
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

