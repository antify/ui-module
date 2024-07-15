import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntSelect from '../AntSelect.vue';
import {computed} from 'vue';
import {useFieldValidator} from '@antify/validate';
import {type SelectOption} from '../__types/AntSelect.type';
import {InputColorType} from '../../../enums';
const meta: Meta<typeof AntSelect> = {
  title: 'Components/Forms/Select',
  component: AntSelect,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      table: {type: {summary: 'string|null'}},
    },
    options: {
      description: 'List of SelectOptions',
      table: {
        type: {
          summary: 'SelectOption[]',
          detail: 'type SelectOption = {label: string; value: string | number;}',
        },
      },
    },
    colorType: {
      control: {type: 'select'},
      options: Object.values(InputColorType),
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

type Story = StoryObj<typeof AntSelect>;

const options: SelectOption[] = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
  {
    label: 'Option 3',
    value: '3',
  },
  {
    label: 'Option 4',
    value: '4',
  },
];

export const Docs: Story = {
  render: (args) => ({
    components: {AntSelect},
    setup() {
      const modelValue = computed({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
        set: (val) => args.modelValue = val
      });

      return {args, modelValue};
    },
    template: `
      <AntSelect v-bind="args" v-model="modelValue"/>`,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    options,
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};
export const withValidator: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    nullable: true,
    validator: useFieldValidator([
      (val: string) => val !== null || 'This field should not be empty'
    ])
  },
};
export const nullable: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    modelValue: '1',
    nullable: true
  },
};
export const skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    nullable: true,
    skeleton: true
  },
};
export const disabled: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    disabled: true
  },
};
export const withPlaceholder: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    placeholder: 'Lorem ipsum dolor sit amet'
  },
};
export const ellipsisText: Story = {
  render: (args, ctx) => ({
    // @ts-ignore
    components: Docs.render(args, ctx).components,
    // @ts-ignore
    setup: Docs.render(args, ctx).setup,
    template: `
      <div class="px-4 pt-4 pb-72 flex gap-2.5">
        <div class="w-1/6 flex flex-col gap-2.5 border border-info-500 border-dashed">
          <AntSelect v-bind="args" v-model="modelValue"/>
          <AntSelect v-bind="args" value="5"/>
        </div>
        <div class="w-2/6 flex flex-row gap-2.5 border border-info-500 border-dashed">
          <AntSelect v-bind="args" v-model="modelValue"/>
          <AntSelect v-bind="args" value="5"/>
        </div>
        <div class="flex flex-row gap-2.5 border border-info-500 border-dashed">
          <AntSelect v-bind="args" wrapper-class="w-1/6" v-model="modelValue"/>
          <AntSelect v-bind="args" wrapper-class="w-1/6" value="5"/>
        </div>
      </div>
    `,
  }),
  args: {
    ...Docs.args,
    nullable: true
  },
};
export const summary: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => ({
    components: {AntSelect},
    setup() {
      return {args};
    },
    template: `
      <div class="p-4 flex flex-col gap-2.5">
        <div class="flex w-2/5 gap-2.5">
          <AntSelect v-bind="args" :value="null"
                     placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"/>
          <AntSelect v-bind="args" value="5"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" :value="null" size="md" color-type="base"/>
          <AntSelect v-bind="args" :value="null" size="md" color-type="info"/>
          <AntSelect v-bind="args" :value="null" size="md" color-type="success"/>
          <AntSelect v-bind="args" :value="null" size="md" color-type="warning"/>
          <AntSelect v-bind="args" :value="null" size="md" color-type="danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" :value="null" size="sm" color-type="base"/>
          <AntSelect v-bind="args" :value="null" size="sm" color-type="info"/>
          <AntSelect v-bind="args" :value="null" size="sm" color-type="success"/>
          <AntSelect v-bind="args" :value="null" size="sm" color-type="warning"/>
          <AntSelect v-bind="args" :value="null" size="sm" color-type="danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" value="1" size="md" color-type="base"/>
          <AntSelect v-bind="args" value="1" size="md" color-type="info"/>
          <AntSelect v-bind="args" value="1" size="md" color-type="success"/>
          <AntSelect v-bind="args" value="1" size="md" color-type="warning"/>
          <AntSelect v-bind="args" value="1" size="md" color-type="danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" value="1" size="sm" color-type="base"/>
          <AntSelect v-bind="args" value="1" size="sm" color-type="info"/>
          <AntSelect v-bind="args" value="1" size="sm" color-type="success"/>
          <AntSelect v-bind="args" value="1" size="sm" color-type="warning"/>
          <AntSelect v-bind="args" value="1" size="sm" color-type="danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" value="1" size="sm" color-type="base" disabled/>
          <AntSelect v-bind="args" value="1" size="sm" color-type="info" disabled/>
          <AntSelect v-bind="args" value="1" size="sm" color-type="success" disabled/>
          <AntSelect v-bind="args" value="1" size="sm" color-type="warning" disabled/>
          <AntSelect v-bind="args" value="1" size="sm" color-type="danger" disabled/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" :value="null" grouped="none"/>
          <AntSelect v-bind="args" :value="null" grouped="right"/>
          <AntSelect v-bind="args" :value="null" grouped="center"/>
          <AntSelect v-bind="args" :value="null" grouped="left"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" value="1" size="md" nullable color-type="base"/>
          <AntSelect v-bind="args" value="1" size="md" nullable color-type="info"/>
          <AntSelect v-bind="args" value="1" size="md" nullable color-type="success"/>
          <AntSelect v-bind="args" value="1" size="md" nullable color-type="warning"/>
          <AntSelect v-bind="args" value="1" size="md" nullable color-type="danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" value="1" size="sm" nullable color-type="base"/>
          <AntSelect v-bind="args" value="1" size="sm" nullable color-type="info"/>
          <AntSelect v-bind="args" value="1" size="sm" nullable color-type="success"/>
          <AntSelect v-bind="args" value="1" size="sm" nullable color-type="warning"/>
          <AntSelect v-bind="args" value="1" size="sm" nullable color-type="danger"/>
        </div>
      </div>
    `,
  }),
  args: {
    ...Docs.args
  },
};
