import AntNavProfile from '../AntNavProfile.vue';
import AntProfilePicture from '../../images/AntProfilePicture.vue';

export default {
  title: 'Components/Navigation/Ant Nav profile',
  component: AntNavProfile,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    to: {
      description: 'Router link to the profile page',
    },
    userName: {
      description:
        'Name to be displayed as user name, can also be set via the "profileContent" slot',
    },
    profileContent: {
      description: 'Area left to the profile picture',
      table: { type: { summary: 'HTML' } },
    },
    profilePicture: {
      description: 'place to display the profile picture',
      table: { type: { summary: 'HTML' } },
    },
  },
};

const Template = (args: any) => ({
  components: { AntNavProfile, AntProfilePicture },
  setup() {
    return {
      args,
    };
  },
  template: `
  <AntNavProfile v-bind="args">
    <template #profilePicture>
      <AntProfilePicture
        image-url="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </template>

    <template #viewProfile>view profile</template>
  </AntNavProfile>`,
});

export const Simple = Template.bind({});
// @ts-ignore
Simple.args = {
  to: '#',
  userName: 'Courtney Henry',
};
