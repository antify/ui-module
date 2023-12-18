import AntSidebar from '../AntSidebar.vue';
import AntButton from '../../form/AntButton.vue';
import { ref } from 'vue';

export default {
  title: 'Components/Layout/Ant Sidebar',
  component: AntSidebar,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    open: {
      description: 'Reactive value to open and close the sidebar',
    },
    closeIcon: {
      description:
        'Override for the close icon<br><a href="https://fontawesome.com/icons/x?s=solid">Link to default</a>',
      table: {
        type: { summary: 'HTML' },
        defaultValue: {
          summary: 'faX',
          detail: 'Contains logic to close the modal',
        },
      },
    },
    default: {
      description: 'The main content area',
      table: {
        type: { summary: 'HTML' },
      },
    },
    title: {
      description: 'Slot for the title area',
      table: {
        type: { summary: 'HTML' },
      },
    },
  },
};

export const Primary = (args: any) => ({
  components: { AntSidebar, AntButton },
  setup() {
    const open = ref<boolean>(true);

    return { args, open };
  },
  template: `
  <AntButton @click="(open = true)" class="m-2">Open Sidebar</AntButton>

  <AntSidebar v-bind="args" v-model:open="open" ></AntSidebar>
  `,
});
