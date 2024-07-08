import AntCheckbox from '../AntCheckbox.vue';
import { computed, ref } from 'vue';
import { type Meta, type StoryObj } from '@storybook/vue3';
import { InputColorType, Size } from '../../../../enums';
import { useFieldValidator } from '@antify/validate';
import {AntCheckboxSize} from '../__types/AntCheckbox';

const meta: Meta<typeof AntCheckbox> = {
  title: 'Components/Forms/Checkbox/Checkbox',
  component: AntCheckbox,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    colorType: {
      control: { type: 'select' },
      options: Object.values(InputColorType),
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
          return args.modelValue
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
}

export const WithValidator: Story = {
  render: (args: any) => ({
    components: { AntCheckbox },
    setup() {
      const value = computed<boolean>({
        get() {
          return args.modelValue
        },
        set(val) {
          // @ts-ignore
          args.modelValue = val;
        }
      });
      const validator =  ref(useFieldValidator((val: boolean) => val || 'Check this box!'));

      validator.value.validate(value.value);

      return { args, value, validator };
    },
    template: `
      <div class="m-2">
        <AntCheckbox v-bind="args" v-model="value" :validator="validator" value-label="Accept some kind of document before continuing"/>
        <span class="text-sm text-gray-500">Reactive value: {{ value }}</span>
      </div>
    `,
  }),
}

export const Summary: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => ({
    components: {AntCheckbox},
    setup() {
      const offValue = ref(false);
      const onValue = ref(true);

      return {
        args,
        offValue,
        onValue,
        InputColorType,
        AntCheckboxSize
      };
    },
    template: `
      <h3>Medium Size</h3>
      <div class="flex flex-col gap-5">
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" :color-type="InputColorType.base" />
          <AntCheckbox v-model="offValue" :color-type="InputColorType.info" />
          <AntCheckbox v-model="offValue" :color-type="InputColorType.success" />
          <AntCheckbox v-model="offValue" :color-type="InputColorType.warning" />
          <AntCheckbox v-model="offValue" :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" :color-type="InputColorType.base" />
          <AntCheckbox v-model="onValue" :color-type="InputColorType.info" />
          <AntCheckbox v-model="onValue" :color-type="InputColorType.success" />
          <AntCheckbox v-model="onValue" :color-type="InputColorType.warning" />
          <AntCheckbox v-model="onValue" :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" label="Label" :color-type="InputColorType.base" />
          <AntCheckbox v-model="offValue" label="Label" :color-type="InputColorType.info" />
          <AntCheckbox v-model="offValue" label="Label" :color-type="InputColorType.success" />
          <AntCheckbox v-model="offValue" label="Label" :color-type="InputColorType.warning" />
          <AntCheckbox v-model="offValue" label="Label" :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" label="Label" :color-type="InputColorType.base" />
          <AntCheckbox v-model="onValue" label="Label" :color-type="InputColorType.info" />
          <AntCheckbox v-model="onValue" label="Label" :color-type="InputColorType.success" />
          <AntCheckbox v-model="onValue" label="Label" :color-type="InputColorType.warning" />
          <AntCheckbox v-model="onValue" label="Label" :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" />
          <AntCheckbox v-model="offValue" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" />
          <AntCheckbox v-model="offValue" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" />
          <AntCheckbox v-model="offValue" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" />
          <AntCheckbox v-model="offValue" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" />
          <AntCheckbox v-model="onValue" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" />
          <AntCheckbox v-model="onValue" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" />
          <AntCheckbox v-model="onValue" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" />
          <AntCheckbox v-model="onValue" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" />
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" />
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" />
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" />
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" />
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" />
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" />
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" />
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" readonly/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" readonly/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" readonly/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" readonly/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" readonly/>
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" readonly/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" readonly/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" readonly/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" readonly/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" readonly/>
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" disabled/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" disabled/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" disabled/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" disabled/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" disabled/>
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" disabled/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" disabled/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" disabled/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" disabled/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" disabled/>
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" skeleton/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" skeleton/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" skeleton/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" skeleton/>
          <AntCheckbox v-model="offValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" skeleton/>
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" skeleton/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" skeleton/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" skeleton/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" skeleton/>
          <AntCheckbox v-model="onValue" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" skeleton/>
        </div>
      </div>
      <h3>Small Size</h3>
      <div class="flex flex-col gap-5">
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" :color-type="InputColorType.base" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" :color-type="InputColorType.info" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" :color-type="InputColorType.success" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" :color-type="InputColorType.warning" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" :color-type="InputColorType.base" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" :color-type="InputColorType.info" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" :color-type="InputColorType.success" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" :color-type="InputColorType.warning" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" :color-type="InputColorType.base" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" :color-type="InputColorType.info" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" :color-type="InputColorType.success" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" :color-type="InputColorType.warning" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" :color-type="InputColorType.base" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" :color-type="InputColorType.info" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" :color-type="InputColorType.success" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" :color-type="InputColorType.warning" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" />
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" />
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" />
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" readonly/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" readonly/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" readonly/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" readonly/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" readonly/>
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" readonly/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" readonly/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" readonly/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" readonly/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" readonly/>
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" disabled/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" disabled/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" disabled/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" disabled/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" disabled/>
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" disabled/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" disabled/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" disabled/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" disabled/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" disabled/>
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" skeleton/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" skeleton/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" skeleton/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" skeleton/>
          <AntCheckbox v-model="offValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" skeleton/>
        </div>
        <div class="flex gap-2.5">
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.base" skeleton/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.info" skeleton/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.success" skeleton/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.warning" skeleton/>
          <AntCheckbox v-model="onValue" :size="AntCheckboxSize.sm" label="Label" value-label="Value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." :color-type="InputColorType.danger" skeleton/>
        </div>
      </div>
    `
  })
}
