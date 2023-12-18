import AntBanner from '../AntBanner.vue';

export default {
  title: 'Components/Elements/Ant Banner',
  component: AntBanner,
  argTypes: {
    mainColor: {
      control: 'text',
      table: { defaultValue: { summary: 'primary' } },
      description: 'A tailwind css color definition',
    },
    secondaryColor: {
      control: 'text',
      table: { defaultValue: { summary: 'primary-dark' } },
      description: 'A tailwind css color definition',
    },
    textColor: {
      control: 'text',
      table: { defaultValue: { summary: 'white' } },
      description: 'A tailwind css color definition',
    },
    icon: {
      control: { type: 'none' },
      description: 'A font awesome Icon',
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntBanner },
  setup() {
    return {
      args,
    };
  },
  template: `
  <AntBanner>
    <span class="md:hidden"> We announced a new product! </span>
    <span class="hidden md:inline">
      Big news! We're excited to announce a brand new product.
    </span>
  </AntBanner>`,
});
