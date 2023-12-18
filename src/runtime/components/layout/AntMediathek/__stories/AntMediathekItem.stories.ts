import AntMediathekItem from '../AntMediathekItem.vue';
import { faFile } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'Components/Layout/Mediathek/Ant MediathekItem',
  component: AntMediathekItem,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    icon: {
      description: 'Slot|attribute to display a icon or image.',
      table: { type: { summary: 'HTML|IconDefinition' } },
    },
    type: {
      description: 'Attribute for filetype (image,pdf,...) {not required}.',
      table: { type: { summary: 'string' } },
    },
    title: {
      description: 'Slot|attribute to display a title.',
      table: { type: { summary: 'HTML|string' } },
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntMediathekItem },
  setup() {
    return { args, faFile };
  },
  template: `
  <div class="m-2">
    <AntMediathekItem class="w-36" v-bind="args">
      <template #icon>
        <fa-icon :icon="faFile" class="text-gray-400" />
      </template>
      <template #title>
        <span title="some file.txt">some file.txt</span>
      </template>
    </AntMediathekItem>
  </div>
  `,
});

export const NoTitleAsImage = (args: any) => ({
  components: { AntMediathekItem },
  setup() {
    return { args, faFile };
  },
  template: `
  <div class="m-2">
    <AntMediathekItem class="w-36" v-bind="args">
      <template #icon>
        <img class="object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
      </template>
    </AntMediathekItem>
  </div>
  `,
});

export const AsPdf = (args: any) => ({
  components: { AntMediathekItem },
  setup() {
    args.title = 'somePdf.pdf';

    return { args };
  },
  template: `
  <div class="m-2">
    <AntMediathekItem class="w-36" v-bind="args">
    </AntMediathekItem>
  </div>
  `,
});
