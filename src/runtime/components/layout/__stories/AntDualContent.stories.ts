import AntDualContent from '../AntDualContent.vue';
import AntInput from '../../form/AntInput.vue';
import AntTabsDeprecated from '../../navigation/tabs/AntTabsDeprecated.vue';
import AntTable from '../../table/AntTable.vue';
import AntButton from '../../form/AntButton.vue';
import { SingleHeader } from '../../table/__stories/AntTable.stories';

export default {
  title: 'Components/Layout/Ant Dual Content',
  component: AntDualContent,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    mainHead: {
      description: 'Slot to set the main head area of the content',
      tabel: { type: { summary: 'HTML' } },
    },
    mainBody: {
      description: 'Slot to set the main body area of the content',
      tabel: { type: { summary: 'HTML' } },
    },
    mainFooter: {
      description: 'Slot to set the main footer area of the content',
      tabel: { type: { summary: 'HTML' } },
    },
    asideHead: {
      description: 'Slot to set the aside head area of the content',
      tabel: { type: { summary: 'HTML' } },
    },
    asideBody: {
      description: 'Slot to set the aside body area of the content',
      tabel: { type: { summary: 'HTML' } },
    },
    asideFooter: {
      description: 'Slot to set the aside footer area of the content',
      tabel: { type: { summary: 'HTML' } },
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntDualContent },
  setup() {
    return { args };
  },
  template: `
  <AntDualContent>
    <template #mainHead>
      <div class=" m-4">Title Main</div>
    </template>

    <template #mainBody>
      <div class="border-4 border-dashed border-gray-200 rounded-lg h-screen m-4"/>
    </template>

    <template #asideHead>
      <div class=" m-4">Title Secondary</div>
    </template>

    <template #asideBody>
      <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 m-4"/>
    </template>
  </AntDualContent>
  `,
});

export const Complex = (args: any) => ({
  components: { AntDualContent, AntInput, AntTabsDeprecated, AntTable, AntButton },
  setup() {
    return {
      args,
      tabs: [
        { name: 'My Account', href: '#', current: false },
        { name: 'Company', href: '#', current: false },
        { name: 'Team Members', href: '#', current: true },
        { name: 'Billing', href: '#', current: false },
      ],
      ...SingleHeader,
    };
  },
  template: `
  <AntDualContent>
    <template #mainHead>
      <AntTabsDeprecated :tabs="tabs" class="px-4"/>
    </template>

    <template #mainBody>
      <div class="border-4 border-dashed border-gray-200 rounded-lg h-screen m-4"/>
    </template>

    <template #mainFooter>
      <div class="bg-white w-full py-3 px-4 border-t flex justify-between">
        <AntButton label="Close" />
        <AntButton label="Save" primary="true" />
      </div>
    </template>

    <template #asideHead>
      <div class="px-4 py-2">
        <AntInput id="search-123408893475" placeholder="Search"/>
      </div>
    </template>

    <template #asideBody>
      <AntTable v-bind="args"/>
    </template>
  </AntDualContent>
  `,
});
