<script lang="ts" setup>
/**
 * To let the toaster show toasts, use the plugin "$uiModule.toaster" property.
 */
import {computed} from 'vue';
import AntToast from './AntToast.vue';
import {CornerPosition} from '../enums/Position.enum';

const props = withDefaults(defineProps<{
  position?: CornerPosition;
}>(), {
  position: CornerPosition.bottomLeft
});

const classes = computed(() => ({
  'left-0 top-0 items-start': props.position === CornerPosition.topLeft,
  'right-0 top-0 items-end': props.position === CornerPosition.topRight,
  'left-0 bottom-0 items-start': props.position === CornerPosition.bottomLeft,
  'right-0 bottom-0 items-end': props.position === CornerPosition.bottomRight,
}));
</script>

<template>
  <div
    class="absolute flex flex-col space-y-2.5 p-2.5"
    :class="classes"
    data-e2e="toaster"
  >
    <TransitionGroup name="list">
      <AntToast
        v-for="toast of $uiModule.toaster.getToasts()"
        :key="`ant-toast-${toast.id}`"
        :title="toast.title"
        :color-type="toast.type"
        :icon="toast.hasIcon"
        @close="$uiModule.toaster.removeToast(toast)"
      >
        <template
          v-if="toast.content"
          #default
        >
          {{ toast.content }}
        </template>
      </AntToast>
    </TransitionGroup>
  </div>
</template>

<style>
.list-move {
  transition: all 0.5s ease;
}

.list-enter-active{
  animation: fade-in .6s;
}

.list-leave-active {
  animation: fade-in .4s reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
