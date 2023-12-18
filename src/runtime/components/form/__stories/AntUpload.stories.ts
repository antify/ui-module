import { faCamera } from '@fortawesome/free-solid-svg-icons';
import AntUpload from '../AntUpload.vue';
import { ref } from 'vue';

export default {
  title: 'Components/Forms/Ant Upload',
  component: AntUpload,
  parameters: { controls: { sort: 'requiredFirst' } },
  decorators: [() => ({ template: '<div class="m-2"><story/></div>' })],
  argTypes: {
    args: {
      description:
        'Additional attributes will be forwarded to the upload field. This way you can access the default input-field events.',
    },
    loading: {
      description:
        'If true then a loading spinner will be shown inside the upload box',
    },
    progress: {
      description:
        'Should be used as property. If set than a progress bar will be shown at the bottom of the upload box. See "Upload Progress Demo" for more details.',
      table: {
        type: {
          summary: '0',
          detail: 'A value between 0 and 100.',
        },
      },
    },
    icon: {
      description:
        'Slot to add icon to the upload field, can also be set as property',
      table: { type: { summary: 'HTML|IconDefinition' } },
    },
    label: {
      description: 'Slot to set the label, can also be set as property',
      table: { type: { summary: 'HTML|String' } },
    },
    preview: {
      description:
        'Slot to override the default preview behaviour.<br> Gets the fileName and imageSrc (if there is one) as prop.',
      table: { type: { summary: 'HTML' } },
    },
    value: {
      description:
        'The reactive value of the upload field. Will be set as the UploadEvent containing the file.',
    },
    acceptType: {
      description: 'Defines what filetypes can be uploaded.',
      table: { defaultValue: { summary: '"*"' } },
    },
    iconClass: {
      description:
        'Is set as the classList for the icon if the icon is defined via prop.',
    },
    id: {
      description: 'Id for upload area and label.',
      table: {
        defaultValue: { summary: 'UUID', detail: 'A randomly generated UUID' },
      },
    },
    showPreview: {
      description:
        'Defines if a preview should be shown after a successful upload',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    labelStyle: {
      description: 'Override for the default style',
      table: {
        defaultValue: {
          summary: 'string',
          detail: `py-3 px-3 border-2 border-dashed w-full text-center flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-600 transition-all duration-500 flex-wrap  cursor-pointer relative`,
        },
      },
    },
    error: {
      description:
        'Is triggered if an error occurs while uploading, gets an error message.',
    },
    upload: {
      description:
        'Is triggerd after succesfully adding a file to upload, gets the single File to upload.',
    },
  },
};

const Template = (args: any) => ({
  components: { AntUpload },
  setup() {
    const image = ref({});
    const loading = ref(false);

    const upload = () => {
      loading.value = true;

      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    return { args, image, loading, upload };
  },
  template: `
  <AntUpload 
    v-bind="args"
    v-model:value="image"
    v-model:loading="loading"
      @change="upload"
  />
  `,
});

export const Simple = Template.bind({});
// @ts-ignore
Simple.args = {
  label: 'Simple Upload',
  showPreview: true,
};

export const ImageUpload = (args: any) => ({
  components: { AntUpload },
  setup() {
    const image = ref({});
    const loading = ref(false);

    args.acceptType = 'image/*';
    args.icon = faCamera;
    args.label = 'Image Upload';
    args.showPreview = true;

    return { image, loading, args };
  },
  template: `
    <AntUpload 
      v-bind="args"
      v-model:value="image"
      v-model:loading="loading"
    />

    <span class="text-xs text-gray-400">Reactive value: {{image}}</span>`,
});

export const UploadProgressDemo = (args: any) => ({
  components: { AntUpload },
  setup() {
    const image = ref({});
    const loading = ref(false);
    const progress = ref<number>(0);

    args.icon = faCamera;
    args.label = 'Upload with Progress bar';
    args.showPreview = true;

    const upload = async () => {
      progress.value += 10;
      for (let i = 0; i < 9; i++) {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            progress.value += 10;
            resolve();
          }, 500);
        });
      }
    };

    return { image, loading, args, upload, progress };
  },
  template: `
    <AntUpload 
      v-bind="args"
      v-model:value="image"
      v-model:loading="loading"
      :progress="progress"
      @upload="upload"
    />

    <span class="text-xs text-gray-400">Reactive value: {{image}}</span>`,
});
