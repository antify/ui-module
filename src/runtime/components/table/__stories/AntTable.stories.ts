import AntTable from '../AntTable.vue';
import {ROW_TYPES} from '../../../types/TableHeader.type';

export default {
  title: 'Components/Table/Ant Table',
  component: AntTable,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    args: {
      description:
        'Additional attributes will be forwarded to the table element.',
    },
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
              type: ROW_TYPES;
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
    rowHover: {
      description: 'If true will enable hover effects for each row.'
    },
    loading: {
      description: 'If true will display skeleton rows instead of an empty table.'
    },
    afterRowContent: {
      description:
        'Slot to add custom elements to all cells. Gets {elem, header} as property.',
      table: {type: {summary: 'HTML'}},
    },
    beforeRowContent: {
      description:
        'Slot to add custom elements to all cells. Gets {elem, header} as property.',
      table: {type: {summary: 'HTML'}},
    },
    emptyState: {
      description: 'Place for custom empty states.',
      table: {type: {summary: 'HTML'}},
    },
    headerContent: {
      description:
        'Overwrite for the default header items. Gets header as property.',
      table: {type: {summary: 'HTML'}},
    },
    headerLastCell: {
      description: 'Space to add cells to the header.',
      table: {type: {summary: 'HTML'}},
    },
    rowLastCell: {
      description:
        'Space to add cells to all rows. Gets the current element as property.',
      table: {type: {summary: 'HTML'}},
    },
    cellContent: {
      description: 'Is used if the ROW_TYPE = "SLOT". Gets the current element and the header element to identifier witch cell is currently displayed.',
      table: {
        type: {summary: 'HTML'}
      }
    },
    loadingRow: {
      description: 'Slot to overwrite the default loading skeleton.',
      table: {
        type: {summary: 'HTML'}
      }
    }
  },
};

const Template = (args: any) => ({
  components: {AntTable},
  setup() {
    return {args};
  },
  template: `
    <div class="h-96">
    <AntTable v-bind="args">
      <template #emptyState>
      </template>
    </AntTable>
    </div>
  `,
});

const testData = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    picture:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    picture:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

/**
 * Primary use of Table.
 */
export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
  headers: [
    {
      title: 'Name',
      identifier: 'name',
      headerClassList: 'font-bold',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
    {
      title: 'Title',
      identifier: 'title',
      headerClassList: '',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
    {
      title: 'E-Mail',
      identifier: 'email',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
  ],
  data: testData,
  rowHover: true,
};

/**
 * Posibility to add images and style them
 */
export const WithImage = Template.bind({});
// @ts-ignore
WithImage.args = {
  headers: [
    {
      title: 'Profilbild',
      identifier: 'picture',
      headerClassList: 'sr-only',
      rowClassList: 'w-12 rounded-full block overflow-hidden',
      type: ROW_TYPES.IMAGE,
    },
    {
      title: 'Name',
      identifier: 'name',
      headerClassList: 'font-bold',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
    {
      title: 'Title',
      identifier: 'title',
      headerClassList: '',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
    {
      title: 'E-Mail',
      identifier: 'email',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
  ],
  data: testData,
};

export const Links = Template.bind({});
// @ts-ignore
Links.args = {
  headers: [
    {
      title: 'Name',
      identifier: 'name',
      headerClassList: 'font-bold',
      rowClassList: '',
      type: ROW_TYPES.TEXT_WITH_LINKS,
      links: [
        {
          to: '#',
          label: 'Meetings',
        },
        {
          to: '#',
          label: 'Stammdaten',
        },
      ],
    },
    {
      title: 'Title',
      identifier: 'title',
      headerClassList: '',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
    {
      title: 'E-Mail',
      identifier: 'email',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
  ],
  data: testData,
};

export const SingleHeader = Template.bind({});
// @ts-ignore
SingleHeader.args = {
  headers: [
    {
      title: 'Name',
      identifier: 'name',
      headerClassList: 'font-bold',
      rowClassList: '',
      type: ROW_TYPES.TEXT_WITH_LINKS,
      links: [
        {
          to: '#',
          label: 'Meetings',
        },
        {
          to: '#',
          label: 'Stammdaten',
        },
      ],
    },
  ],
  data: testData,
};

export const EmptyState = Template.bind({});
// @ts-ignore
EmptyState.args = {
  headers: [
    {
      title: 'Name',
      identifier: 'name',
      headerClassList: 'font-bold',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
    {
      title: 'Title',
      identifier: 'title',
      headerClassList: '',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
    {
      title: 'E-Mail',
      identifier: 'email',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
  ],
  data: [],
};

export const LoadingState = Template.bind({});
// @ts-ignore
LoadingState.args = {
  headers: [
    {
      title: 'Name',
      identifier: 'name',
      headerClassList: 'font-bold',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
    {
      title: 'Title',
      identifier: 'title',
      headerClassList: '',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
    {
      title: 'E-Mail',
      identifier: 'email',
      rowClassList: '',
      type: ROW_TYPES.TEXT,
    },
  ],
  data: [],
  loading: true
};
