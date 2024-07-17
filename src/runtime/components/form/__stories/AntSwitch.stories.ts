import {type Meta, type StoryObj} from '@storybook/vue3';
import {AntSwitch} from '../index';
import {computed, ref} from 'vue';
import {InputState} from '../../../enums';
import {useFieldValidator} from '@antify/validate';
import {AntSwitchSize} from '../__types/AntSwitchTypes';

const meta: Meta<typeof AntSwitch> = {
  title: 'Components/Forms/Switch',
  component: AntSwitch,
  argTypes: {
    state: {
      control: {type: 'select'},
      options: Object.values(InputState),
    },
    size: {
      control: {type: 'select'},
      options: Object.values(AntSwitchSize),
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
      });

      return {args, value};
    },
    template: `
      <AntSwitch v-bind="args" v-model="value"/>
    `
  }),
  args: {
    modelValue: false
  },
};

export const withValidator: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    validator: useFieldValidator([
      (val: boolean) => {
        return !val || 'Must be false';
      }
    ])
  },
};

export const Summary: Story = {
  parameters: {
    chromatic: {disableSnapshot: false},
  },
  render: (args) => ({
    components: {AntSwitch},
    setup() {
      const value = ref(true);
      const notValue = ref(false);

      return {args, value, notValue, InputState, AntSwitchSize};
    },
    template: `
      <div class="flex flex-col gap-5 ">
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="value" :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="value" :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="value" :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="value" :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" label="Test" :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" label="Test" :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="value" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="value" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="value" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="value" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="value" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" readonly label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" disabled label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" skeleton label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test"
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test"
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test"
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test"
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test"
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test"
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test"
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test"
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test"
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test"
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="value" :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" readonly :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" readonly :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" disabled :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" disabled :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSwitch v-bind="args" v-model="notValue" skeleton :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.base"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.info"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.success"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.warning"/>
          <AntSwitch v-bind="args" v-model="notValue" skeleton :size="AntSwitchSize.sm" label="Test" value="Value"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                     :state="InputState.danger"/>
        </div>
      </div>
    `
  })
};
