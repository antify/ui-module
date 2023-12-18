<script lang="ts" setup>
import { computed, ref } from 'vue';
import {
  faFilePdf,
  faFileImage,
  faFile,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

const emit = defineEmits(['update:icon']);

const props =
  defineProps<{
    title?: string;
    type?: string;
    icon?: IconDefinition;
  }>();

const active = ref<boolean>(false);

const _icon = computed<IconDefinition | null>(() => {
  if (
    (props.type && props.type === 'pdf') ||
    (props.title && props.title.endsWith('.pdf'))
  ) {
    return (props.icon as IconDefinition) || faFilePdf;
  }

  if (
    (props.type && props.type === 'image') ||
    (props.title && props.title.match(/.*(\.jpg|\.png|\.gif|\.jpeg)/gm))
  ) {
    return (props.icon as IconDefinition) || faFileImage;
  }

  return (props.icon as IconDefinition) || faFile;
});
</script>

<template>
  <div
    class="
      flex flex-col
      border
      min-w-32
      h-40
      transition-all
      duration-500
      overflow-hidden
    "
    :class="{ 'ring-offset-2 ring-2 ring-primary': active }"
    @click="active = !active"
  >
    <div
      class="
        bg-gray-200
        flex
        justify-center
        items-center
        text-4xl
        h-full
        overflow-hidden
      "
    >
      <slot name="icon">
        <fa-icon v-if="_icon" :icon="_icon" class="text-gray-400" />
      </slot>
    </div>

    <div
      v-if="$slots['title'] || title"
      class="
        bg-white
        border-t
        text-xs text-gray-500
        flex
        justify-center
        text-center
        p-2
        max-h-20
        whitespace-nowrap
      "
    >
      <div class="overflow-hidden overflow-ellipsis h-full">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
  </div>
</template>
