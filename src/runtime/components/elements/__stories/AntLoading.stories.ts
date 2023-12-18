import AntLoader from '../AntLoader.vue';
import AntButton from '../../form/AntButton.vue';
import { onMounted, ref } from 'vue';

export default {
  title: 'Components/Elements/Ant Loader',
  component: AntLoader,
  argTypes: {
    throttle: {
      description: 'How large should the steps be the loading bar makes',
    },
    duration: {
      description: 'How long should the loading-bar take to be full',
    },
    running: {
      description:
        'If true the loading-bar will start, needs to be set to false when finished.',
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntLoader, AntButton },
  setup() {
    const running = ref<boolean>(false);

    function doIt() {
      setTimeout(() => {
        running.value = true;
      }, 200);

      setTimeout(() => {
        running.value = false;
      }, 8000);
    }

    onMounted(() => {
      setTimeout(() => {
        running.value = true;
      }, 200);

      setTimeout(() => {
        running.value = false;
      }, 3500);
    });

    args.throttle = 200;
    args.duration = 2000;

    return { args, running, doIt };
  },
  template: `
  <AntLoader v-model:running="running" v-bind="args"/>
  <AntButton class="mt-8 mx-4" @click="doIt" :disabled="running">Start loading</AntButton>
  `,
});
