import AntDragDropTable from '../AntDragDropTable.vue';
import { TableHeader, ROW_TYPES } from '../../../types/TableHeader.type';

import { ref } from 'vue';
export default {
  title: 'Components/Table/Ant DragDrop Table',
  component: AntDragDropTable,
  parameters: { controls: { sort: 'requiredFirst' } },
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
          detail: `type TableHeader = {
        identifier: string;
        headerClassList?: string;
        rowClassList?: string;
        title: string;
        type: ROW_TYPES;
        links?: {
          href: string;
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
    grabberIcon: {
      description:
        'Override for the default grabber icon<br><a href="https://fontawesome.com/icons/ellipsis-vertical?s=solid">Link to default</a>',
      table: {
        type: { detail: 'A fontAwesome icon' },
        defaultValue: { summary: 'faEllipsisVertical' },
      },
    },
    afterRowContent: {
      description:
        'Slot to add custom elements to all cells. Gets {elem, header} as property.',
      table: { type: { summary: 'HTML' } },
    },
    beforeRowContent: {
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
    headerLastCell: {
      description: 'Space to add cells to the header.',
      table: { type: { summary: 'HTML' } },
    },
    rowLastCell: {
      description:
        'Space to add cells to all rows. Gets the current element as property.',
      table: { type: { summary: 'HTML' } },
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntDragDropTable },
  setup() {
    const testData = ref([
      {
        id: 1,
        duration: 10,
        timeFrom: '16:00',
        timeTo: '16:10',
        theme: 'Warm-Up',
        order: 10,
      },
      {
        id: 2,
        duration: 45,
        timeFrom: '16:10',
        timeTo: '16:55',
        theme: 'Hot-Seat',
        order: 20,
      },
      {
        id: 3,
        duration: 5,
        timeFrom: '16:55',
        timeTo: '17:00',
        theme: 'Pause',
        order: 30,
      },
      {
        id: 4,
        duration: 45,
        timeFrom: '17:00',
        timeTo: '17:45',
        theme: 'Hot-Seat',
        order: 40,
      },
      {
        id: 5,
        duration: 10,
        timeFrom: '17:45',
        timeTo: '17:55',
        theme: 'Feedback',
        order: 50,
      },
      {
        id: 6,
        duration: 5,
        timeFrom: '17:55',
        timeTo: '18:00',
        theme: 'New appointment and finish',
        order: 60,
      },
    ]);

    const simpleHeaders = ref<TableHeader[]>([
      {
        identifier: 'duration',
        title: 'Dauer',
        type: ROW_TYPES.TEXT,
      },
      {
        identifier: 'timeFrom',
        title: 'Uhrzeit',
        type: ROW_TYPES.TEXT,
      },
      {
        identifier: 'timeTo',
        title: 'Uhrzeit',
        headerClassList: 'sr-only',
        type: ROW_TYPES.TEXT,
      },
      {
        identifier: 'theme',
        title: 'Thema',
        type: ROW_TYPES.TEXT,
      },
    ]);

    return { testData, simpleHeaders };
  },
  template: `
  <AntDragDropTable
    :headers="simpleHeaders"
    v-model:data="testData"
  >
  </AntDragDropTable>`,
});
