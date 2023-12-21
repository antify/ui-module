<script lang="ts" setup>
/**
 * To let the toaster show toasts, use the plugin "$uiModule.toaster" property.
 */
import {computed} from 'vue';
import AntToast from './AntToast.vue';
import {CornerPosition} from '../enums/Position.enum';

const props = defineProps<{
  position?: CornerPosition;
}>();

const classes = computed(() => ({
  'left-0 top-0': props.position === CornerPosition.topLeft,
  'right-0 top-0': props.position === CornerPosition.topRight,
  'left-0 bottom-0': props.position === CornerPosition.bottomLeft,
  'right-0 bottom-0': !props.position || props.position === CornerPosition.bottomRight,
}));
</script>

<template>
  <div
    class="absolute flex flex-col space-y-2.5 p-2.5"
    :class="classes"
  >
    <AntToast
      v-for="toast of $uiModule.toaster.getToasts()"
      :title="toast.title"
      :color-type="toast.type"
      :icon="toast.hasIcon"
      @close="$uiModule.toaster.removeToast(toast)"
    >
      <template v-if="toast.content" #default>{{ toast.content }}</template>
    </AntToast>
  </div>
</template>
