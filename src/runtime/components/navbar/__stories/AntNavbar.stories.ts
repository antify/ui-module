import type { Meta, StoryObj } from '@storybook/vue3';
import AntNavbar from '../AntNavbar.vue';
import AntNavbarItem from '../AntNavbarItem.vue';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof AntNavbar> = {
  title: 'Components/Navbar',
  component: AntNavbar,
  subcomponents: AntNavbarItem,
  parameters: {
    fullscreen: true
  }
}

export default meta;

type Story = StoryObj<typeof AntNavbar>

export const Docs: Story = {
  render: (args) => ({
    components: {AntNavbar},
    setup() {
      return {
        args
      }
    },
    template: `
      <div class="w-screen h-screen" style="background: url('https://images.unsplash.com/photo-1703136678192-53fda2c5c602?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') lightgray 50% / cover no-repeat">
      <div class="h-screen w-52 bg-primary">
        <AntNavbar v-bind="args" />
      </div>
      </div>
    `
  }),
  args: {
    navbarItems: [{
      icon: faUserCircle,
      label: 'Navbar item',
      children: [{
        label: 'Child'
      }]
    }, {
      icon: faBook,
      label: 'Navbar item',
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }, {
      icon: faBook,
      label: 'Navbar item',
      active: true,
      children: [{
        label: 'Child',
        icon: faBook,
      }]
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }]
  }
}
