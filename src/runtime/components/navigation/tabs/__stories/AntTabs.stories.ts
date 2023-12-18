import AntTabs from '../AntTabsDeprecated.vue';

export default {
  title: 'Components/Layout/Ant Tabs',
  component: AntTabs,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    tabs: {
      description: 'Array of "Tabs"',
      table: {
        type: {
          summary: 'TabsType[]',
          detail:
            'type TabsType = {name: string; to: RouteLocationRaw; current: boolean;}',
        },
      },
    },
  },
};

const Template = (args: any) => ({
  components: { AntTabs },
  setup() {
    return { args };
  },
  template: '<AntTabs v-bind="args"/>',
});

export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
  tabs: [
    { name: 'My Account', to: '#', current: false },
    { name: 'Company', to: '#', current: false },
    { name: 'Team Members', to: '#', current: true },
    { name: 'Billing', to: '#', current: false },
  ],
};

export const Empty = Template.bind({});
// @ts-ignore
Empty.args = {
  tabs: [],
};
