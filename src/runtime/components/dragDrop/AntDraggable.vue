<script lang="ts" setup>
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { onMounted } from 'vue';

const props =
  defineProps<{
    id: string;
    data: string;
    showGrabber?: boolean;
    dragType?: string;
  }>();

onMounted(() => {
  if (
    props.dragType &&
    ['copy', 'move', 'link', 'none'].indexOf(props.dragType) === -1
  ) {
    throw Error(`Drag type ${props.dragType} is not allowed`);
  }
});

const dragstartEvent = (event: DragEvent) => {
  if (event && event.dataTransfer) {
    event.dataTransfer.dropEffect = (props.dragType || 'copy') as
      | 'copy'
      | 'move'
      | 'link'
      | 'none';
    event.dataTransfer.effectAllowed = (props.dragType || 'copy') as
      | 'copy'
      | 'move'
      | 'link'
      | 'none';
    event.dataTransfer.setData(`${props.id}-data`, props.data);
  }
};
</script>

<template>
  <div
    draggable="true"
    class="cursor-pointer select-none flex items-center"
    @dragstart="dragstartEvent($event)"
  >
    <div
      v-if="showGrabber"
      class="
        grabber
        inline-block
        px-2
        py-1
        text-gray-400
        hover:text-gray-600
        transition-all
        duration-500
        h-full
      "
    >
      <fa-icon :icon="faEllipsisVertical" />
    </div>

    <slot></slot>
  </div>
</template>
