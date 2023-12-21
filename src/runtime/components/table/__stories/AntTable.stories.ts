import AntTable from '../AntTable.vue';
import { AntTableAlign, AntTableRowTypes } from '../__types/TableHeader.type';
import { type Meta, type StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof AntTable> = {
  title: 'Components/Table/Ant Table',
  component: AntTable,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    headers: {
      description: 'List of header definitions',
      table: {
        type: {
          summary: 'TableHeader',
          detail: `
            type TableHeader = {
              identifier: string;
              headerClassList?: string;
              rowClassList?: string;
              title: string;
              type: AntTableRowTypes;
              links?: {
                to: string;
                label: string;
              }[];
            }`,
        },
      },
    },
    data: {
      description:
        'List of rows to be displayed in the table. The properties of the elements need to be equal to the identifier of a table row for it to be displayed<br>They will be updated as they are beeing moved inside the table.',
    },
    selectedRow: {
      description: 'Reactive value that contains the selected row.'
    },
    rowKey: {
      description: 'Prop name of a unique identifier in your data structure.'
    },
    loading: {
      description: 'If true will display skeleton rows instead of an empty table if there is no data provided, otherwise it will display an overlay.'
    },
    // Slots
    afterCellContent: {
      description:
        'Slot to add custom elements to all cells. Gets {elem, header} as property.',
      table: { type: { summary: 'HTML' } },
    },
    beforeCellContent: {
      description:
        'Slot to add custom elements to all cells. Gets {elem, header} as property.',
      table: { type: { summary: 'HTML' } },
    },
    emptyState: {
      description: 'Place for custom empty states.',
      table: { type: { summary: 'HTML' } },
    },
    headerContent: {
      description:
        'Overwrite for the default header items. Gets header as property.',
      table: { type: { summary: 'HTML' } },
    },
    headerFirstCell: {
      description: 'Space to add cells to the header.',
      table: { type: { summary: 'HTML' } },
    },
    headerLastCell: {
      description: 'Space to add cells to the header.',
      table: { type: { summary: 'HTML' } },
    },
    rowFirstCell: {
      description: 'Space to add cells to the beginning of a row. Be aware that you have to add headerFirstCells as well otherwise the headers will not match up to your cells.'
    },
    rowLastCell: {
      description:
        'Space to add cells to all rows. Gets the current element as property.',
      table: { type: { summary: 'HTML' } },
    },
    cellContent: {
      description: 'Is used if the ROW_TYPE = "SLOT". Gets the current element and the header element to identifier witch cell is currently displayed.',
      table: {
        type: { summary: 'HTML' }
      }
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntTable>;

const testData = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    linkLabel: 'Link here',
    link: '/#',
    picture:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    linkLabel: 'Link here',
    link: '/#',
    picture:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Anderson a. First?',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    linkLabel: 'Link here',
    link: '/#',
    picture:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

// TODO:: add some kind of mixed test data, maybe faker?
for (let i = 0; i < 100; i++) {
  testData.push({
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    linkLabel: 'Link here',
    link: '/#',
    picture:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  })
}

export const Docs: Story = {
  render: (args) => ({
    components: { AntTable },
    setup() {
      const selected = ref();

      return { args, selected };
    },
    template: `
      <div class="h-96">
        <AntTable v-bind="args" v-model="selected">
          <template #emptyState>
          </template>
        </AntTable>
      </div>
    `,
  }),
  args: {
    headers: [
      {
        title: 'Name',
        identifier: 'name',
        headerClassList: 'font-bold',
        rowClassList: '',
        type: AntTableRowTypes.text,
        align: AntTableAlign.center,
        sortable: true,
      },
      {
        title: 'Title',
        identifier: 'title',
        headerClassList: '',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'E-Mail',
        identifier: 'email',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'Link',
        identifier: 'linkLabel',
        toProp: 'link',
        type: AntTableRowTypes.link,
      }
    ],
    data: testData
  }
}

// TODO:: Stories for loading/custom/...
export const Empty: Story = {
  render: Docs.render,
  args: {
    headers: [
      {
        title: 'Name',
        identifier: 'name',
        headerClassList: 'font-bold',
        rowClassList: '',
        type: AntTableRowTypes.text,
        align: AntTableAlign.center,
        sortable: true,
      },
      {
        title: 'Title',
        identifier: 'title',
        headerClassList: '',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'E-Mail',
        identifier: 'email',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'Link',
        identifier: 'linkLabel',
        toProp: 'link',
        type: AntTableRowTypes.link,
      }
    ],
    data: []
  }
}
export const Skeleton: Story = {
  render: Docs.render,
  args: {
    loading: true,
    headers: [
      {
        title: 'Name',
        identifier: 'name',
        headerClassList: 'font-bold',
        rowClassList: '',
        type: AntTableRowTypes.text,
        align: AntTableAlign.center,
        sortable: true,
      },
      {
        title: 'Title',
        identifier: 'title',
        headerClassList: '',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'E-Mail',
        identifier: 'email',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'Link',
        identifier: 'linkLabel',
        toProp: 'link',
        type: AntTableRowTypes.link,
      }
    ],
    data: []
  }
}

export const Loading: Story = {
  render: Docs.render,
  args: {
    loading: true,
    headers: [
      {
        title: 'Name',
        identifier: 'name',
        headerClassList: 'font-bold',
        rowClassList: '',
        type: AntTableRowTypes.text,
        align: AntTableAlign.center,
        sortable: true,
      },
      {
        title: 'Title',
        identifier: 'title',
        headerClassList: '',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'E-Mail',
        identifier: 'email',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'Link',
        identifier: 'linkLabel',
        toProp: 'link',
        type: AntTableRowTypes.link,
      }
    ],
    data: testData
  }
}
