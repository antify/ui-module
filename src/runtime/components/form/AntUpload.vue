<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { generateId } from '../../utils/helper';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AntProgress from '../elements/AntProgress.vue';
import AntDropzone from '../dragDrop/AntDropzone.vue';

type UploadTarget = { target: any };
type FileInfo = { src: string; fileName: string };

const emit = defineEmits(['update:value', 'update:loading', 'error', 'upload']);

const props =
  defineProps<{
    id?: string;
    label?: string;
    acceptType?: string;
    icon?: Object;
    iconClass?: string;
    value: UploadTarget;
    showPreview?: boolean;
    labelStyle?: string;
    loading: boolean;
    progress?: number;
  }>();

const _id = ref(props.id || generateId(40));
const _acceptType = ref(props.acceptType || '*');
const _labelStyle =
  props.labelStyle ||
  `py-3 px-3 border-2 border-dashed w-full text-center flex items-center
   justify-center  text-gray-400 hover:text-gray-600 hover:border-gray-600
   transition-all duration-500 flex-wrap  cursor-pointer relative`;

const uploaded = ref<FileInfo>({
  src: '',
  fileName: '',
});

const _value = computed({
  get: () => {
    return props.value;
  },
  set: (val: UploadTarget) => {
    emit('update:value', val);
    emit('upload', val.target?.files);

    uploaded.value.src = URL.createObjectURL(val.target?.files[0]);
    uploaded.value.fileName = val.target?.files[0].name;
  },
});

function onDrop(event: any[]) {
  if (event[0].type.match(props.acceptType)) {
    _value.value = { target: { files: event } };
  } else {
    emit('error', 'Filetype not allowed');
  }
}
</script>

<template>
  <div class="flex">
    <slot name="preview" v-bind="uploaded">
      <div
        v-if="uploaded.src && showPreview"
        class="left-0 m-2 flex flex-col items-center justify-center"
      >
        <img
          v-if="uploaded.src && showPreview"
          :src="uploaded.src"
          alt="Preview"
          class="w-16 h-16"
        />

        <p class="text-ellipsis overflow-hidden whitespace-nowrap max-w-16">
          {{ uploaded.fileName }}
        </p>
      </div>
    </slot>

    <AntDropzone :id="`dropzone-${_id}`" @dropped="onDrop" class="w-full">
      <label :for="_id" :class="_labelStyle" dropzone="copy">
        <div class="mr-2">
          <fa-icon v-if="loading" :icon="faSpinner" class="fa-spin" />
        </div>

        <slot name="label">{{ label }}</slot>

        <slot name="icon">
          <fa-icon
            v-if="icon"
            :icon="icon"
            class="block w-full h-10"
            :class="iconClass"
          />
        </slot>

        <slot name="progress">
          <div
            v-if="progress || $slots['progress']"
            class="w-full absolute bottom-0"
          >
            <AntProgress
              :value="progress"
              class="min-h-0 h-1 overflow-hidden transition-all duration-500"
            >
              <template #label><span></span></template>
            </AntProgress>
          </div>
        </slot>
      </label>
    </AntDropzone>

    <input
      v-bind="$attrs"
      @change="(val) => (_value = val)"
      :id="_id"
      :accept="_acceptType"
      class="hidden"
      type="file"
    />
  </div>
</template>
