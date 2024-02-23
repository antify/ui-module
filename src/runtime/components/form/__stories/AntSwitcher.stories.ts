import { type Meta, type StoryObj } from '@storybook/vue3';
import { computed, ref } from 'vue';
import { Size } from '../../../enums';
import { useFieldValidator } from '@antify/validate';
import { type SwitcherOption } from '../__types/AntSwitcher.type';
import { InputColorType } from '../../../enums';
import { AntSwitcher } from '../index';

const meta: Meta<typeof AntSwitcher> = {
  title: 'Components/Forms/Switcher',
  component: AntSwitcher,
  argTypes: {
    modelValue: {
      control: 'text',
    },
    options: {
      table: {
        type: {
          summary: 'string | SwitcherOption[]',
          detail: `
type SwitcherOption = {
  label: string;
  value: string | number;
  [key: string]: unknown;
}
          `
        }
      }
    },
    colorType: {
      control: { type: 'select' },
      options: Object.values(InputColorType),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
    },
  }
}

export default meta;

type Story = StoryObj<typeof AntSwitcher>;

export const Docs: Story = {
  render: (args) => ({
    components: { AntSwitcher },
    setup() {
      const modelValue = computed({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
        set: (val) => args.modelValue = val
      })

      return { args, modelValue }
    },
    template: `
      <AntSwitcher v-bind="args" v-model="modelValue"/>
    `
  }),
  args: {
    options: [
      {
        label: 'Entry 1',
        value: 'entry-1'
      },
      {
        label: 'Entry 2',
        value: 'entry-2'
      },
      {
        label: 'Entry 3',
        value: 'entry-3'
      },
      {
        label: 'Entry 4',
        value: 'entry-4'
      }
    ],
    modelValue: 'entry-1'
  }
};

export const withValidator: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    validator: useFieldValidator([
      (val: SwitcherOption) => {
        return val.value !== 'entry-1' || 'Select something else'
      }
    ])
  },
};

export const Summary: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => ({
    components: { AntSwitcher },
    setup() {
      const modelValue = computed({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
        set: (val) => args.modelValue = val
      });

      const skeleton = ref(true);

      return { args, modelValue, InputColorType, skeleton }
    },
    template: `
      <div class="flex flex-col gap-5 ">
        <div class="flex gap-2.5">
          <AntSwitcher v-bind="args" v-model="modelValue" :color-type="InputColorType.base"/>
          <AntSwitcher v-bind="args" v-model="modelValue" :color-type="InputColorType.info"/>
          <AntSwitcher v-bind="args" v-model="modelValue" :color-type="InputColorType.success"/>
          <AntSwitcher v-bind="args" v-model="modelValue" :color-type="InputColorType.warning"/>
          <AntSwitcher v-bind="args" v-model="modelValue" :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label" :color-type="InputColorType.base"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label" :color-type="InputColorType.info"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label" :color-type="InputColorType.success"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label" :color-type="InputColorType.warning"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label" :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitcher v-bind="args" v-model="modelValue"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.base"/>
          <AntSwitcher v-bind="args" v-model="modelValue"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.info"/>
          <AntSwitcher v-bind="args" v-model="modelValue"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.success"/>
          <AntSwitcher v-bind="args" v-model="modelValue"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.warning"/>
          <AntSwitcher v-bind="args" v-model="modelValue"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.base"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.info"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.success"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.warning"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitcher v-bind="args" v-model="modelValue" readonly label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.base"/>
          <AntSwitcher v-bind="args" v-model="modelValue" readonly label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.info"/>
          <AntSwitcher v-bind="args" v-model="modelValue" readonly label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.success"/>
          <AntSwitcher v-bind="args" v-model="modelValue" readonly label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.warning"/>
          <AntSwitcher v-bind="args" v-model="modelValue" readonly label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitcher v-bind="args" v-model="modelValue" disabled label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.base"/>
          <AntSwitcher v-bind="args" v-model="modelValue" disabled label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.info"/>
          <AntSwitcher v-bind="args" v-model="modelValue" disabled label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.success"/>
          <AntSwitcher v-bind="args" v-model="modelValue" disabled label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.warning"/>
          <AntSwitcher v-bind="args" v-model="modelValue" disabled label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitcher v-bind="args" v-model="modelValue" :skeleton="true" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.base"/>
          <AntSwitcher v-bind="args" v-model="modelValue" :skeleton="true" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.info"/>
          <AntSwitcher v-bind="args" v-model="modelValue" :skeleton="true" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.success"/>
          <AntSwitcher v-bind="args" v-model="modelValue" :skeleton="true" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.warning"/>
          <AntSwitcher v-bind="args" v-model="modelValue" :skeleton="true" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :color-type="InputColorType.danger"/>
        </div>
      </div>
    `
  }),
  args: {
    options: [
      {
        label: 'Entry 1',
        value: 'entry-1'
      },
      {
        label: 'Entry 2',
        value: 'entry-2'
      },
      {
        label: 'Entry 3',
        value: 'entry-3'
      },
      {
        label: 'Entry 4',
        value: 'entry-4'
      }
    ],
    modelValue: 'entry-1'
  }
}
