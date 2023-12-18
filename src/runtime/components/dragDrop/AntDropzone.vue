<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['dropped']);

const props =
  defineProps<{
    id: string;
    dropzoneType?: string;
  }>();

const onDrop = (event: DragEvent) => {
  if (event && event.dataTransfer) {
    emit('dropped', [
      ...event.dataTransfer.getData(`${props.id}-data`),
      ...event.dataTransfer.files,
    ]);
  }
};

function preventDefaults(e: Event) {
  e.preventDefault();
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop'];

onMounted(() => {
  if (
    props.dropzoneType &&
    ['copy', 'move', 'link'].indexOf(props.dropzoneType) === -1
  ) {
    throw Error(`Dropzone type ${props.dropzoneType} is not allowed`);
  }

  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>

<template>
  <div :dropzone="dropzoneType || 'copy'" @drop.prevent="onDrop">
    <slot>Dropzone</slot>
  </div>
</template>
