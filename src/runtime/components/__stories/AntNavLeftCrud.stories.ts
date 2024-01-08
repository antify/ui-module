import AntNavLeftCrud from '../AntNavLeftCrud.vue';
import AntTableNav from '../AntTableNav.vue';
import AntTable from '../table/AntTable.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {AntTableAlign, AntTableRowTypes} from '../table/__types/TableHeader.type';
import {ref} from 'vue';

const meta: Meta<typeof AntNavLeftCrud> = {
  title: 'Layouts/Nav Left Crud',
  component: AntNavLeftCrud,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntNavLeftCrud>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntNavLeftCrud,
      AntTableNav,
      AntTable
    },
    setup() {
      const selectedDataItem = ref(null);

      return {
        args,
        selectedDataItem,
        tableData: [
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
        ],
        tableHeaders: [
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
        ]
      };
    },
    template: `
      <div class="p-4">
        <AntNavLeftCrud v-bind="args">
          <template #logo-section>
            logo-section
          </template>
          <template #nav-section>
            nav-section
          </template>
          <template #nav-footer-section>
            nav-footer-section
          </template>
          <template #search-section>
            search-section
          </template>
          <template #table-section>
            <AntTable
              v-model="selectedDataItem"
              :data="tableData"
              :headers="tableHeaders"
              selectable-rows
            />
          </template>
          <template #table-nav-section>
            <AntTableNav
              :pages="1"
              :full-width="!selectedDataItem"
            />
          </template>
          <template #main-header-section>
            main-header-section
          </template>
          <template v-if="selectedDataItem" #main-section>
            main-section
          </template>
          <template #main-footer-section>
            main-footer-section
          </template>
        </AntNavLeftCrud>
      </div>`,
  }),
  args: {}
}
