import AntCheckbox from '../AntCheckbox.vue';
import { computed, ref } from 'vue';
import { type Meta, type StoryObj } from '@storybook/vue3';
import { InputState, Size } from '../../../../enums';
import { useFieldValidator } from '@antify/validate';
import {AntCheckboxSize} from '../__types/AntCheckbox';
import AntFormGroup from '../../AntFormGroup.vue';
import AntFormGroupLabel from '../../AntFormGroupLabel.vue';

const meta: Meta<typeof AntCheckbox> = {
  title: 'Components/Forms/Checkbox/Checkbox',
  component: AntCheckbox,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    state: {
      control: { type: 'select' },
      options: Object.values(InputState),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(AntCheckboxSize),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntCheckbox>;

export const Docs: Story = {
  render: (args: any) => ({
    components: { AntCheckbox },
    setup() {
      const value = computed<boolean>({
        get() {
          return args.modelValue;
        },
        set(val) {
          // @ts-ignore
          args.modelValue = val;
        }
      });

      return { args, value };
    },
    template: `
      <div class="m-2">
        <AntCheckbox v-bind="args" v-model="value"/>
        <span class="text-sm text-gray-500">Reactive value: {{ value }}</span>
      </div>
    `,
  }),
};

export const WithValidator: Story = {
  render: (args: any) => ({
    components: { AntCheckbox },
    setup() {
      const modelValue = computed<boolean>({
        get() {
          return args.modelValue;
        },
        set(val) {
          // @ts-ignore
          args.modelValue = val;
        }
      });
      const validator =  ref(useFieldValidator((val: boolean) => !val ? 'Check this box!' : true));


      return { args, modelValue, validator };
    },
    template: `
      <div class="m-2">
        <AntCheckbox
          v-bind="args"
          v-model="modelValue"
          value-label="Accept some kind of document before continuing"
          :errors="Array.isArray(args.errors) ? args.errors : validator.getErrors()"
          @validate="(val) => validator.validate(val)"
        />
        <span class="text-sm text-gray-500">Reactive value: {{ modelValue }}</span>
      </div>
    `,
  }),
  args: {
    modelValue: false
  }
};

export const Summary: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => ({
    components: {AntCheckbox, AntFormGroup, AntFormGroupLabel},
    setup() {
      const offValue = ref(false);
      const onValue = ref(true);

      return {
        args,
        offValue,
        onValue,
        InputState,
        AntCheckboxSize
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>States</AntFormGroupLabel>
        <AntFormGroup>
          <AntFormGroup direction="row">
            <AntCheckbox v-model="offValue" class="w-28" :state="InputState.base" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="offValue" class="w-28" :state="InputState.info" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="offValue" class="w-28" :state="InputState.success" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="offValue" class="w-28" :state="InputState.warning" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="offValue" class="w-28" :state="InputState.danger" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="onValue" class="w-28" :state="InputState.base" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="onValue" class="w-28" :state="InputState.info" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="onValue" class="w-28" :state="InputState.success" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="onValue" class="w-28" :state="InputState.warning" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="onValue" class="w-28" :state="InputState.danger" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
          <AntFormGroupLabel>Sizes</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <AntCheckbox v-model="offValue" class="w-28" :size="AntCheckboxSize.md" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="onValue" class="w-28" :size="AntCheckboxSize.md" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="offValue" class="w-28" :size="AntCheckboxSize.sm" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="onValue" class="w-28" :size="AntCheckboxSize.sm" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
          <AntFormGroup direction="row">
            <AntFormGroup>
              <AntFormGroupLabel>Disabled</AntFormGroupLabel>
              <AntFormGroup direction="row">
                <AntCheckbox v-model="offValue" class="w-28" label="Label" value-label="Value"
                             description="Lorem ipsum dolor sit amet." :state="InputState.base" disabled/>
                <AntCheckbox v-model="onValue" class="w-28" label="Label" value-label="Value"
                             description="Lorem ipsum dolor sit amet." :state="InputState.base" disabled/>
              </AntFormGroup>
            </AntFormGroup>
            <AntFormGroup>
              <AntFormGroupLabel>Readonly</AntFormGroupLabel>
              <AntFormGroup direction="row">
                <AntCheckbox v-model="offValue" :readonly="true" class="w-28" label="Label" value-label="Value"
                             description="Lorem ipsum dolor sit amet." :state="InputState.base"/>
                <AntCheckbox v-model="onValue" :readonly="true" class="w-28" label="Label" value-label="Value"
                             description="Lorem ipsum dolor sit amet." :state="InputState.base"/>
              </AntFormGroup>
            </AntFormGroup>
            <AntFormGroup>
              <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
              <AntCheckbox v-model="offValue" class="w-28" label="Label" value-label="Value"
                           description="Lorem ipsum dolor sit amet." :state="InputState.base" skeleton/>
            </AntFormGroup>
          </AntFormGroup>
          <AntFormGroupLabel>Plain</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <AntCheckbox v-model="offValue"/>
            <AntCheckbox v-model="onValue"/>
          </AntFormGroup>
          <AntFormGroupLabel>With label & label + value</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <AntCheckbox v-model="offValue" label="Label"/>
            <AntCheckbox v-model="onValue" label="Label"/>
            <AntCheckbox v-model="offValue" label="Label" value-label="Value"/>
            <AntCheckbox v-model="onValue" label="Label" value-label="Value"/>
          </AntFormGroup>
          <AntFormGroupLabel>With description & description + value</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <AntCheckbox v-model="offValue" class="w-28" description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="onValue" class="w-28" description="Lorem ipsum dolor sit amet"/>
            <AntCheckbox v-model="offValue" class="w-28" description="Lorem ipsum dolor sit amet" value-label="Value"/>
            <AntCheckbox v-model="onValue" class="w-28" description="Lorem ipsum dolor sit amet" value-label="Value"/>
          </AntFormGroup>
          <AntFormGroupLabel>With value</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <AntCheckbox v-model="offValue" class="w-28" value-label="Value"/>
            <AntCheckbox v-model="onValue" class="w-28" value-label="Value"/>
          </AntFormGroup>
          <AntFormGroupLabel>With label + description & label + description + value</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <AntCheckbox v-model="offValue" class="w-28" description="Lorem ipsum dolor sit amet" label="Label"/>
            <AntCheckbox v-model="onValue" class="w-28" description="Lorem ipsum dolor sit amet" label="Label"/>
            <AntCheckbox v-model="offValue" class="w-28" description="Lorem ipsum dolor sit amet" value-label="Value" label="Label"/>
            <AntCheckbox v-model="onValue" class="w-28" description="Lorem ipsum dolor sit amet" value-label="Value" label="Label"/>
          </AntFormGroup>
        </AntFormGroup>
      </AntFormGroup>
    `
  })
};
