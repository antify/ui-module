import AntSearchSelect from '../AntSearchSelect.vue';
import { ref } from 'vue';
import {type SelectOption} from '../../../form/__types';

export default {
  title: 'Deprecated/Forms/Ant Search Select',
  component: AntSearchSelect,
  parameters: { controls: { sort: 'requiredFirst' } },
  decorators: [() => ({ template: '<div class="m-2"><story/></div>' })],
};

const simpleOptions: SelectOption[] = [
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

export const Simple = (args: any) => ({
  components: { AntSearchSelect },
  setup() {
    const value = ref('');
    args.label = 'Simple Search Select (Combobox)';
    args.description = 'This is a simple search select.';
    args.options = simpleOptions;

    return { args, value };
  },
  template: `
  <AntSearchSelect v-bind="args" v-model:value="value"/>

  <span class="text-gray-500 text-xs mt-80 block">Reactive value: {{value}}</span>
  `,
});
