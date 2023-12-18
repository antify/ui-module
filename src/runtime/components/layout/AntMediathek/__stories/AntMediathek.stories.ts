import AntMediathek from '../AntMediathek.vue';
import AntMediathekItem from '../AntMediathekItem.vue';
import { faFile, faFileImage } from '@fortawesome/free-regular-svg-icons';
import { ref } from 'vue';

export default {
  title: 'Components/Layout/Mediathek/Ant Mediathek',
  component: AntMediathek,
  subcomponents: { AntMediathekItem },
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    search: {
      description:
        'Event that is fired when the search-input gets changed, gets the input value (string) as parameter. Will not fire if "searchField"-slot is used.',
    },
    searchPlaceholder: {
      description: 'placeholder for the search field',
      table: { defaultValue: { summary: 'Search' } },
    },
    addFilters: {
      description: 'Slot to add filters in the header-bar',
      table: { type: { summary: 'HTML' } },
    },
    filters: {
      description:
        'Slot to override all filters (addFilters-Slot will be overwriten as well)',
      table: { type: { summary: 'HTML' } },
    },
    searchField: {
      description: 'Slot to override the search-input',
      table: { type: { summary: 'HTML' } },
    },
    title: {
      description: 'Slot to set the title, can also be a property.',
      table: { type: { summary: 'HTML|string' } },
    },
    default: {
      description:
        'Slot to set the content of the mediathek. Here you get a "style" attribute that is "table" or "cell" you should display the content depending on what it is. If its "cell" you can use the <AntMediathekItem> for a simple design.',
      table: { type: { summary: 'HTML' } },
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntMediathek, AntMediathekItem },
  setup() {
    args.title = 'Test Title';

    const items = ref([
      {
        icon: faFile,
        title: 'some file.txt',
      },
      {
        title: 'some PDF.pdf',
      },
      {
        icon: faFile,
        title: 'some other file.txt',
      },
      {
        icon: faFile,
        title: 'some-file-with-long-title.txt',
      },
      {
        icon: faFile,
        title: 'somefilewithlongtitleandnowaytobreak.txt',
      },
      {
        icon: faFileImage,
        imageSrc:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        title: 'some-profile-pic.png',
      },
    ]);

    return { args, items };
  },
  template: `
    <div class="m-2">
      <AntMediathek v-bind="args" class="space-x-4 mt-4">
        <template #default={style}>
          <AntMediathekItem v-for="item in items" :title="item.title" class="w-full">
            <template #icon>
              <img v-if="item.imageSrc" :src="item.imageSrc" :alt="item.title" />
              <fa-icon v-else-if="item.icon" :icon="item.icon" class="text-gray-400"/>
            </template>
            <template #title>
              <span :title="item.title">{{item.title}}</span>
            </template>
          </AntMediathekItem>
        </template>
      </AntMediathek>
    </div>
  `,
});
