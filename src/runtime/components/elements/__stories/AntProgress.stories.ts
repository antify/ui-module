import AntProgress from '../AntProgress.vue';

export default {
  title: 'Components/Elements/Ant Progress',
  component: AntProgress,
  argTypes: {
    id: {
      description: 'ID for label and progress bar.',
      table: {
        defaultValue: { summary: 'UUID', detail: 'A randomly generated UUID' },
      },
    },
    value: {
      description: 'The current value for the progress bar',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    fullValue: {
      description: 'The 100% point for the progress bar',
      table: {
        defaultValue: { summary: '100' },
      },
    },
    color: {
      control: 'text',
      table: { defaultValue: { summary: 'primary' } },
      description: 'A tailwind css color definition',
    },
    label: {
      description:
        'The main label for the progress bar<br>(can be a slot or a property)',
      table: { type: { summary: 'HTML|String' } },
    },
    default: {
      description:
        'Slot that can be used to display values inside the progress bar',
      table: { type: { summary: 'HTML' } },
    },
  },
};

const SimpleTemplate = (args: any) => ({
  components: { AntProgress },
  setup() {
    return {
      args,
    };
  },
  template: `
  <div class="m-2">
    <AntProgress v-bind="args"/>
  </div>
  `,
});
export const Simple = SimpleTemplate.bind({});
// @ts-ignore
Simple.args = {
  id: 'progress-id-123456789',
  value: 3700,
  fullValue: 15000,
  label: 'EUR',
  color: 'blue-500',
};

export const WithDefaultContent = (args: any) => ({
  components: { AntProgress },
  setup() {
    return { args, value: 50 };
  },
  template: `
  <div class="m-2">
    <AntProgress :value="value">
      <template #label>
        <span class="text-primary font-bold">Label in template</span>
      </template>

      <span class="text-xs my-0.5">Almost there</span>
    </AntProgress>
  </div>
  `,
});
