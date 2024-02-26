import { type Meta, type StoryObj} from '@storybook/vue3';
import {AntSwitch} from '../index';
import { computed, ref } from 'vue';
import { InputColorType, Size } from '../../../enums';
import { useFieldValidator } from '@antify/validate';

const meta: Meta<typeof AntSwitch> = {
  title: 'Components/Forms/Switch',
  component: AntSwitch,
  argTypes: {
    colorType: {
      control: { type: 'select' },
      options: Object.values(InputColorType),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
    },
  }
};

export default meta;

type Story = StoryObj<typeof AntSwitch>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntSwitch},
    setup() {
      const value = computed({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
        set: (val) => args.modelValue = val
      })

      return {args, value}
    },
    template: `
      <AntSwitch v-bind="args" v-model="value"/>
    `
  })
}

export const withValidator: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    validator: useFieldValidator([
      (val: boolean) => {
        return !val || 'Must be false'
      }
    ])
  },
};

export const Summary: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => ({
    components: {AntSwitch},
    setup() {
      const value = ref(true);
      const notValue = ref(false);

      return {args, value, notValue, InputColorType, Size}
    },
    template: `
      <div class="flex flex-col gap-5 ">
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="value" :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="value" :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="value" :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="value" :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" label="Test" :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" label="Test" :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" readonly label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" disabled label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" skeleton label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="value" :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" readonly :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" disabled :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" skeleton :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.base"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.info"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.success"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton :size="Size.sm" label="Test" value="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." :color-type="InputColorType.danger"/>
        </div>
      </div>
    `
  })
}
