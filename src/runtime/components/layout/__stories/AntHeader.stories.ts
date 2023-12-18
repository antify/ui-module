import AntHeader from '../AntHeader.vue';

export default {
  title: 'Components/Layout/Ant Header',
  component: AntHeader,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    headerType: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description:
        'Defines what will be renderd in the dom, also sets the default style to match header type',
    },
    label: {
      description:
        'Will be displayed as header text, can also be set via default slot',
    },
    default: {
      description:
        'Will be set has header text, can also be set via "label" prop',
      table: { type: { summary: 'HTML|string' } },
    },
  },
};

const Template = (args: any) => ({
  components: { AntHeader },
  setup() {
    return { args };
  },
  template: `<AntHeader v-bind="args" />`,
});

export const Simple = Template.bind({});
// @ts-ignore
Simple.args = {
  label: 'Header H1',
  headerType: 'h1',
};
