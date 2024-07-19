import {type Meta, type StoryObj} from '@storybook/vue3';
import {AntSwitch} from '../index';
import {computed, reactive, ref} from 'vue';
import {InputState} from '../../../enums';
import {useFieldValidator} from '@antify/validate';
import {AntSwitchSize} from '../__types/AntSwitchTypes';
import AntFormGroup from '../AntFormGroup.vue';
import AntFormGroupLabel from '../AntFormGroupLabel.vue';

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
  render: (args) => ({
    components: {AntSwitch},
    setup() {
      const value = computed({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
        set: (val) => args.modelValue = val
      });

      const validator = reactive( useFieldValidator([
        (val: boolean) => {
          return val || 'Switch it!';
        }
      ]));

      return {args, value, validator};
    },
    template: `
      <AntSwitch
        v-bind="args"
        v-model="value"
        value="Value must be true"
        :errors="validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />
      <span class="text-sm text-gray-500">Reactive value: {{value}}</span>
    `
  }),
  args: {
    ...Docs.args,
  },
};

export const Summary: Story = {
  parameters: {
    chromatic: {disableSnapshot: false},
  },
  render: (args) => ({
    components: {AntSwitch, AntFormGroup, AntFormGroupLabel},
    setup() {
      const value = ref(true);
      const notValue = ref(false);

      return {args, value, notValue, InputState, AntSwitchSize};
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>States</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch
            v-model="notValue"
            label="Label"
            description="Lorem ipsum dolor sit amet."
            :state="InputState.base"
          />
          <AntSwitch
            v-model="notValue"
            label="Label"
            description="Lorem ipsum dolor sit amet."
            :state="InputState.info"
          />
          <AntSwitch
            v-model="notValue"
            label="Label"
            description="Lorem ipsum dolor sit amet."
            :state="InputState.success"
          />
          <AntSwitch
            v-model="notValue"
            label="Label"
            description="Lorem ipsum dolor sit amet."
            :state="InputState.warning"
          />
          <AntSwitch
            v-model="notValue"
            label="Label"
            description="Lorem ipsum dolor sit amet."
            :state="InputState.danger"
          />
          <AntSwitch
            v-model="value"
            label="Label"
            description="Lorem ipsum dolor sit amet."
            :state="InputState.base"
          />
          <AntSwitch
            v-model="value"
            label="Label"
            description="Lorem ipsum dolor sit amet."
            :state="InputState.info"
          />
          <AntSwitch
            v-model="value"
            label="Label"
            description="Lorem ipsum dolor sit amet."
            :state="InputState.success"
          />
          <AntSwitch
            v-model="value"
            label="Label"
            description="Lorem ipsum dolor sit amet."
            :state="InputState.warning"
          />
          <AntSwitch
            v-model="value"
            label="Label"
            description="Lorem ipsum dolor sit amet."
            :state="InputState.danger"
          />
        </AntFormGroup>
        <AntFormGroupLabel>Sizes</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch
            v-model="notValue"
            class="w-28"
            :size="AntSwitchSize.md"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntSwitch
            v-model="value"
            class="w-28"
            :size="AntSwitchSize.md"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntSwitch
            v-model="notValue"
            class="w-28"
            :size="AntSwitchSize.sm"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntSwitch
            v-model="value"
            class="w-28"
            :size="AntSwitchSize.sm"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
            <AntFormGroup direction="row">
              <AntSwitch
                v-model="notValue"
                label="Label"
                value="Value"
                description="Lorem ipsum dolor sit amet."
                :state="InputState.base"
                disabled
              />
              <AntSwitch
                v-model="value"
                label="Label"
                value="Value"
                description="Lorem ipsum dolor sit amet."
                :state="InputState.base"
                disabled
              />
            </AntFormGroup>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <AntFormGroup direction="row">
              <AntSwitch
                v-model="notValue"
                label="Label"
                value="Value"
                description="Lorem ipsum dolor sit amet."
                :state="InputState.base"
                :readonly="true"
              />
              <AntSwitch
                v-model="value"
                label="Label"
                value="Value"
                description="Lorem ipsum dolor sit amet."
                :state="InputState.base"
                :readonly="true"
              />
            </AntFormGroup>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntSwitch
              v-model="value"
              label="Label"
              value="Value"
              description="Lorem ipsum dolor sit amet."
              :state="InputState.base"
              skeleton
            />
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch v-model="notValue"/>
          <AntSwitch v-model="value"/>
        </AntFormGroup>
        <AntFormGroupLabel>With label & label + value</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch v-model="notValue" label="Label"/>
          <AntSwitch v-model="value" label="Label"/>
          <AntSwitch v-model="notValue" label="Label" value="Value"/>
          <AntSwitch v-model="value" label="Label" value="Value"/>
        </AntFormGroup>
        <AntFormGroupLabel>With description & description + value</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch v-model="notValue" class="w-28" description="Lorem ipsum dolor sit amet"/>
          <AntSwitch v-model="value" class="w-28" description="Lorem ipsum dolor sit amet"/>
          <AntSwitch v-model="notValue" class="w-28" description="Lorem ipsum dolor sit amet" value="Value"/>
          <AntSwitch v-model="value" class="w-28" description="Lorem ipsum dolor sit amet" value="Value"/>
        </AntFormGroup>
        <AntFormGroupLabel>With value</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch v-model="notValue" class="w-28" value="Value"/>
          <AntSwitch v-model="value" class="w-28" value="Value"/>
        </AntFormGroup>
        <AntFormGroupLabel>With label + description & label + description + value</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch v-model="notValue" class="w-28" description="Lorem ipsum dolor sit amet" label="Label"/>
          <AntSwitch v-model="value" class="w-28" description="Lorem ipsum dolor sit amet" label="Label"/>
          <AntSwitch v-model="notValue" class="w-28" description="Lorem ipsum dolor sit amet" value="Value" label="Label"/>
          <AntSwitch v-model="value" class="w-28" description="Lorem ipsum dolor sit amet" value="Value" label="Label"/>
        </AntFormGroup>
      </AntFormGroup>
    `
  })
};
