import { type Meta, type StoryObj } from "@storybook/vue3";
import AntCheckboxGroup from "../AntCheckboxGroup.vue";
import { computed, ref } from "vue";
import { InputColorType, Size } from "../../../../enums";
import { Direction } from "../../../../enums/Direction.enum";
import { useValidator } from "@antify/validate";


const meta: Meta<typeof AntCheckboxGroup> = {
  title: 'Components/Forms/Checkbox/Checkbox Group',
  component: AntCheckboxGroup,
  argTypes: {
    modelValue: {
      description: 'Contains the list of selected checkboxes (the value prop of the checkboxes)'
    },
    checkboxes: {
      description: 'List of checkboxes to be displayed'
    },
    colorType: {
      control: { type: 'select' },
      options: Object.values(InputColorType),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
    },
    direction: {
      control: { type: 'select' },
      options: Object.values(Direction)
    }
  }
}

export default meta;

type Story = StoryObj<typeof AntCheckboxGroup>;

export const Docs: Story = {
  render: (args) => ({
    components: { AntCheckboxGroup },
    setup() {
      const value = computed({
        get() {
          return args.modelValue;
        },
        set(val) {
          // @ts-ignore
          args.modelValue = val;
        }
      });

      return {
        args,
        value
      }
    },
    template: `
      <AntCheckboxGroup v-bind="args" v-model="value" />
    `
  }),
  args: {
    modelValue: [],
    checkboxes: [{
      label: 'Checkbox 1',
      value: 'checkbox-1'
    }, {
      label: 'Checkbox 2',
      value: 'checkbox-2'
    }, {
      label: 'Checkbox 3',
      value: 'checkbox-3'
    }, {
      label: 'Checkbox 4',
      value: 'checkbox-4'
    }]
  }
}

export const WithValidator: Story = {
  render: (args) => ({
    components: {AntCheckboxGroup},
    setup() {
      const value = computed({
        get() {
          return args.modelValue;
        },
        set(val) {
          // @ts-ignore
          args.modelValue = val;
        }
      });
      const validator = ref(useValidator((val) => val.length >= 2 || 'Select at least 2'));

      validator.value.validate(value.value);

      return {
        args,
        value,
        validator
      }
    },
    template: `
      <AntCheckboxGroup v-bind="args" v-model="value" :validator="validator"/>
    `
  }),
  args: {
    ...Docs.args,
  }
}
