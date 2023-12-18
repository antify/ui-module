import AntDatePicker from '../AntDatePicker.vue';
import { ref } from 'vue';

export default {
  title: 'Components/Forms/Ant Date Picker',
  component: AntDatePicker,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    args: {
      description:
        'Additional attributes given to this will be forwarded to the vue datepicker directly. As well as all the default slots can be accessed from outside (See <a href="https://www.npmjs.com/package/%40vuepic%2Fvue-datepicker">@vuepic/vue-datepicker</a> for more details)',
    },
    id: {
      description: 'The ID for the Datepicker and label combination',
      table: {
        defaultValue: { summary: 'UUID', detail: 'A randomly generated UUID' },
      },
    },
    value: {
      control: 'none',
      description: 'The reactive value of the date picker',
    },
    label: {
      description:
        'The main label for the checkbox<br>can also be set via the default slot',
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntDatePicker },
  setup() {
    const value = ref(new Date(0));

    return { value };
  },
  template: `
  <div class="m-2">
    <AntDatePicker label="Datepicker" v-model:value="value"/>
  </div>`,
});

export const Localized = (args: any) => ({
  components: { AntDatePicker },
  setup() {
    const value = ref(new Date(0));
    args.label = 'Datepicker DE';
    args.locale = 'de';
    args.cancelText = 'Abbrechen';
    args.selectText = 'Auswählen';
    args.format = 'dd.MM.yyyy';
    return { args, value };
  },
  template: `
  <div class="m-2">
    <AntDatePicker
      v-model:value="value"
      v-bind="args"
     />
  </div>`,
});

export const Loading = (args: any) => ({
  components: { AntDatePicker },
  setup() {
    const value = ref(new Date(0));

    args.label = 'Label';
    args.description = 'description';
    args.loading = true;

    return { args, value };
  },
  template: `
  <div class="m-2">
    <AntDatePicker
      v-model:value="value"
      v-bind="args"
     />
  </div>`,
});
