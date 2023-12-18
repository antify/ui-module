import AntLoginLayout from '../AntLoginLayout.vue';

export default {
  title: 'Components/Layout/Ant Login Layout',
  component: AntLoginLayout,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    default: {
      description: 'Slot for login or register formular',
      table: { type: { summary: 'HTML' } },
    },
    loginHeader: {
      description: 'Slot to overwrite default Login header.',
      table: {
        type: { summary: 'HTML' },
        defaultValue: { summary: '"Sign in to your account"' },
      },
    },
    logo: {
      description: 'Slot to set Logo',
      table: { type: { summary: 'HTML' } },
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntLoginLayout },
  setup() {
    return { args };
  },
  template: `<AntLoginLayout v-bind="args"/>`,
});
