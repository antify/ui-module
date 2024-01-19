import {computed, ref, watch} from 'vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import AntTabs from '../../tabs/AntTabs.vue';
import AntCrud from '../AntCrud.vue';
import AntCrudTableNav from '../AntCrudTableNav.vue';
import AntTable from '../../table/AntTable.vue';
import AntCrudTableFilter from '../AntCrudTableFilter.vue';
import AntCrudDetail from '../AntCrudDetail.vue';
import {AntTableRowTypes} from '../../table/__types/TableHeader.type';

const meta: Meta<typeof AntCrud> = {
  title: 'Crud/Crud',
  component: AntCrud,
  parameters: {controls: {sort: 'requiredFirst'}},
  decorators: [() => ({template: '<div class="border border-dashed border-neutral-light"><story/></div>'})],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntCrud>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntTabs,
      AntTable,
      AntCrudTableNav,
      AntCrud,
      AntCrudTableFilter,
      AntCrudDetail
    },
    setup() {
      const selectedDataItem = ref(null);
      const fullWidth = computed(() => selectedDataItem.value === null && args.showDetail === false);

      watch(() => args.showDetail, (showDetail) => {
        if (showDetail === false) {
          selectedDataItem.value = null;
        }
      })

      return {
        args,
        selectedDataItem,
        fullWidth,
        tableData: [
          {
            name: 'Lindsay Walton',
            title: 'Front-end Developer',
            email: 'lindsay.walton@example.com',
            streetAddress: '3670 New Road',
            city: 'Birmingham',
            country: 'United Kingdom',
          },
          {
            name: 'Courtney Henry',
            title: 'Designer',
            email: 'courtney.henry@example.com',
            streetAddress: '3670 New Road',
            city: 'Birmingham',
            country: 'United Kingdom',
          },
          {
            name: 'Anderson a. First?',
            title: 'Designer',
            email: 'courtney.henry@example.com',
            streetAddress: '3670 New Road',
            city: 'Birmingham',
            country: 'United Kingdom',
          },
        ],
        tableHeaders: [
          {
            title: 'Name',
            identifier: 'name',
            type: AntTableRowTypes.text,
            lightVersion: true
          },
          {
            title: 'Title',
            identifier: 'title',
            type: AntTableRowTypes.text,
            lightVersion: true
          },
          {
            title: 'E-Mail',
            identifier: 'email',
            type: AntTableRowTypes.text,
          },
          {
            title: 'Street Address',
            identifier: 'streetAddress',
            type: AntTableRowTypes.text,
          },
          {
            title: 'City',
            identifier: 'city',
            type: AntTableRowTypes.text,
          },
          {
            title: 'Country',
            identifier: 'country',
            type: AntTableRowTypes.text,
          }
        ],
        tabItems: [
          {
            id: '1',
            label: 'Main data',
          },
          {
            id: '2',
            label: 'Related data',
          },
          {
            id: '3',
            label: 'Related data',
          },
        ]
      };
    },
    template: `
      <AntCrud v-bind="args" :show-detail="!fullWidth">
        <template #search-section>
          <AntCrudTableFilter
            :full-width="fullWidth"
          />
        </template>

        <template #table-section>
          <AntTable
            v-model:selected-row="selectedDataItem"
            :data="tableData"
            :headers="tableHeaders"
            :show-light-version="!fullWidth"
            selectable-rows
          />
        </template>

        <template #table-nav-section>
          <AntCrudTableNav
            :pages="(100 * 20)"
            :count="100"
            :full-width="fullWidth"
          />
        </template>

        <AntCrudDetail
          :tab-items="tabItems"
          @back="() => selectedDataItem = null"
          @save="() => selectedDataItem = null"
          @saveAndNew="() => selectedDataItem = null"
        >
          <div class="m-2.5 slot">
            SLOT
          </div>
        </AntCrudDetail>
      </AntCrud>
    `,
  }),
  args: {}
}
