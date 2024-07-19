import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntSearch from '../AntSearch.vue';
import AntFormGroup from '../AntFormGroup.vue';
import AntFormGroupLabel from '../AntFormGroupLabel.vue';
import {ref} from 'vue';


const meta: Meta<typeof AntSearch> = {
  title: 'Components/Forms/Search',
  component: AntSearch,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      control: 'text',
      table: {type: {summary: 'string|null'}},
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
    },
    inputTimeout: {
      description:
        'How long is the timeout between inputs to update the value in milliseconds',
    },
    query: {
      description:
        'Read and write the value into url as urldecoded string. Using the given string as query name.',
    },
    placeholder: {
      table: {defaultValue: {summary: 'Search'}},
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntSearch>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntSearch},
    setup() {
      return {args};
    },
    template: `
      <AntSearch v-bind="args" v-model="args.modelValue"/>
      <div class="text-xs mt-4">Reactive value: {{ args.modelValue }}</div>
    `,
  }),
  args: {
    modelValue: '',
    placeholder: 'Search',
  },
};

export const summary: Story = {
  render: (args) => ({
    components: {AntSearch, AntFormGroup, AntFormGroupLabel},
    setup() {
      const value = ref('Keyword');
      const noValue = ref('');

      return {args, Size, value, noValue};
    },
    template: `
        <AntFormGroup>
          <AntFormGroupLabel>Sizes
          </AntFormGroupLabel>
          <AntFormGroup direction="row">
            <AntSearch v-bind="args" v-model="value" :size="Size.lg" class="w-48"/>
            <AntSearch v-bind="args" v-model="value" :size="Size.md" class="w-48"/>
            <AntSearch v-bind="args" v-model="value" :size="Size.sm" class="w-48"/>
            <AntSearch v-bind="args" v-model="value" :size="Size.xs" class="w-48"/>
            <AntSearch v-bind="args" v-model="value" :size="Size.xs2" class="w-48"/>
          </AntFormGroup>
          <AntFormGroup direction="row">
            <AntSearch v-bind="args" v-model="noValue" :size="Size.lg" class="w-48"/>
            <AntSearch v-bind="args" v-model="noValue" :size="Size.md" class="w-48"/>
            <AntSearch v-bind="args" v-model="noValue" :size="Size.sm" class="w-48"/>
            <AntSearch v-bind="args" v-model="noValue" :size="Size.xs" class="w-48"/>
            <AntSearch v-bind="args" v-model="noValue" :size="Size.xs2" class="w-48"/>
          </AntFormGroup>
          <AntFormGroup direction="row">
            <AntFormGroup>
              <AntFormGroupLabel>Disabled</AntFormGroupLabel>
              <AntSearch v-model="noValue" disabled class="w-48"/>
              <AntSearch v-model="value" disabled class="w-48"/>
            </AntFormGroup>
            <AntFormGroup>
              <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
              <AntSearch v-model="value" skeleton class="w-48"/>
            </AntFormGroup>
          </AntFormGroup>
          <AntFormGroupLabel>Plain</AntFormGroupLabel>
          <AntSearch v-model="value" class="w-48"/>
          <AntFormGroupLabel>With label</AntFormGroupLabel>
          <AntSearch v-model="value" class="w-48" label="Label"/>
          <AntFormGroupLabel>With description</AntFormGroupLabel>
          <AntSearch v-model="value" class="w-48" description="Lorem ipsum dolor sit amet"/>
          <AntFormGroupLabel>With label + description</AntFormGroupLabel>
          <AntSearch v-model="value" class="w-48" label="Label" description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>
    `,
  }),
  args: {
    placeholder: 'Search',
  },
};
